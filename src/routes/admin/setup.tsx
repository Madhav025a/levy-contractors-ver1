import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { setupSuperAdmin, getAdminSession } from "@/lib/admin.functions";
import { AuthCard, Field, inputCls, btnCls, errMsg, adminHead } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/setup")({
  head: () => adminHead("First-time setup"),
  beforeLoad: async () => {
    const s = await getAdminSession();
    if (s.configured && !s.needsSetup) throw redirect({ to: "/admin/login" });
  },
  component: Setup,
});

function Setup() {
  const setup = useServerFn(setupSuperAdmin);
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  return (
    <AuthCard title="Create the Super Admin">
      <p className="mb-4 text-sm text-muted-foreground">This works only once, while no admin exists, and needs the setup code saved as ADMIN_SETUP_TOKEN in GoDaddy.</p>
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          if (f.get("password") !== f.get("confirm")) return setErr("Passwords don't match.");
          setBusy(true); setErr("");
          try {
            await setup({ data: { token: String(f.get("token")), name: String(f.get("name")), email: String(f.get("email")), password: String(f.get("password")) } });
            await nav({ to: "/admin" });
          } catch (x) { setErr(errMsg(x)); } finally { setBusy(false); }
        }}
      >
        <Field label="Setup code"><input name="token" type="password" required className={inputCls} /></Field>
        <Field label="Your name"><input name="name" required className={inputCls} /></Field>
        <Field label="Email"><input name="email" type="email" required autoComplete="username" className={inputCls} /></Field>
        <Field label="Password (12+ characters)"><input name="password" type="password" minLength={12} required autoComplete="new-password" className={inputCls} /></Field>
        <Field label="Confirm password"><input name="confirm" type="password" minLength={12} required autoComplete="new-password" className={inputCls} /></Field>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button className={`${btnCls} w-full`} disabled={busy}>{busy ? "Creating…" : "Create account"}</button>
      </form>
    </AuthCard>
  );
}
