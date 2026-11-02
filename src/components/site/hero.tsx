import { useState, type FormEvent } from "react";
import { CheckCircle2, Phone, ShieldCheck, Building2, CalendarClock } from "lucide-react";
import heroImage from "@/assets/hero-abatement.jpg";

const SERVICES = [
  "Asbestos Removal",
  "Demolition",
  "Site Assessment",
  "Other",
];

export function LeadForm({ id = "quote" }: { id?: string }) {
  const [sent, setSent] = useState(false);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <div id={id} className="scroll-mt-32 border border-border bg-white p-6 shadow-[var(--shadow-hard)] md:p-7">
      <h3 className="rule-accent font-display text-2xl text-ink">Tell Us About Your Project</h3>
      <p className="mt-2 text-sm text-muted-foreground">
        Our team will review your project and get back to you.
      </p>

      {sent ? (
        <div className="anim-slide-up mt-6 border border-compliance/30 bg-compliance/5 p-6 text-center">
          <CheckCircle2 className="mx-auto h-9 w-9 text-compliance" aria-hidden />
          <p className="mt-3 font-display text-xl text-ink">Request Received</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Thank you. A Levy project manager will follow up shortly. Need to talk now? Call{" "}
            <a href="tel:6152271645" className="font-semibold text-ink underline">
              615.227.1645
            </a>
            .
          </p>
        </div>
      ) : (
        <form className="mt-5 grid gap-3" onSubmit={onSubmit}>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="field-industrial" placeholder="First Name" required aria-label="First Name" />
            <input className="field-industrial" placeholder="Last Name" required aria-label="Last Name" />
          </div>
          <input className="field-industrial" placeholder="Company" aria-label="Company" />
          <div className="grid gap-3 sm:grid-cols-2">
            <input type="email" className="field-industrial" placeholder="Email" required aria-label="Email" />
            <input type="tel" className="field-industrial" placeholder="Phone" required aria-label="Phone" />
          </div>
          <input className="field-industrial" placeholder="Project Location" aria-label="Project Location" />
          <select className="field-industrial" defaultValue="" aria-label="Service Needed" required>
            <option value="" disabled>
              Service Needed
            </option>
            {SERVICES.map((service) => (
              <option key={service}>{service}</option>
            ))}
          </select>
          <textarea
            className="field-industrial min-h-24"
            placeholder="Project Details"
            aria-label="Project Details"
          />
          <button type="submit" className="btn-base btn-safety w-full">
            Request a Quote
          </button>
        </form>
      )}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="relative isolate min-h-[46rem] overflow-hidden bg-ink lg:min-h-[52rem]">
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <img
          src={heroImage}
          alt="Asbestos abatement crew in protective suits and respirators working inside an industrial facility"
          width={1920}
          height={1280}
          className="h-full w-full object-cover"
        />
        <iframe
          title="Levy Industrial Contractors at work"
          src="https://www.youtube-nocookie.com/embed/an9ZlCYob0s?autoplay=1&mute=1&loop=1&playlist=an9ZlCYob0s&controls=0&disablekb=1&modestbranding=1&rel=0&playsinline=1&iv_load_policy=3"
          allow="autoplay; encrypted-media; picture-in-picture"
          tabIndex={-1}
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-1/2 h-[56.25vw] min-h-full w-[177.78vh] min-w-full -translate-x-1/2 -translate-y-1/2 border-0"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/35 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/55 via-transparent to-ink/25" />


        <div className="hairline-grid absolute inset-0 opacity-20" />
      </div>

      <div className="mx-auto grid max-w-[1400px] items-center gap-12 px-5 pt-40 pb-24 md:px-8 lg:pt-48">
        <div>
          <p
            className="eyebrow anim-rise text-safety"
            style={{ animationDelay: "80ms" }}
          >
            Nashville, Tennessee — Est. 1987
          </p>
          <h1
            className="anim-rise mt-5 font-display text-[2.7rem] leading-[0.95] text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: "180ms" }}
          >
            Experienced Environmental Contractors.
            <span className="mt-2 block text-safety">Built Around Safety.</span>
          </h1>
          <p
            className="anim-rise mt-6 max-w-xl text-base leading-relaxed text-white/70 md:text-lg"
            style={{ animationDelay: "300ms" }}
          >
            Levy Industrial Contractors provides commercial and industrial asbestos abatement,
            demolition, and site assessment services throughout the Nashville area.
          </p>

          <div
            className="anim-rise mt-9 flex flex-wrap gap-3"
            style={{ animationDelay: "420ms" }}
          >
            <a href="#quote" className="btn-base btn-safety">
              Request a Free Quote
            </a>
            <a href="tel:6152271645" className="btn-base btn-outline-light">
              <Phone className="h-4 w-4" aria-hidden />
              Call 615.227.1645
            </a>
          </div>

          <ul
            className="anim-rise mt-12 grid max-w-2xl grid-cols-1 gap-px border border-white/10 bg-white/10 sm:grid-cols-3"
            style={{ animationDelay: "560ms" }}
          >
            {[
              { icon: CalendarClock, label: "Since 1987" },
              { icon: Building2, label: "Commercial & Industrial" },
              { icon: ShieldCheck, label: "Safety First" },
            ].map(({ icon: Icon, label }) => (
              <li key={label} className="flex items-center gap-3 bg-ink/85 px-5 py-4">
                <Icon className="h-5 w-5 shrink-0 text-safety" aria-hidden />
                <span className="text-[13px] font-semibold tracking-[0.08em] text-white uppercase">
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
