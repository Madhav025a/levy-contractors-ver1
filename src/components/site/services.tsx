import { CountUp, Reveal } from "./reveal";
import { ServiceCards } from "./service-cards";

type Stat = { value?: number; suffix?: string; unit?: string; label?: string; copy: string };

const STATS: Stat[] = [
  { value: 30, suffix: "+", unit: "Years", copy: "Commercial & industrial asbestos experience" },
  { value: 1979, suffix: "", unit: "Since", copy: "Serving TN, AL, KY & GA" },
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
                    <CountUp to={stat.value} suffix={stat.suffix ?? ""} />
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
        <div className="mt-14"><ServiceCards /></div>
      </div>
    </section>
  );
}
