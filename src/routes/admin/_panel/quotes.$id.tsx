import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { getQuote, updateQuoteStatus, addQuoteNote, updateQuote, deleteQuote } from "@/lib/admin.functions";
import { STATUS_LIST, StatusBadge, inputCls, btnCls, btnGhost, fmtDate, errMsg, adminHead, Field } from "@/components/admin/ui";

export const Route = createFileRoute("/admin/_panel/quotes/$id")({
  head: () => adminHead("Enquiry"),
  component: QuoteDetail,
});

function QuoteDetail() {
  const { id } = Route.useParams();
  const { admin } = Route.useRouteContext();
  const qid = Number(id);
  const get = useServerFn(getQuote);
  const setStatus = useServerFn(updateQuoteStatus);
  const addNote = useServerFn(addQuoteNote);
  const save = useServerFn(updateQuote);
  const del = useServerFn(deleteQuote);
  const qc = useQueryClient();
  const nav = useNavigate();
  const key = ["admin-quote", qid];
  const { data: q, error, isLoading } = useQuery({ queryKey: key, queryFn: () => get({ data: { id: qid } }) });
  const [err, setErr] = useState("");
  const [note, setNote] = useState("");
  const [editing, setEditing] = useState(false);
  const refresh = () => Promise.all([qc.invalidateQueries({ queryKey: key }), qc.invalidateQueries({ queryKey: ["admin-quotes"] })]);
  const run = async (fn: () => Promise<unknown>) => { setErr(""); try { await fn(); await refresh(); } catch (e) { setErr(errMsg(e)); } };
  const isSuper = admin.role === "super_admin";

  if (isLoading) return <p className="text-sm text-muted-foreground">Loading…</p>;
  if (error) return <p className="text-sm text-destructive">{errMsg(error)}</p>;
  if (!q) return <p>Enquiry not found. <Link to="/admin" className="text-primary">Back</Link></p>;

  const rows: Array<[string, string | null]> = [
    ["Email", q.email], ["Phone", q.phone], ["Company", q.company], ["Project location", q.project_location],
    ["Service", q.service], ["Submitted", fmtDate(q.created_at)], ["Source page", q.source_page],
  ];

  return (
    <div className="space-y-6">
      <Link to="/admin" className="text-sm text-primary">← All enquiries</Link>
      <div className="flex flex-wrap items-center gap-3">
        <h1 className="font-display text-3xl font-bold break-words">{q.full_name}</h1>
        <StatusBadge s={q.status} />
      </div>
      {err && <p className="text-sm text-destructive">{err}</p>}
      <div className="grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="min-w-0 rounded-lg border border-border bg-card p-5">
          {editing && isSuper ? (
            <form
              className="grid gap-3 sm:grid-cols-2"
              onSubmit={(e) => {
                e.preventDefault();
                const f = new FormData(e.currentTarget);
                const v = (k: string) => String(f.get(k) ?? "");
                run(async () => {
                  await save({ data: { id: qid, full_name: v("full_name"), company: v("company"), email: v("email"), phone: v("phone"), project_location: v("project_location"), service: v("service"), message: v("message") } });
                  setEditing(false);
                });
              }}
            >
              {(["full_name", "company", "email", "phone", "project_location", "service"] as const).map((k) => (
                <Field key={k} label={k.replace("_", " ")}><input name={k} defaultValue={q[k] ?? ""} className={inputCls} required={k === "full_name" || k === "email"} /></Field>
              ))}
              <div className="sm:col-span-2"><Field label="Message"><textarea name="message" rows={5} defaultValue={q.message ?? ""} className={inputCls} /></Field></div>
              <div className="flex gap-2 sm:col-span-2"><button className={btnCls}>Save</button><button type="button" className={btnGhost} onClick={() => setEditing(false)}>Cancel</button></div>
            </form>
          ) : (
            <>
              <dl className="grid gap-3 sm:grid-cols-2">
                {rows.map(([k, v]) => (
                  <div key={k} className="min-w-0"><dt className="text-xs uppercase tracking-wide text-muted-foreground">{k}</dt><dd className="break-words text-sm">{v || "—"}</dd></div>
                ))}
              </dl>
              <div className="mt-5"><div className="text-xs uppercase tracking-wide text-muted-foreground">Message</div><p className="mt-1 whitespace-pre-wrap break-words text-sm">{q.message || "—"}</p></div>
              <div className="mt-5 flex flex-wrap gap-2">
                <a href={`mailto:${q.email}`} className={btnGhost}>Email customer</a>
                {q.phone && <a href={`tel:${q.phone.replace(/[^\d+]/g, "")}`} className={btnGhost}>Call</a>}
                {isSuper && <button className={btnGhost} onClick={() => setEditing(true)}>Edit</button>}
                {isSuper && (
                  <button
                    className={`${btnGhost} text-destructive`}
                    onClick={() => { if (confirm("Delete this enquiry permanently?")) run(async () => { await del({ data: { id: qid } }); await nav({ to: "/admin" }); }); }}
                  >Delete</button>
                )}
              </div>
            </>
          )}
        </section>

        <aside className="min-w-0 space-y-6">
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-semibold">Status</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {STATUS_LIST.map((s) => (
                <button key={s} className={s === q.status ? btnCls : btnGhost} onClick={() => run(() => setStatus({ data: { id: qid, status: s } }))}>{s}</button>
              ))}
            </div>
          </section>
          <section className="rounded-lg border border-border bg-card p-5">
            <h2 className="font-semibold">Internal notes</h2>
            <form className="mt-3 space-y-2" onSubmit={(e) => { e.preventDefault(); if (note.trim()) run(async () => { await addNote({ data: { id: qid, body: note } }); setNote(""); }); }}>
              <textarea rows={3} className={inputCls} value={note} onChange={(e) => setNote(e.target.value)} placeholder="Only admins can see notes" />
              <button className={btnCls}>Add note</button>
            </form>
            <ul className="mt-4 space-y-3">
              {q.notes.map((n) => (
                <li key={n.id} className="rounded bg-muted p-3 text-sm">
                  <p className="whitespace-pre-wrap break-words">{n.body}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{n.author} · {fmtDate(n.created_at)}</p>
                </li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}
