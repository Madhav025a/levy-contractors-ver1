import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { changeOwnPassword } from "@/lib/admin.functions";
import { inputCls, btnCls, errMsg, adminHead, Field } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/_panel/account")({
  head: () => adminHead("My account"),
  component: Account,
});

function Account() {
  const { admin } = Route.useRouteContext();
  const change = useServerFn(changeOwnPassword);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  return (
    <section className="max-w-md rounded-lg border border-border bg-card p-5">
      <h1 className="font-display text-2xl font-bold">My account</h1>
      <p className="mt-1 text-sm text-muted-foreground break-words">{admin.name} · {admin.email}</p>
      <form
        className="mt-5 space-y-3"
        onSubmit={async (e) => {
          e.preventDefault();
          const form = e.currentTarget;
          const f = new FormData(form);
          setErr(""); setMsg("");
          if (f.get("next") !== f.get("confirm")) return setErr("New passwords don't match.");
          try { await change({ data: { current: String(f.get("current")), next: String(f.get("next")) } }); form.reset(); setMsg("Password changed."); }
          catch (x) { setErr(errMsg(x)); }
        }}
      >
        <Field label="Current password"><input name="current" type="password" required autoComplete="current-password" className={inputCls} /></Field>
        <Field label="New password (12+ characters)"><input name="next" type="password" minLength={12} required autoComplete="new-password" className={inputCls} /></Field>
        <Field label="Confirm new password"><input name="confirm" type="password" minLength={12} required autoComplete="new-password" className={inputCls} /></Field>
        {err && <p className="text-sm text-destructive">{err}</p>}
        {msg && <p className="text-sm text-primary">{msg}</p>}
        <button className={btnCls}>Change password</button>
      </form>
    </section>
  );
}
