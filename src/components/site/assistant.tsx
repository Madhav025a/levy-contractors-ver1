import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { HardHat, Send, X, LoaderCircle, RotateCcw } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { askAdvisor } from "@/lib/advisor.functions";
import { safeAdvisorLink } from "@/lib/advisor-policy";

type Msg = { role: "assistant" | "user"; content: string };
const WELCOME: Msg = { role: "assistant", content: "Hi! I'm Levy's Project Assistant. What would you like to know about our services, projects, or certifications?" };
const QUICK_ACTIONS = ["What services do you offer?", "Tell me about your projects", "What do WBE and WOSB mean?", "Where do you work?", "Request a quote"];

export function ProjectAssistant() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [messages, setMessages] = useState<Msg[]>([WELCOME]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const request = useServerFn(askAdvisor);

  useEffect(() => {
    const timer = window.setTimeout(() => { setMounted(true); setOpen(true); }, 2000);
    return () => window.clearTimeout(timer);
  }, []);
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, error]);
  useEffect(() => { if (open) inputRef.current?.focus(); }, [open]);

  async function send(value: string) {
    const question = value.trim();
    if (!question || typing) return;
    const history: Msg[] = [...messages, { role: "user", content: question }];
    setMessages(history);
    setInput("");
    setError(null);
    setTyping(true);
    try {
      const result = await request({ data: { messages: history } });
      if (result.error) { setError(result.error); setInput(question); }
      else setMessages([...history, { role: "assistant", content: result.text }]);
    } catch {
      setError("I couldn't answer that right now. Please call 615.227.1645 or contact Levy.");
      setInput(question);
    } finally { setTyping(false); }
  }

  if (!mounted) return null;
  return (
    <div className="fixed right-4 bottom-20 z-50 lg:right-6 lg:bottom-6">
      {open ? (
        <section aria-label="Levy Project Assistant" className="anim-slide-up flex h-[min(72dvh,600px)] w-[min(92vw,400px)] flex-col border border-border bg-background shadow-[var(--shadow-hard)]">
          <div className="flex items-center gap-3 bg-ink px-4 py-3.5 text-primary-foreground">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-safety"><HardHat className="h-4.5 w-4.5 text-accent-foreground" aria-hidden /></span>
            <div className="flex-1 leading-tight"><p className="font-display text-base">Levy Project Assistant</p><p className="mt-1 text-[11px] text-primary-foreground/60">Nashville, TN · Since 1987</p></div>
            <Button variant="ghost" size="icon" aria-label="Start new conversation" title="Start new conversation" disabled={typing} onClick={() => { setMessages([WELCOME]); setError(null); setInput(""); }}><RotateCcw /></Button>
            <Button variant="ghost" size="icon" aria-label="Close assistant" onClick={() => setOpen(false)}><X /></Button>
          </div>
          <div ref={scrollRef} role="log" aria-live="polite" aria-busy={typing} className="min-h-0 flex-1 space-y-3 overflow-y-auto bg-concrete/50 p-4">
            {messages.map((message, index) => (
              <div key={index} className={`max-w-[92%] break-words px-3.5 py-2.5 text-sm leading-relaxed ${message.role === "user" ? "ml-auto bg-ink text-primary-foreground" : "border-l-2 border-safety bg-background text-foreground"}`}>
                <ReactMarkdown components={{
                  p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                  ul: ({ children }) => <ul className="mb-2 list-disc space-y-1 pl-4">{children}</ul>,
                  ol: ({ children }) => <ol className="mb-2 list-decimal space-y-1 pl-4">{children}</ol>,
                  a: ({ href, children }) => { const safe = safeAdvisorLink(href ?? ""); return safe ? <a href={safe} className="font-semibold underline underline-offset-2">{children}</a> : <span>{children}</span>; },
                  img: () => null,
                }}>{message.content}</ReactMarkdown>
              </div>
            ))}
            {typing && <div role="status" className="flex items-center gap-2 border-l-2 border-safety bg-background px-3.5 py-3 text-sm text-steel"><LoaderCircle className="h-4 w-4 animate-spin motion-reduce:animate-none" />Considering your question…</div>}
            {error && <div role="alert" className="border-l-2 border-destructive bg-background p-3 text-sm text-foreground">{error}<a href="/contact" className="mt-2 block font-semibold underline">Contact Levy</a></div>}
            {messages.length === 1 && !typing && <div className="flex flex-wrap gap-2 pt-1">{QUICK_ACTIONS.map((action) => <Button key={action} variant="outline" size="sm" onClick={() => void send(action)} className="h-auto whitespace-normal px-3 py-2 text-left text-xs">{action}</Button>)}</div>}
          </div>
          <form onSubmit={(event) => { event.preventDefault(); void send(input); }} className="flex items-center gap-2 border-t border-border bg-background p-3">
            <input ref={inputRef} value={input} maxLength={6000} onChange={(event) => setInput(event.target.value)} placeholder="Ask about Levy…" aria-label="Message the Levy Project Assistant" className="field-industrial min-w-0" />
            <Button type="submit" size="icon" aria-label="Send message" disabled={typing || !input.trim()} className="h-10 w-10 shrink-0 bg-safety text-accent-foreground hover:bg-safety-deep"><Send /></Button>
          </form>
        </section>
      ) : (
        <Button onClick={() => setOpen(true)} className="anim-pulse-ring h-auto gap-3 bg-ink py-3 pr-5 pl-3 text-primary-foreground shadow-[var(--shadow-hard)]"><span className="flex h-9 w-9 items-center justify-center bg-safety"><HardHat className="text-accent-foreground" aria-hidden /></span><span className="text-[13px] font-bold uppercase">Project Assistant</span></Button>
      )}
    </div>
  );
}
