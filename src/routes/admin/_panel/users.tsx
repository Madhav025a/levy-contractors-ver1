import { createFileRoute, redirect } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { listAdmins, createAdmin, updateAdmin } from "@/lib/admin.functions";
import { inputCls, btnCls, btnGhost, errMsg, adminHead, Field } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/_panel/users")({
  head: () => adminHead("Admins"),
  // UX only; every admin-account function re-checks Super Admin on the server.
  beforeLoad: ({ context }) => { if (context.admin.role !== "super_admin") throw redirect({ to: "/admin" }); },
  component: Users,
});

function Users() {
  const { admin } = Route.useRouteContext();
  const list = useServerFn(listAdmins);
  const create = useServerFn(createAdmin);
  const update = useServerFn(updateAdmin);
  const qc = useQueryClient();
  const { data, error } = useQuery({ queryKey: ["admins"], queryFn: () => list() });
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const run = async (fn: () => Promise<unknown>, ok: string) => {
    setErr(""); setMsg("");
    try { await fn(); setMsg(ok); await qc.invalidateQueries({ queryKey: ["admins"] }); } catch (e) { setErr(errMsg(e)); }
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <section className="min-w-0 rounded-lg border border-border bg-card p-5">
        <h1 className="font-display text-2xl font-bold">Admin accounts</h1>
        {error && <p className="mt-2 text-sm text-destructive">{errMsg(error)}</p>}
        {err && <p className="mt-2 text-sm text-destructive">{err}</p>}
        {msg && <p className="mt-2 text-sm text-primary">{msg}</p>}
        <ul className="mt-4 divide-y divide-border">
          {data?.map((u) => (
            <li key={u.id} className="flex flex-wrap items-center gap-3 py-3">
              <div className="min-w-0 flex-1">
                <div className="font-semibold break-words">{u.name} {u.id === admin.id && <span className="text-xs text-muted-foreground">(you)</span>}</div>
                <div className="text-xs text-muted-foreground break-words">{u.email} · {u.role === "super_admin" ? "Super Admin" : "Admin"} · {u.active ? "Active" : "Disabled"}</div>
              </div>
              {u.id !== admin.id && (
                <div className="flex flex-wrap gap-2">
                  <button className={btnGhost} onClick={() => run(() => update({ data: { id: u.id, role: u.role === "super_admin" ? "admin" : "super_admin" } }), "Role updated.")}>
                    Make {u.role === "super_admin" ? "Admin" : "Super Admin"}
                  </button>
                  <button className={btnGhost} onClick={() => run(() => update({ data: { id: u.id, active: !u.active } }), u.active ? "Account disabled." : "Account enabled.")}>
                    {u.active ? "Disable" : "Enable"}
                  </button>
                  <button className={btnGhost} onClick={() => {
                    const pw = prompt(`New temporary password for ${u.name} (12+ characters):`);
                    if (pw) run(() => update({ data: { id: u.id, password: pw } }), "Password reset. Share it privately.");
                  }}>Reset password</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </section>
      <section className="min-w-0 rounded-lg border border-border bg-card p-5">
        <h2 className="font-semibold">Add an admin</h2>
        <form
          className="mt-3 space-y-3"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const f = new FormData(form);
            run(async () => {
              await create({ data: { name: String(f.get("name")), email: String(f.get("email")), password: String(f.get("password")), role: f.get("role") === "super_admin" ? "super_admin" : "admin" } });
              form.reset();
            }, "Admin created. Share the temporary password privately.");
          }}
        >
          <Field label="Name"><input name="name" required className={inputCls} /></Field>
          <Field label="Email"><input name="email" type="email" required className={inputCls} /></Field>
          <Field label="Temporary password (12+ characters)"><input name="password" type="password" minLength={12} required autoComplete="new-password" className={inputCls} /></Field>
          <Field label="Role">
            <select name="role" className={inputCls} defaultValue="admin"><option value="admin">Admin</option><option value="super_admin">Super Admin</option></select>
          </Field>
          <button className={`${btnCls} w-full`}>Create admin</button>
        </form>
      </section>
    </div>
  );
}
