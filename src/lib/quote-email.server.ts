// Server-only: emails the owner when a quote request is saved, via GoDaddy's
// built-in email gateway (vended sendEmail() helper). Recipient comes from env.
import type { QuoteInput } from "./quotes.server";
import { sendEmail } from "@/server/email";

export function getQuoteRecipient() {
  return process.env["QUOTE_NOTIFY_TO"]?.split(",")[0]?.trim() || null;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendQuoteNotification(q: QuoteInput, sourceUrl: string | null, to: string) {
  const when = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "full", timeStyle: "short" }) + " (Central Time)";
  const rows: [string, string | null][] = [
    ["Full name", q.full_name], ["Company", q.company], ["Email", q.email], ["Phone", q.phone],
    ["Project location", q.project_location], ["Service requested", q.service], ["Message", q.message],
    ["Submitted", when], ["Source page", sourceUrl],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n");
  const html = `<h2 style="font-family:Arial;color:#b91c1c">New Quote Request</h2><table style="font-family:Arial;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v || "—")}</td></tr>`)
    .join("")}</table>`;
  // "from" omitted on purpose: GoDaddy's gateway picks the verified sender.
  return sendEmail({ to, replyTo: q.email, subject: "New Quote Request – Levy Contractors", text, html });
}
