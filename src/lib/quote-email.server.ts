// Server-only: emails the owner when a quote request is saved, via GoDaddy's
// built-in email gateway (vended sendEmail() helper). Recipient comes from env.
import type { QuoteInput } from "./quotes.server";
import { sendEmail } from "@/server/email";

export function getQuoteRecipient() {
  return process.env["QUOTE_NOTIFY_TO"]?.split(",")[0]?.trim() || null;
}

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Hardcoded per GoDaddy's sender policy: the gateway only accepts a verified
// sender on an attached domain. Replies go to Kellye, not this mailbox.
const NOTIFICATION_SENDER = "notifications@levycontractors.com";
const NOTIFICATION_REPLY_TO = "kbradley@levycontractors.com";

const DISCLAIMER =
  "Please do not reply directly to this automated notification. This email address is used exclusively for automated notifications and is not monitored. For any questions or assistance, please contact Kellye Bradley at kbradley@levycontractors.com.";

export async function sendQuoteNotification(q: QuoteInput, sourceUrl: string | null, to: string) {
  const when = new Date().toLocaleString("en-US", { timeZone: "America/Chicago", dateStyle: "full", timeStyle: "short" }) + " (Central Time)";
  const rows: [string, string | null][] = [
    ["Full name", q.full_name], ["Company", q.company], ["Email", q.email], ["Phone", q.phone],
    ["Project location", q.project_location], ["Service requested", q.service], ["Message", q.message],
    ["Submitted", when], ["Source page", sourceUrl],
  ];
  const text = rows.map(([k, v]) => `${k}: ${v || "—"}`).join("\n") + `\n\n${DISCLAIMER}`;
  const html = `<h2 style="font-family:Arial;color:#b91c1c">New Quote Request</h2><table style="font-family:Arial;font-size:14px;border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td style="padding:6px 12px 6px 0;font-weight:bold;vertical-align:top">${k}</td><td style="padding:6px 0;white-space:pre-wrap">${esc(v || "—")}</td></tr>`)
    .join("")}</table><p style="font-family:Arial;font-size:12px;color:#6b7280;margin-top:16px;border-top:1px solid #e5e7eb;padding-top:12px">${esc(DISCLAIMER)}</p>`;
  const message = { to, replyTo: NOTIFICATION_REPLY_TO, subject: "New Quote Request – Levy Contractors", text, html };
  try {
    return await sendEmail({ ...message, from: NOTIFICATION_SENDER });
  } catch (err) {
    // If the gateway rejects the custom sender (unverified domain → 400),
    // keep notifications working with the gateway's canonical sender and
    // surface the exact error in the logs.
    console.error(`email.send.sender_rejected: ${err instanceof Error ? err.message : String(err)} — retrying with default sender`);
    return sendEmail(message);
  }
}
