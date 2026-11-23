import { createFileRoute, redirect, useNavigate, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { adminLogin, getAdminSession } from "@/lib/admin.functions";
import { AuthCard, Field, inputCls, btnCls, errMsg, adminHead } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/login")({
  head: () => adminHead("Sign in"),
  beforeLoad: async () => {
    const s = await getAdminSession();
    if (s.user) throw redirect({ to: "/admin" });
    return { session: s };
  },
  component: Login,
});

function Login() {
  const { session } = Route.useRouteContext();
  const login = useServerFn(adminLogin);
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);

  if (!session.configured)
    return <AuthCard title="Admin unavailable"><p className="text-sm text-muted-foreground">The dashboard only works on the GoDaddy-hosted site, where the quote database is connected.</p></AuthCard>;
  if (session.needsSetup)
    return <AuthCard title="First-time setup"><p className="text-sm text-muted-foreground">No admin accounts exist yet.</p><Link to="/admin/setup" className={`${btnCls} mt-4 w-full`}>Create the Super Admin</Link></AuthCard>;

  return (
    <AuthCard title="Admin sign in">
      <form
        className="space-y-4"
        onSubmit={async (e) => {
          e.preventDefault();
          const f = new FormData(e.currentTarget);
          setBusy(true); setErr("");
          try {
            await login({ data: { email: String(f.get("email")), password: String(f.get("password")) } });
            await nav({ to: "/admin" });
          } catch (x) { setErr(errMsg(x)); } finally { setBusy(false); }
        }}
      >
        <Field label="Email"><input name="email" type="email" required autoComplete="username" className={inputCls} /></Field>
        <Field label="Password"><input name="password" type="password" required autoComplete="current-password" className={inputCls} /></Field>
        {err && <p className="text-sm text-destructive">{err}</p>}
        <button className={`${btnCls} w-full`} disabled={busy}>{busy ? "Signing in…" : "Sign in"}</button>
      </form>
    </AuthCard>
  );
}
