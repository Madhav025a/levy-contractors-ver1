import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { listQuotes, exportQuotesCsv } from "@/lib/admin.functions";
import { STATUS_LIST, StatusBadge, inputCls, btnCls, fmtDate, errMsg, adminHead } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/_panel/")({
  head: () => adminHead("Enquiries"),
  component: Dashboard,
});

type Filters = { q?: string; service?: string; status?: (typeof STATUS_LIST)[number]; from?: string; to?: string };

function Dashboard() {
  const list = useServerFn(listQuotes);
  const exp = useServerFn(exportQuotesCsv);
  const [f, setF] = useState<Filters>({});
  const clean = Object.fromEntries(Object.entries(f).filter(([, v]) => v)) as Filters;
  const { data, error, isLoading } = useQuery({ queryKey: ["admin-quotes", clean], queryFn: () => list({ data: clean }) });
  const set = (k: keyof Filters) => (e: { target: { value: string } }) => setF((p) => ({ ...p, [k]: e.target.value || undefined }));

  async function download() {
    const csv = await exp({ data: clean });
    const url = URL.createObjectURL(new Blob(["\ufeff" + csv], { type: "text/csv;charset=utf-8" }));
    const a = document.createElement("a");
    a.href = url; a.download = `levy-quotes-${new Date().toISOString().slice(0, 10)}.csv`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="space-y-6">
      <section className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <Stat label="Total" value={data?.total} highlight />
        {STATUS_LIST.map((s) => <Stat key={s} label={s} value={data?.breakdown[s]} />)}
      </section>

      <section className="rounded-lg border border-border bg-card p-4">
        <div className="grid gap-3 md:grid-cols-[2fr_1fr_1fr_1fr_1fr_auto]">
          <input placeholder="Search name, email or company" className={inputCls} value={f.q ?? ""} onChange={set("q")} />
          <select className={inputCls} value={f.service ?? ""} onChange={set("service")}>
            <option value="">All services</option>
            {data?.services.map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className={inputCls} value={f.status ?? ""} onChange={set("status")}>
            <option value="">All statuses</option>
            {STATUS_LIST.map((s) => <option key={s}>{s}</option>)}
          </select>
          <input type="date" aria-label="From date" className={inputCls} value={f.from ?? ""} onChange={set("from")} />
          <input type="date" aria-label="To date" className={inputCls} value={f.to ?? ""} onChange={set("to")} />
          <button className={btnCls} onClick={download}>Export CSV</button>
        </div>
      </section>

      {error && <p className="text-sm text-destructive">{errMsg(error)}</p>}
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {data && data.quotes.length === 0 && <p className="text-sm text-muted-foreground">No enquiries match.</p>}

      {data && data.quotes.length > 0 && (
        <>
          <div className="hidden overflow-x-auto rounded-lg border border-border bg-card md:block">
            <table className="w-full text-sm">
              <thead className="bg-muted text-left text-xs uppercase tracking-wide text-muted-foreground">
                <tr><th className="p-3">Date</th><th className="p-3">Customer</th><th className="p-3">Company</th><th className="p-3">Service</th><th className="p-3">Source</th><th className="p-3">Status</th></tr>
              </thead>
              <tbody>
                {data.quotes.map((q) => (
                  <tr key={q.id} className="border-t border-border hover:bg-muted/50">
                    <td className="p-3 whitespace-nowrap text-muted-foreground">{fmtDate(q.created_at)}</td>
                    <td className="p-3"><Link to="/admin/quotes/$id" params={{ id: String(q.id) }} className="font-semibold text-foreground hover:text-primary">{q.full_name}</Link><div className="text-xs text-muted-foreground">{q.email}</div></td>
                    <td className="p-3">{q.company ?? "—"}</td>
                    <td className="p-3">{q.service ?? "—"}</td>
                    <td className="p-3"><SourceTag source={q.source_page} /></td>
                    <td className="p-3"><StatusBadge s={q.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <ul className="space-y-3 md:hidden">
            {data.quotes.map((q) => (
              <li key={q.id}>
                <Link to="/admin/quotes/$id" params={{ id: String(q.id) }} className="block rounded-lg border border-border bg-card p-4">
                  <div className="flex items-start justify-between gap-2"><span className="font-semibold break-words">{q.full_name}</span><StatusBadge s={q.status} /></div>
                  <div className="mt-1 text-xs text-muted-foreground break-words">{q.company ?? q.email}</div>
                  <div className="mt-2 flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    <span>{q.service ?? "No service"} · {fmtDate(q.created_at)}</span>
                    <SourceTag source={q.source_page} />
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

function SourceTag({ source }: { source: string | null }) {
  if (!source) return <span className="text-muted-foreground">—</span>;
  const isPopup = source.startsWith("Pop-up");
  const page = source.replace(/^Pop-up — /, "");
  return (
    <span className="inline-flex max-w-56 items-center gap-1.5 text-xs" title={source}>
      {isPopup && (
        <span className="rounded bg-primary px-1.5 py-0.5 font-semibold text-primary-foreground">Pop-up</span>
      )}
      <span className="truncate text-muted-foreground">{page}</span>
    </span>
  );
}

function Stat({ label, value, highlight }: { label: string; value: number | undefined; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border border-border p-4 ${highlight ? "bg-foreground text-background" : "bg-card"}`}>
      <div className="text-xs uppercase tracking-wide opacity-70">{label}</div>
      <div className="mt-1 font-display text-3xl font-bold">{value ?? "–"}</div>
    </div>
  );
}
