import { useEffect, useState } from "react";
import { X } from "lucide-react";
import demolitionImg from "@/assets/svc-demolition.jpg";

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
      <div className="anim-slide-up relative grid w-full max-w-3xl overflow-hidden bg-white shadow-[var(--shadow-hard)] sm:grid-cols-[0.85fr_1.15fr]">
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
            Request a project consultation with the Levy Industrial team.
          </p>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href="#quote" onClick={close} className="btn-base btn-safety">
              Discuss My Project
            </a>
            <a href="tel:6152271645" onClick={close} className="btn-base btn-outline-dark">
              Call 615.227.1645
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
