import { useEffect, useState } from "react";
import { X } from "lucide-react";
import demolitionImg from "@/assets/svc-demolition.jpg";
import { LeadForm } from "@/components/site/hero";

export function ConsultPopup() {
  const [open, setOpen] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setOpen(true), 5000);
    return () => window.clearTimeout(timer);
  }, []);

  if (!open || dismissed) return null;

  const close = () => setDismissed(true);

  return (
    <div className="fixed inset-0 z-[60] flex items-end justify-center bg-ink/70 p-4 backdrop-blur-sm sm:items-center">
      <div className="anim-slide-up relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto bg-white shadow-[var(--shadow-hard)] sm:grid-cols-[0.85fr_1.15fr]">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-3 right-3 z-10 flex h-9 w-9 items-center justify-center bg-white/90 text-ink transition-colors hover:bg-safety"
        >
          <X className="h-4.5 w-4.5" />
        </button>

        <img
          src={demolitionImg}
          alt="Excavator demolishing a concrete commercial building"
          loading="lazy"
          width={1280}
          height={960}
          className="hidden h-full w-full object-cover sm:block"
        />

        <div className="p-8 md:p-10">
          <p className="eyebrow text-steel">Project Consultation</p>
          <h2 className="mt-3 font-display text-3xl leading-[1.05] text-ink md:text-4xl">
            Planning A Commercial Demolition Project?
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-muted-foreground">
            Tell us about your project and the Levy Industrial team will follow up. Prefer to talk
            now? Call{" "}
            <a href="tel:+16152271645" className="font-semibold text-ink underline">
              +1 615-227-1645
            </a>
            .
          </p>
          <div className="mt-7">
            <LeadForm id="popup-quote" compact />
          </div>
        </div>
      </div>
    </div>
  );
}
