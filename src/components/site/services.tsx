import { ArrowRight } from "lucide-react";
import { CountUp, Reveal } from "./reveal";
import asbestosImg from "@/assets/svc-asbestos.jpg";
import demolitionImg from "@/assets/svc-demolition.jpg";
import assessmentImg from "@/assets/svc-assessment.jpg";
import testingImg from "@/assets/svc-testing.jpg";
import moldImg from "@/assets/svc-mold.jpg";

const STATS = [
  { value: 30, suffix: "+", unit: "Years", copy: "Commercial & industrial asbestos experience" },
  { value: 1987, suffix: "", unit: "Since", copy: "Serving the Nashville area" },
  { label: "Safety First", copy: "Compliance-focused operations" },
  { label: "Commercial & Industrial", copy: "Specialized project experience" },
];

export function TrustStats() {
  return (
    <section className="border-b border-border bg-ink">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-px bg-white/10 px-0 md:grid-cols-2 xl:grid-cols-4">
        {STATS.map((stat, index) => (
          <Reveal key={stat.unit ?? stat.label} delay={index * 90}>
            <div className="h-full bg-ink px-8 py-12">
              <div className="font-display text-4xl leading-none text-safety md:text-5xl">
                {stat.value !== undefined ? (
                  <>
                    {stat.unit === "Since" && <span className="text-white/40">Since </span>}
                    <CountUp to={stat.value} suffix={stat.suffix} />
                    {stat.unit === "Years" && <span className="text-white/40"> Years</span>}
                  </>
                ) : (
                  stat.label
                )}
              </div>
              <p className="mt-4 max-w-[16rem] text-sm leading-relaxed text-white/60">{stat.copy}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

const SERVICES = [
  {
    number: "01",
    title: "Asbestos Removal",
    image: asbestosImg,
    alt: "Workers in protective suits sealing a containment barrier inside a commercial building",
    copy: "Commercial and industrial asbestos abatement performed with a strong focus on safety, quality, and regulatory compliance.",
    bullets: [
      "Industrial corporations",
      "Universities",
      "Management companies",
      "Specialized since 1987",
    ],
    cta: "Learn More",
    wide: true,
  },
  {
    number: "02",
    title: "Demolition",
    image: demolitionImg,
    alt: "Excavator with demolition attachment taking down a concrete commercial building",
    copy: "Safe, efficient demolition solutions for both small and large-scale commercial and industrial projects.",
    bullets: [
      "Structural demolition",
      "Selective demolition",
      "Commercial demolition",
      "Industrial demolition",
    ],
    cta: "Explore Demolition",
    wide: true,
  },
  {
    number: "04",
    title: "Asbestos Testing",
    image: testingImg,
    alt: "Technician collecting a material sample into a labeled specimen bag in a boiler room",
    copy: "Material sampling to identify suspect asbestos-containing materials before renovation or demolition begins.",
    bullets: ["Pre-demolition sampling", "Suspect material review"],
    cta: "Learn More",
    wide: false,
  },
  {
    number: "05",
    title: "Mold Remediation",
    image: moldImg,
    alt: "Remediation worker in protective suit removing damaged drywall with HEPA air scrubber equipment",
    copy: "Containment and removal of mold-impacted materials in commercial and industrial buildings.",
    bullets: ["Containment setup", "Impacted material removal"],
    cta: "Learn More",
    wide: false,
  },
];

const ASSESSMENT_STEPS = [
  "Engineering Survey",
  "Utilities",
  "Fire Prevention",
  "Safety Risks",
  "Project Planning",
];

export function Services() {
  return (
    <section id="services" className="scroll-mt-28 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-steel">What We Do</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.02] text-ink md:text-6xl">
            Environmental Construction Services
          </h2>
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-2">
          {SERVICES.filter((s) => s.wide).map((service, index) => (
            <Reveal key={service.number} delay={index * 120}>
              <article className="card-lift group h-full overflow-hidden border border-border bg-white">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/10 to-transparent" />
                  <span className="absolute top-5 left-5 font-display text-sm tracking-[0.2em] text-safety">
                    {service.number}
                  </span>
                  <h3 className="absolute bottom-5 left-5 font-display text-3xl text-white md:text-4xl">
                    {service.title}
                  </h3>
                </div>
                <div className="p-7">
                  <span className="block h-[3px] w-10 bg-safety transition-all duration-500 group-hover:w-24" />
                  <p className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                    {service.copy}
                  </p>
                  <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                    {service.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-ink uppercase"
                      >
                        <span className="h-1.5 w-1.5 bg-safety" aria-hidden />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#quote"
                    className="mt-7 inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.1em] text-ink uppercase transition-colors hover:text-safety-deep"
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>

        {/* 03 Site Assessment — process card */}
        <Reveal>
          <article className="card-lift group mt-6 grid overflow-hidden border border-border bg-ink lg:grid-cols-[0.9fr_1.1fr]">
            <div className="relative min-h-64 overflow-hidden">
              <img
                src={assessmentImg}
                alt="Construction supervisor reviewing plans on a tablet inside an industrial plant"
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-ink/25" />
            </div>
            <div className="p-8 md:p-12">
              <span className="font-display text-sm tracking-[0.2em] text-safety">03</span>
              <h3 className="mt-2 font-display text-3xl text-white md:text-4xl">Site Assessment</h3>
              <p className="mt-4 max-w-xl text-[15px] leading-relaxed text-white/65">
                Thorough project assessment to identify structural, utility, safety, and
                environmental considerations before work begins.
              </p>
              <ol className="mt-8 grid gap-px bg-white/10">
                {ASSESSMENT_STEPS.map((step, index) => (
                  <li
                    key={step}
                    className="flex items-center gap-4 bg-ink px-4 py-3.5 transition-colors hover:bg-ink-soft"
                  >
                    <span className="font-display text-xs text-safety">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[13px] font-semibold tracking-[0.08em] text-white uppercase">
                      {step}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          </article>
        </Reveal>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          {SERVICES.filter((s) => !s.wide).map((service, index) => (
            <Reveal key={service.number} delay={index * 120}>
              <article className="card-lift group flex h-full flex-col overflow-hidden border border-border bg-white sm:flex-row">
                <div className="relative w-full overflow-hidden sm:w-2/5">
                  <img
                    src={service.image}
                    alt={service.alt}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-full"
                  />
                </div>
                <div className="flex-1 p-7">
                  <span className="font-display text-xs tracking-[0.2em] text-steel">
                    {service.number}
                  </span>
                  <h3 className="mt-1 font-display text-2xl text-ink">{service.title}</h3>
                  <span className="mt-3 block h-[3px] w-10 bg-safety transition-all duration-500 group-hover:w-20" />
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{service.copy}</p>
                  <a
                    href="#quote"
                    className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.1em] text-ink uppercase transition-colors hover:text-safety-deep"
                  >
                    {service.cta}
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </a>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
