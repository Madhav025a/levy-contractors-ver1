import { useEffect, useRef, useState } from "react";
import { HardHat, Send, X } from "lucide-react";

type Msg = { id: number; from: "bot" | "user"; text: string };

const QUICK_ACTIONS = [
  "Asbestos Removal",
  "Demolition",
  "Site Assessment",
  "Request a Quote",
  "Talk to Our Team",
];

type Stage = "service" | "type" | "location" | "details" | "contact" | "done";

const SERVICE_NOTES: Record<string, string> = {
  "Asbestos Removal":
    "We've specialized in commercial and industrial asbestos abatement in the Nashville area since 1987, with a strong focus on safety and regulatory compliance.",
  Demolition:
    "We handle structural, selective, commercial, and industrial demolition using specialized equipment to keep projects efficient.",
  "Site Assessment":
    "Our assessments cover engineering surveys, utility locations, fire prevention, and safety and health risks before work begins.",
  "Request a Quote": "Happy to get this in front of our project team.",
  "Talk to Our Team": "You can reach our office directly at 615.227.1645 during business hours.",
  Other: "Tell me a little more and I'll route it to the right person.",
};

export function ProjectAssistant() {
  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false);
  const [stage, setStage] = useState<Stage>("service");
  const [input, setInput] = useState("");
  const [showQuick, setShowQuick] = useState(true);
  const [messages, setMessages] = useState<Msg[]>([
    {
      id: 0,
      from: "bot",
      text: "👋 Hi! I'm Levy's Project Assistant. I can help you find the right service or get your project in front of our team.",
    },
  ]);
  const idRef = useRef(1);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setMounted(true);
      setOpen(true);
    }, 2000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open, messages]);

  const push = (from: Msg["from"], text: string) =>
    setMessages((prev) => [...prev, { id: idRef.current++, from, text }]);

  const botReply = (lines: string[]) => {
    setTyping(true);
    window.setTimeout(() => {
      setTyping(false);
      lines.forEach((line, i) => window.setTimeout(() => push("bot", line), i * 450));
    }, 850);
  };

  const advance = (value: string) => {
    push("user", value);
    setShowQuick(false);

    if (stage === "service") {
      const note = SERVICE_NOTES[value] ?? "Tell me a little more and I'll route it to the right person.";
      botReply([note, "Is this a commercial or an industrial project?"]);

      setStage("type");
      return;
    }
    if (stage === "type") {
      botReply(["Got it. What's the project location — city and site or building name?"]);
      setStage("location");
      return;
    }
    if (stage === "location") {
      botReply([
        "Thanks. Briefly, what's the scope and timing? Approximate square footage, building type, or target start date all help.",
      ]);
      setStage("details");
      return;
    }
    if (stage === "details") {
      botReply([
        "That's enough for our team to review. What's the best name, company, and phone or email to reach you?",
      ]);
      setStage("contact");
      return;
    }
    if (stage === "contact") {
      botReply([
        "Thank you — I've routed this to our project team.",
        "Next steps: a Levy project manager will review the details and follow up to confirm scope and schedule a site assessment if needed. Need to talk sooner? Call 615.227.1645.",
      ]);
      setStage("done");
      return;
    }
    botReply([
      "Noted — I'll add that to your request. You can also call 615.227.1645 or use the quote form on this page.",
    ]);
  };

  const submit = () => {
    const value = input.trim();
    if (!value) return;
    setInput("");
    advance(value);
  };

  if (!mounted) return null;

  return (
    <div className="fixed right-4 bottom-20 z-50 lg:right-6 lg:bottom-6">
      {open ? (
        <div className="anim-slide-up flex h-[min(72vh,560px)] w-[min(92vw,380px)] flex-col border border-border bg-white shadow-[var(--shadow-hard)]">
          <div className="flex items-center gap-3 bg-ink px-4 py-3.5">
            <span className="flex h-9 w-9 items-center justify-center bg-safety">
              <HardHat className="h-4.5 w-4.5 text-accent-foreground" aria-hidden />
            </span>
            <div className="flex-1 leading-tight">
              <p className="font-display text-base text-white">Levy Project Assistant</p>
              <p className="flex items-center gap-1.5 text-[11px] tracking-wide text-white/50">
                <span className="h-1.5 w-1.5 rounded-full bg-compliance" aria-hidden />
                Online — Nashville, TN
              </p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close assistant"
              className="text-white/60 transition-colors hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto bg-concrete/50 p-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`anim-slide-up max-w-[88%] text-sm leading-relaxed ${
                  message.from === "user"
                    ? "ml-auto bg-ink px-3.5 py-2.5 text-white"
                    : "border-l-2 border-safety bg-white px-3.5 py-2.5 text-foreground"
                }`}
              >
                {message.text}
              </div>
            ))}

            {typing && (
              <div className="flex w-16 items-center justify-center gap-1 border-l-2 border-safety bg-white px-3.5 py-3">
                {[0, 1, 2].map((dot) => (
                  <span
                    key={dot}
                    className="h-1.5 w-1.5 rounded-full bg-steel"
                    style={{ animation: `levy-typing 1.2s ${dot * 0.15}s infinite ease-in-out` }}
                  />
                ))}
              </div>
            )}

            {showQuick && !typing && (
              <div className="flex flex-wrap gap-2 pt-1">
                {QUICK_ACTIONS.map((action) => (
                  <button
                    key={action}
                    type="button"
                    onClick={() => advance(action)}
                    className="border border-input bg-white px-3 py-1.5 text-[12px] font-semibold tracking-wide text-ink uppercase transition-colors hover:border-safety hover:bg-safety"
                  >
                    {action}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault();
              submit();
            }}
            className="flex items-center gap-2 border-t border-border bg-white p-3"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your message…"
              aria-label="Message the Levy Project Assistant"
              className="field-industrial"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex h-10 w-10 shrink-0 items-center justify-center bg-safety text-accent-foreground transition-colors hover:bg-safety-deep"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="anim-pulse-ring flex items-center gap-3 bg-ink py-3 pr-5 pl-3 text-white shadow-[var(--shadow-hard)]"
        >
          <span className="flex h-9 w-9 items-center justify-center bg-safety">
            <HardHat className="h-4.5 w-4.5 text-accent-foreground" aria-hidden />
          </span>
          <span className="text-[13px] font-bold tracking-[0.08em] uppercase">Project Assistant</span>
        </button>
      )}
    </div>
  );
}
