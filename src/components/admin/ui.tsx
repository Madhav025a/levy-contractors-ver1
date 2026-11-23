import type { ReactNode } from "react";

export const inputCls =
  "w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary";
export const btnCls =
  "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 disabled:opacity-50";
export const btnGhost =
  "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground hover:bg-muted disabled:opacity-50";

export const STATUS_LIST = ["New", "Contacted", "Quoted", "Won", "Lost"] as const;
export const statusCls: Record<string, string> = {
  New: "bg-primary/10 text-primary",
  Contacted: "bg-secondary text-secondary-foreground",
  Quoted: "bg-accent text-accent-foreground",
  Won: "bg-foreground text-background",
  Lost: "bg-muted text-muted-foreground",
};

export function StatusBadge({ s }: { s: string }) {
  return <span className={`inline-block rounded px-2 py-0.5 text-xs font-semibold ${statusCls[s] ?? ""}`}>{s}</span>;
}

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted px-4 py-10">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-widest text-primary">Levy Contractors</p>
        <h1 className="mt-1 font-display text-3xl font-bold text-foreground">{title}</h1>
        <div className="mt-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="mb-1 block font-medium text-foreground">{label}</span>
      {children}
    </label>
  );
}

export const fmtDate = (iso: string) =>
  new Date(iso).toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "medium", timeStyle: "short" });

export const errMsg = (e: unknown) => {
  const m = e instanceof Error ? e.message : "Something went wrong.";
  if (m === "UNAUTHORIZED") return "Your session ended. Please sign in again.";
  if (m === "FORBIDDEN") return "Only the Super Admin can do this.";
  if (m === "DB_NOT_CONFIGURED") return "The GoDaddy database isn't connected here.";
  return m;
};

export const adminHead = (title: string) => ({
  meta: [
    { title: `${title} · Levy Contractors Admin` },
    { name: "description", content: "Private Levy Contractors quote management dashboard." },
    { property: "og:title", content: `${title} · Levy Contractors Admin` },
    { property: "og:description", content: "Private Levy Contractors quote management dashboard." },
    { name: "robots", content: "noindex, nofollow" },
  ],
});
