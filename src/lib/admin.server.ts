// Server-only: admin accounts, sessions and quote management in GoDaddy MySQL.
import { randomBytes, scrypt as scryptCb, timingSafeEqual, createHash } from "node:crypto";
import { getCookie, setCookie, deleteCookie } from "@tanstack/react-start/server";
import type { Pool, RowDataPacket } from "mysql2/promise";
import { getPool, ensureTable, isMysqlConfigured } from "./quotes.server";

export type Role = "super_admin" | "admin";
export type AdminUser = { id: number; email: string; name: string; role: Role; active: boolean };
export const STATUSES = ["New", "Contacted", "Quoted", "Won", "Lost"] as const;
export type Status = (typeof STATUSES)[number];

const COOKIE = "levy_admin_session";
const SESSION_DAYS = 7;
let adminTablesReady = false;

export async function db(): Promise<Pool> {
  if (!isMysqlConfigured()) throw new Error("DB_NOT_CONFIGURED");
  const pool = await getPool();
  await ensureTable(pool);
  if (!adminTablesReady) {
    await pool.query(`CREATE TABLE IF NOT EXISTS admin_users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      email VARCHAR(255) NOT NULL UNIQUE,
      name VARCHAR(200) NOT NULL,
      password_hash VARCHAR(255) NOT NULL,
      role ENUM('super_admin','admin') NOT NULL DEFAULT 'admin',
      active TINYINT(1) NOT NULL DEFAULT 1,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    await pool.query(`CREATE TABLE IF NOT EXISTS admin_sessions (
      token_hash CHAR(64) PRIMARY KEY,
      user_id INT NOT NULL,
      expires_at DATETIME NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX (user_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    await pool.query(`CREATE TABLE IF NOT EXISTS quote_status (
      quote_id INT PRIMARY KEY,
      status ENUM('New','Contacted','Quoted','Won','Lost') NOT NULL DEFAULT 'New',
      updated_by INT NULL,
      updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    await pool.query(`CREATE TABLE IF NOT EXISTS quote_notes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      quote_id INT NOT NULL,
      author_id INT NOT NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      INDEX (quote_id)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
    adminTablesReady = true;
  }
  return pool;
}

// ---- Passwords (scrypt, per-user random salt) ----
function scrypt(pw: string, salt: Buffer): Promise<Buffer> {
  return new Promise((res, rej) =>
    scryptCb(pw, salt, 64, { N: 16384, r: 8, p: 1 }, (e, k) => (e ? rej(e) : res(k))),
  );
}
export async function hashPassword(pw: string) {
  const salt = randomBytes(16);
  const key = await scrypt(pw, salt);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}
export async function verifyPassword(pw: string, stored: string) {
  const [alg, saltHex, keyHex] = stored.split("$");
  if (alg !== "scrypt" || !saltHex || !keyHex) return false;
  const key = await scrypt(pw, Buffer.from(saltHex, "hex"));
  const expected = Buffer.from(keyHex, "hex");
  return expected.length === key.length && timingSafeEqual(expected, key);
}
export function validatePassword(pw: string) {
  if (pw.length < 12) throw new Error("Password must be at least 12 characters.");
  if (pw.length > 200) throw new Error("Password is too long.");
}

// ---- Sessions (random token in httpOnly cookie, only its hash stored) ----
const sha = (s: string) => createHash("sha256").update(s).digest("hex");

export async function createSession(userId: number) {
  const pool = await db();
  const token = randomBytes(32).toString("hex");
  await pool.execute(
    "INSERT INTO admin_sessions (token_hash, user_id, expires_at) VALUES (?, ?, DATE_ADD(NOW(), INTERVAL ? DAY))",
    [sha(token), userId, SESSION_DAYS],
  );
  setCookie(COOKIE, token, {
    httpOnly: true,
    secure: process.env["NODE_ENV"] === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DAYS * 86400,
  });
}

export async function destroySession() {
  const token = getCookie(COOKIE);
  if (token) {
    const pool = await db();
    await pool.execute("DELETE FROM admin_sessions WHERE token_hash = ?", [sha(token)]);
  }
  deleteCookie(COOKIE, { path: "/" });
}

export async function currentAdmin(): Promise<AdminUser | null> {
  const token = getCookie(COOKIE);
  if (!token) return null;
  const pool = await db();
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT u.id, u.email, u.name, u.role, u.active FROM admin_sessions s
     JOIN admin_users u ON u.id = s.user_id
     WHERE s.token_hash = ? AND s.expires_at > NOW() AND u.active = 1`,
    [sha(token)],
  );
  const r = rows[0];
  if (!r) return null;
  return { id: r["id"], email: r["email"], name: r["name"], role: r["role"], active: !!r["active"] };
}

export async function requireAdmin(): Promise<AdminUser> {
  const u = await currentAdmin();
  if (!u) throw new Error("UNAUTHORIZED");
  return u;
}
export async function requireSuperAdmin(): Promise<AdminUser> {
  const u = await requireAdmin();
  if (u.role !== "super_admin") throw new Error("FORBIDDEN");
  return u;
}

// ---- Login rate limiting (in-memory, per email) ----
const attempts = new Map<string, { n: number; until: number }>();
export function checkRate(key: string) {
  const a = attempts.get(key);
  if (a && a.until > Date.now() && a.n >= 5) throw new Error("Too many attempts. Try again in 15 minutes.");
}
export function noteFail(key: string) {
  const a = attempts.get(key);
  const fresh = !a || a.until < Date.now();
  attempts.set(key, { n: fresh ? 1 : a!.n + 1, until: Date.now() + 15 * 60 * 1000 });
}
export function clearRate(key: string) {
  attempts.delete(key);
}
