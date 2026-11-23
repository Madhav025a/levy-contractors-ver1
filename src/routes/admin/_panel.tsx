import { createFileRoute, redirect, Outlet, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQueryClient } from "@tanstack/react-query";
import { getAdminSession, adminLogout } from "@/lib/admin.functions";

export const Route = createFileRoute("/admin/_panel")({
  beforeLoad: async () => {
    const s = await getAdminSession();
    if (!s.user) throw redirect({ to: s.needsSetup ? "/admin/setup" : "/admin/login" });
    return { admin: s.user };
  },
  component: Panel,
});

function Panel() {
  const { admin } = Route.useRouteContext();
  const logout = useServerFn(adminLogout);
  const nav = useNavigate();
  const qc = useQueryClient();
  const link = "rounded px-3 py-1.5 text-sm font-medium text-background/80 hover:text-background";
  const active = { className: "rounded px-3 py-1.5 text-sm font-semibold bg-primary text-primary-foreground" };
  return (
    <div className="min-h-screen bg-muted">
      <header className="bg-foreground text-background">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3">
          <span className="font-display text-xl font-bold">Levy Admin</span>
          <nav className="flex flex-wrap gap-1">
            <Link to="/admin" activeOptions={{ exact: true }} className={link} activeProps={active}>Enquiries</Link>
            {admin.role === "super_admin" && <Link to="/admin/users" className={link} activeProps={active}>Admins</Link>}
            <Link to="/admin/account" className={link} activeProps={active}>My account</Link>
          </nav>
          <div className="ml-auto flex items-center gap-3 text-sm">
            <span className="hidden sm:inline text-background/70">{admin.name} · {admin.role === "super_admin" ? "Super Admin" : "Admin"}</span>
            <button
              className="rounded border border-background/30 px-3 py-1 hover:bg-background/10"
              onClick={async () => {
                await qc.cancelQueries(); qc.clear();
                await logout();
                await nav({ to: "/admin/login", replace: true });
              }}
            >Sign out</button>
          </div>
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-6"><Outlet /></main>
    </div>
  );
}
