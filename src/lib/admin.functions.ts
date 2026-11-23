import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const STATUS = z.enum(["New", "Contacted", "Quoted", "Won", "Lost"]);

function safe<T>(fn: () => Promise<T>): Promise<T> {
  return fn().catch((e: unknown) => {
    const msg = e instanceof Error ? e.message : "Error";
    if (["UNAUTHORIZED", "FORBIDDEN", "DB_NOT_CONFIGURED"].includes(msg) || !(e instanceof Error) || msg.length > 120) {
      if (!["UNAUTHORIZED", "FORBIDDEN", "DB_NOT_CONFIGURED"].includes(msg)) console.error("admin.error", e);
      throw new Error(["UNAUTHORIZED", "FORBIDDEN", "DB_NOT_CONFIGURED"].includes(msg) ? msg : "Something went wrong.");
    }
    if (/ER_|ECONN|ETIMEDOUT|getaddrinfo/.test(msg)) {
      console.error("admin.db_error", e);
      throw new Error("Database error.");
    }
    throw e;
  });
}

// Session state for route guards. Never throws for signed-out visitors.
export const getAdminSession = createServerFn({ method: "GET" }).handler(async () => {
  const s = await import("./admin.server");
  const { isMysqlConfigured } = await import("./quotes.server");
  if (!isMysqlConfigured()) return { configured: false as const, user: null, needsSetup: false };
  try {
    const pool = await s.db();
    const [rows] = await pool.query("SELECT COUNT(*) AS n FROM admin_users");
    const n = Number((rows as Array<{ n: number }>)[0]?.n ?? 0);
    return { configured: true as const, user: await s.currentAdmin(), needsSetup: n === 0 };
  } catch (e) {
    console.error("admin.session_error", e);
    return { configured: false as const, user: null, needsSetup: false };
  }
});

// One-time creation of the first Super Admin. Requires ADMIN_SETUP_TOKEN and an empty admin table.
export const setupSuperAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      token: z.string().min(1).max(500),
      name: z.string().trim().min(1).max(200),
      email: z.string().trim().toLowerCase().email().max(255),
      password: z.string().max(200),
    }).parse(d),
  )
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      const { timingSafeEqual, createHash } = await import("node:crypto");
      const expected = process.env["ADMIN_SETUP_TOKEN"];
      if (!expected || expected.length < 16) throw new Error("Setup is not enabled. Add ADMIN_SETUP_TOKEN in GoDaddy first.");
      const h = (v: string) => createHash("sha256").update(v).digest();
      if (!timingSafeEqual(h(expected), h(data.token))) throw new Error("Setup token is incorrect.");
      s.validatePassword(data.password);
      const pool = await s.db();
      const [rows] = await pool.query("SELECT COUNT(*) AS n FROM admin_users");
      if (Number((rows as Array<{ n: number }>)[0]?.n ?? 0) > 0) throw new Error("Setup has already been completed.");
      const [res] = await pool.execute(
        "INSERT INTO admin_users (email, name, password_hash, role) VALUES (?, ?, ?, 'super_admin')",
        [data.email, data.name, await s.hashPassword(data.password)],
      );
      await s.createSession((res as { insertId: number }).insertId);
      return { ok: true };
    }),
  );

export const adminLogin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({ email: z.string().trim().toLowerCase().email().max(255), password: z.string().min(1).max(200) }).parse(d),
  )
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      s.checkRate(data.email);
      const pool = await s.db();
      const [rows] = await pool.execute("SELECT id, password_hash, active FROM admin_users WHERE email = ?", [data.email]);
      const u = (rows as Array<{ id: number; password_hash: string; active: number }>)[0];
      const ok = u ? await s.verifyPassword(data.password, u.password_hash) : await s.verifyPassword(data.password, "scrypt$00$00");
      if (!u || !ok || !u.active) {
        s.noteFail(data.email);
        throw new Error("Email or password is incorrect.");
      }
      s.clearRate(data.email);
      await s.createSession(u.id);
      return { ok: true };
    }),
  );

export const adminLogout = createServerFn({ method: "POST" }).handler(() =>
  safe(async () => {
    const s = await import("./admin.server");
    await s.destroySession();
    return { ok: true };
  }),
);

export const changeOwnPassword = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ current: z.string().max(200), next: z.string().max(200) }).parse(d))
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      const me = await s.requireAdmin();
      s.validatePassword(data.next);
      const pool = await s.db();
      const [rows] = await pool.execute("SELECT password_hash FROM admin_users WHERE id = ?", [me.id]);
      const hash = (rows as Array<{ password_hash: string }>)[0]?.password_hash ?? "";
      if (!(await s.verifyPassword(data.current, hash))) throw new Error("Current password is incorrect.");
      await pool.execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", [await s.hashPassword(data.next), me.id]);
      await pool.execute("DELETE FROM admin_sessions WHERE user_id = ?", [me.id]);
      await s.createSession(me.id);
      return { ok: true };
    }),
  );

// ---- Quotes ----
const listSchema = z.object({
  q: z.string().trim().max(200).optional(),
  service: z.string().trim().max(200).optional(),
  status: STATUS.optional(),
  from: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
  to: z.string().regex(/^\d{4}-\d{2}-\d{2}$/).optional(),
});
type ListFilter = z.infer<typeof listSchema>;

async function queryQuotes(f: ListFilter) {
  const s = await import("./admin.server");
  const pool = await s.db();
  const where: string[] = [];
  const args: string[] = [];
  if (f.q) {
    where.push("(q.full_name LIKE ? OR q.email LIKE ? OR q.company LIKE ?)");
    const like = `%${f.q}%`;
    args.push(like, like, like);
  }
  if (f.service) { where.push("q.service = ?"); args.push(f.service); }
  if (f.status) { where.push("COALESCE(st.status,'New') = ?"); args.push(f.status); }
  if (f.from) { where.push("q.created_at >= ?"); args.push(`${f.from} 00:00:00`); }
  if (f.to) { where.push("q.created_at <= ?"); args.push(`${f.to} 23:59:59`); }
  const [rows] = await pool.execute(
    `SELECT q.id, q.full_name, q.company, q.email, q.phone, q.project_location, q.service, q.message,
            q.source_page, q.created_at, COALESCE(st.status,'New') AS status
     FROM quote_requests q LEFT JOIN quote_status st ON st.quote_id = q.id
     ${where.length ? "WHERE " + where.join(" AND ") : ""}
     ORDER BY q.created_at DESC LIMIT 2000`,
    args,
  );
  return (rows as Array<Record<string, unknown>>).map((r) => ({
    id: Number(r["id"]),
    full_name: String(r["full_name"] ?? ""),
    company: (r["company"] as string | null) ?? null,
    email: String(r["email"] ?? ""),
    phone: (r["phone"] as string | null) ?? null,
    project_location: (r["project_location"] as string | null) ?? null,
    service: (r["service"] as string | null) ?? null,
    message: (r["message"] as string | null) ?? null,
    source_page: (r["source_page"] as string | null) ?? null,
    created_at: new Date(r["created_at"] as string).toISOString(),
    status: String(r["status"]) as z.infer<typeof STATUS>,
  }));
}

export const listQuotes = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => listSchema.parse(d ?? {}))
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      await s.requireAdmin();
      const pool = await s.db();
      const [counts] = await pool.query(
        `SELECT COALESCE(st.status,'New') AS status, COUNT(*) AS n FROM quote_requests q
         LEFT JOIN quote_status st ON st.quote_id = q.id GROUP BY COALESCE(st.status,'New')`,
      );
      const [services] = await pool.query(
        "SELECT DISTINCT service FROM quote_requests WHERE service IS NOT NULL AND service <> '' ORDER BY service",
      );
      const breakdown: Record<string, number> = { New: 0, Contacted: 0, Quoted: 0, Won: 0, Lost: 0 };
      for (const c of counts as Array<{ status: string; n: number }>) breakdown[c.status] = Number(c.n);
      return {
        quotes: await queryQuotes(data),
        breakdown,
        total: Object.values(breakdown).reduce((a, b) => a + b, 0),
        services: (services as Array<{ service: string }>).map((x) => x.service),
      };
    }),
  );

export const getQuote = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.number().int().positive() }).parse(d))
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      await s.requireAdmin();
      const pool = await s.db();
      const [rows] = await pool.execute(
        `SELECT q.*, COALESCE(st.status,'New') AS status FROM quote_requests q
         LEFT JOIN quote_status st ON st.quote_id = q.id WHERE q.id = ?`,
        [data.id],
      );
      const r = (rows as Array<Record<string, unknown>>)[0];
      if (!r) return null;
      const [notes] = await pool.execute(
        `SELECT n.id, n.body, n.created_at, u.name AS author FROM quote_notes n
         LEFT JOIN admin_users u ON u.id = n.author_id WHERE n.quote_id = ? ORDER BY n.created_at DESC`,
        [data.id],
      );
      return {
        id: Number(r["id"]),
        full_name: String(r["full_name"] ?? ""),
        company: (r["company"] as string | null) ?? null,
        email: String(r["email"] ?? ""),
        phone: (r["phone"] as string | null) ?? null,
        project_location: (r["project_location"] as string | null) ?? null,
        service: (r["service"] as string | null) ?? null,
        message: (r["message"] as string | null) ?? null,
        source_page: (r["source_page"] as string | null) ?? null,
        created_at: new Date(r["created_at"] as string).toISOString(),
        status: String(r["status"]),
        notes: (notes as Array<Record<string, unknown>>).map((n) => ({
          id: Number(n["id"]),
          body: String(n["body"]),
          author: String(n["author"] ?? "Former admin"),
          created_at: new Date(n["created_at"] as string).toISOString(),
        })),
      };
    }),
  );

export const updateQuoteStatus = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.number().int().positive(), status: STATUS }).parse(d))
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      const me = await s.requireAdmin();
      const pool = await s.db();
      await pool.execute(
        `INSERT INTO quote_status (quote_id, status, updated_by) VALUES (?, ?, ?)
         ON DUPLICATE KEY UPDATE status = VALUES(status), updated_by = VALUES(updated_by)`,
        [data.id, data.status, me.id],
      );
      return { ok: true };
    }),
  );

export const addQuoteNote = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.number().int().positive(), body: z.string().trim().min(1).max(5000) }).parse(d))
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      const me = await s.requireAdmin();
      const pool = await s.db();
      await pool.execute("INSERT INTO quote_notes (quote_id, author_id, body) VALUES (?, ?, ?)", [data.id, me.id, data.body]);
      return { ok: true };
    }),
  );

// Super Admin only: edit or delete enquiries.
export const updateQuote = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      id: z.number().int().positive(),
      full_name: z.string().trim().min(1).max(200),
      company: z.string().trim().max(200).nullable(),
      email: z.string().trim().email().max(255),
      phone: z.string().trim().max(50).nullable(),
      project_location: z.string().trim().max(300).nullable(),
      service: z.string().trim().max(200).nullable(),
      message: z.string().trim().max(5000).nullable(),
    }).parse(d),
  )
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      await s.requireSuperAdmin();
      const pool = await s.db();
      const n = (v: string | null) => (v ? v : null);
      await pool.execute(
        `UPDATE quote_requests SET full_name=?, company=?, email=?, phone=?, project_location=?, service=?, message=? WHERE id=?`,
        [data.full_name, n(data.company), data.email, n(data.phone), n(data.project_location), n(data.service), n(data.message), data.id],
      );
      return { ok: true };
    }),
  );

export const deleteQuote = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => z.object({ id: z.number().int().positive() }).parse(d))
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      await s.requireSuperAdmin();
      const pool = await s.db();
      await pool.execute("DELETE FROM quote_notes WHERE quote_id = ?", [data.id]);
      await pool.execute("DELETE FROM quote_status WHERE quote_id = ?", [data.id]);
      await pool.execute("DELETE FROM quote_requests WHERE id = ?", [data.id]);
      return { ok: true };
    }),
  );

export const exportQuotesCsv = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) => listSchema.parse(d ?? {}))
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      await s.requireAdmin();
      const { toCsv } = await import("./csv");
      const rows = await queryQuotes(data);
      return toCsv(
        ["ID", "Date", "Status", "Name", "Company", "Email", "Phone", "Location", "Service", "Message", "Source page"],
        rows.map((r) => [r.id, r.created_at, r.status, r.full_name, r.company, r.email, r.phone, r.project_location, r.service, r.message, r.source_page]),
      );
    }),
  );

// ---- Admin accounts (Super Admin only) ----
export const listAdmins = createServerFn({ method: "GET" }).handler(() =>
  safe(async () => {
    const s = await import("./admin.server");
    await s.requireSuperAdmin();
    const pool = await s.db();
    const [rows] = await pool.query("SELECT id, email, name, role, active, created_at FROM admin_users ORDER BY id");
    return (rows as Array<Record<string, unknown>>).map((r) => ({
      id: Number(r["id"]),
      email: String(r["email"]),
      name: String(r["name"]),
      role: String(r["role"]) as "super_admin" | "admin",
      active: !!r["active"],
      created_at: new Date(r["created_at"] as string).toISOString(),
    }));
  }),
);

export const createAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      name: z.string().trim().min(1).max(200),
      email: z.string().trim().toLowerCase().email().max(255),
      password: z.string().max(200),
      role: z.enum(["super_admin", "admin"]),
    }).parse(d),
  )
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      await s.requireSuperAdmin();
      s.validatePassword(data.password);
      const pool = await s.db();
      const [ex] = await pool.execute("SELECT id FROM admin_users WHERE email = ?", [data.email]);
      if ((ex as unknown[]).length) throw new Error("An admin with this email already exists.");
      await pool.execute("INSERT INTO admin_users (email, name, password_hash, role) VALUES (?, ?, ?, ?)", [
        data.email, data.name, await s.hashPassword(data.password), data.role,
      ]);
      return { ok: true };
    }),
  );

export const updateAdmin = createServerFn({ method: "POST" })
  .inputValidator((d: unknown) =>
    z.object({
      id: z.number().int().positive(),
      role: z.enum(["super_admin", "admin"]).optional(),
      active: z.boolean().optional(),
      password: z.string().max(200).optional(),
    }).parse(d),
  )
  .handler(({ data }) =>
    safe(async () => {
      const s = await import("./admin.server");
      const me = await s.requireSuperAdmin();
      const pool = await s.db();
      if (data.id === me.id && (data.role === "admin" || data.active === false))
        throw new Error("You can't demote or disable your own account.");
      if (data.role !== undefined) await pool.execute("UPDATE admin_users SET role = ? WHERE id = ?", [data.role, data.id]);
      if (data.active !== undefined) {
        await pool.execute("UPDATE admin_users SET active = ? WHERE id = ?", [data.active ? 1 : 0, data.id]);
        if (!data.active) await pool.execute("DELETE FROM admin_sessions WHERE user_id = ?", [data.id]);
      }
      if (data.password) {
        s.validatePassword(data.password);
        await pool.execute("UPDATE admin_users SET password_hash = ? WHERE id = ?", [await s.hashPassword(data.password), data.id]);
        await pool.execute("DELETE FROM admin_sessions WHERE user_id = ?", [data.id]);
      }
      return { ok: true };
    }),
  );
