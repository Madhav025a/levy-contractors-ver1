// Server-only: saves quote requests into GoDaddy's hosted MySQL database.
// Credentials come from DB_* environment variables provided by GoDaddy and never reach the browser.
import type { Pool } from "mysql2/promise";

export type QuoteInput = {
  full_name: string;
  company: string | null;
  email: string;
  phone: string | null;
  project_location: string | null;
  service: string | null;
  message: string | null;
  source_page: string | null;
};

let poolPromise: Promise<Pool> | null = null;
let tableReady = false;

export function isMysqlConfigured() {
  const env = process.env;
  return Boolean(env["DB_HOST"] && env["DB_NAME"] && env["DB_USER"]);
}

export async function getPool(): Promise<Pool> {
  if (!poolPromise) {
    poolPromise = import("mysql2/promise").then((mysql) =>
      mysql.createPool({
        host: process.env["DB_HOST"] ?? "",
        port: Number(process.env["DB_PORT"] || 3306),
        database: process.env["DB_NAME"] ?? "",
        user: process.env["DB_USER"] ?? "",
        password: process.env["DB_PASSWORD"] ?? "",
        waitForConnections: true,
        connectionLimit: 5,
        connectTimeout: 10000,
        charset: "utf8mb4",
      }),
    );
    poolPromise.catch(() => {
      poolPromise = null;
    });
  }
  return poolPromise;
}

export async function ensureTable(pool: Pool) {
  if (tableReady) return;
  await pool.query(`CREATE TABLE IF NOT EXISTS quote_requests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(200) NOT NULL,
    company VARCHAR(200) NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50) NULL,
    project_location VARCHAR(300) NULL,
    service VARCHAR(200) NULL,
    message TEXT NULL,
    source_page VARCHAR(500) NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4`);
  tableReady = true;
}

export async function saveQuoteToMysql(q: QuoteInput): Promise<number> {
  const pool = await getPool();
  await ensureTable(pool);
  const [result] = await pool.execute(
    `INSERT INTO quote_requests
      (full_name, company, email, phone, project_location, service, message, source_page)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [q.full_name, q.company, q.email, q.phone, q.project_location, q.service, q.message, q.source_page],
  );
  return (result as { insertId: number }).insertId;
}
