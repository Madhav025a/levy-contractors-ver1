import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getRequest } from "@tanstack/react-start/server";

const opt = (max: number) =>
  z.string().trim().max(max).nullish().transform((v) => (v ? v : null));

const quoteSchema = z.object({
  full_name: z.string().trim().min(1).max(200),
  company: opt(200),
  email: z.string().trim().email().max(255),
  phone: opt(50),
  project_location: opt(300),
  service: opt(200),
  message: opt(5000),
  source_page: opt(500),
});

// Returns { ok, saved_to }. saved_to "mysql" when GoDaddy's database is configured;
// "unconfigured" tells the browser to use the previous backup save (Lovable preview).
export const submitQuoteRequest = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => quoteSchema.parse(data))
  .handler(async ({ data }) => {
    const { isMysqlConfigured, saveQuoteToMysql } = await import("./quotes.server");
    if (!isMysqlConfigured()) return { ok: false as const, saved_to: "unconfigured" as const };
    try {
      await saveQuoteToMysql(data);
    } catch (err) {
      console.error("Quote MySQL save failed:", err instanceof Error ? err.message : err);
      return { ok: false as const, saved_to: "error" as const };
    }
    // Saved. Email failures are logged only; the enquiry stays saved.
    try {
      const { getQuoteRecipient, sendQuoteNotification } = await import("./quote-email.server");
      const to = getQuoteRecipient();
      if (to) {
        let url = data.source_page;
        try { url = new URL(data.source_page || "/", getRequest().url).toString(); } catch {}
        const { messageId } = await sendQuoteNotification(data, url, to);
        console.log("email.send.ok", { messageId });
      } else console.error("email.quote_notification.recipient_unset (set QUOTE_NOTIFY_TO)");
    } catch (err) {
      console.error("email.send.failed", err);
    }
    return { ok: true as const, saved_to: "mysql" as const };
  });
