// Server-only: emails the owner when a quote request is saved. SMTP settings come from env vars.
import type { QuoteInput } from "./quotes.server";

export function isSmtpConfigured() {
  const e = process.env;
  return Boolean(e["SMTP_HOST"] && e["SMTP_USER"] && e["SMTP_PASSWORD"] && e["QUOTE_NOTIFY_TO"]);
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

export async function sendQuoteNotification(q: QuoteInput, sourceUrl: string | null) {
  const nodemailer = (await import("nodemailer")).default;
  const port = Number(process.env["SMTP_PORT"] || 587);
  const user = process.env["SMTP_USER"]!;
  const transporter = nodemailer.createTransport({
    host: process.env["SMTP_HOST"]!,
    port,
    secure: port === 465,
    auth: { user, pass: process.env["SMTP_PASSWORD"]! },
    connectionTimeout: 10000,
  });
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
  await transporter.sendMail({
    from: process.env["SMTP_FROM"] || user,
    to: process.env["QUOTE_NOTIFY_TO"]!.split(",")[0]!.trim(),
    replyTo: q.email,
    subject: "New Quote Request – Levy Contractors",
    text,
    html,
  });
}
