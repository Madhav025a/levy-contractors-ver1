import {
  ClipboardList,
  HardHat,
  Layers,
  MessageSquare,
  Radio,
  ScrollText,
  ShieldCheck,

  Users,
  Wrench,
} from "lucide-react";
import { Reveal } from "./reveal";
import crewImg from "@/assets/why-crew.jpg";
import safetyImg from "@/assets/safety-wide.jpg";
import assessmentImg from "@/assets/svc-assessment.jpg";
import demolitionImg from "@/assets/svc-demolition.jpg";
import asbestosImg from "@/assets/svc-asbestos.jpg";
import selectiveImg from "@/assets/proj-selective.jpg";
import industrialProjImg from "@/assets/proj-industrial.jpg";

const BENEFITS = [
  { icon: ShieldCheck, title: "Safety First", copy: "Detailed attention to safety throughout the project." },
  { icon: Users, title: "Experienced Team", copy: "Decades of commercial and industrial experience." },
  { icon: Wrench, title: "Specialized Equipment", copy: "Modern equipment designed to make projects more efficient." },
  {
    icon: ScrollText,
    title: "Regulatory Compliance",
    copy: "Projects completed with applicable federal, state, and local requirements in mind.",
  },
  { icon: ClipboardList, title: "Reliable Project Management", copy: "From preparation through completion." },
];

export function WhyLevy() {
  return (
    <section id="about" className="scroll-mt-28 bg-concrete py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
        <Reveal>
          <div className="relative">
            <img
              src={crewImg}
              alt="Levy-style industrial crew wearing hard hats, respirators and hi-vis vests at a demolition site"
              loading="lazy"
              width={960}
              height={1280}
              className="w-full object-cover"
            />
            <div className="absolute -right-4 -bottom-4 hidden bg-safety px-6 py-5 md:block">
              <p className="font-display text-3xl leading-none text-accent-foreground">1979</p>
              <p className="mt-1 text-[11px] font-semibold tracking-[0.16em] text-accent-foreground/80 uppercase">
                Nashville
              </p>
            </div>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow text-steel">Why Levy</p>
            <h2 className="mt-3 max-w-2xl font-display text-4xl leading-[1.02] text-ink md:text-5xl">
              Experience Matters When Safety Is On The Line.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-muted-foreground">
              Levy combines state-of-the-art techniques with experienced manpower — completing
              projects on time while complying with federal, state, and local regulations.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-px bg-border sm:grid-cols-2">
            {BENEFITS.map((benefit, index) => (
              <Reveal key={benefit.title} delay={index * 80}>
                <div className="group h-full bg-white p-6 transition-colors hover:bg-ink">
                  <benefit.icon className="h-6 w-6 text-safety" aria-hidden />
                  <h3 className="mt-4 font-display text-xl text-ink group-hover:text-white">
                    {benefit.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground group-hover:text-white/60">
                    {benefit.copy}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

const PROCESS = [
  { n: "01", title: "Project Consultation", copy: "Tell us about the site and your project.", image: assessmentImg },
  {
    n: "02",
    title: "Site Assessment",
    copy: "Evaluate conditions, risks, utilities, and project requirements.",
    image: asbestosImg,
  },
  { n: "03", title: "Project Planning", copy: "Develop a safe and efficient approach.", image: selectiveImg },
  {
    n: "04",
    title: "Execution",
    copy: "Our team completes the work with safety and quality at the forefront.",
    image: demolitionImg,
  },
  { n: "05", title: "Final Completion", copy: "Project closeout and final review.", image: industrialProjImg },
];

export function Process() {
  return (
    <section className="bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-steel">How We Work</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">The Levy Process</h2>
        </Reveal>

        <ol className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-5">
          {PROCESS.map((step, index) => (
            <Reveal key={step.n} delay={index * 100} as="li">
              <div className="card-lift group h-full border border-border bg-white">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={step.image}
                    alt={`${step.title} — Levy project stage`}
                    loading="lazy"
                    width={1280}
                    height={960}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute top-0 left-0 bg-safety px-3 py-1.5 font-display text-sm text-accent-foreground">
                    {step.n}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-lg text-ink">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.copy}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}

const SAFETY_PRINCIPLES = [
  { icon: ClipboardList, label: "Planning" },
  { icon: Users, label: "Training" },
  { icon: HardHat, label: "PPE" },
  { icon: Layers, label: "Site Controls" },
  { icon: ScrollText, label: "Compliance" },
  { icon: Radio, label: "Communication" },
];

export function Safety() {
  return (
    <section id="safety" className="relative scroll-mt-28 overflow-hidden bg-ink">
      <img
        src={safetyImg}
        alt="Supervisor leading a safety briefing with a crew in full PPE at an industrial site"
        loading="lazy"
        width={1920}
        height={912}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/75 via-ink/55 to-ink/25" />

      <div className="relative mx-auto max-w-[1400px] px-5 py-24 md:px-8 md:py-32">
        <Reveal>
          <p className="eyebrow text-safety">Safety</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.02] text-white md:text-6xl">
            Safety Isn&apos;t A Checkbox. It&apos;s How We Work.
          </h2>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-white/65">
            Levy is committed to safety and attentive to the details that matter on complex
            environmental and demolition projects.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {SAFETY_PRINCIPLES.map((principle, index) => (
            <Reveal key={principle.label} delay={index * 70}>
              <div className="group h-full bg-ink/90 px-6 py-8 transition-colors hover:bg-safety">
                <principle.icon
                  className="h-6 w-6 text-safety transition-colors group-hover:text-accent-foreground"
                  aria-hidden
                />
                <p className="mt-4 text-[13px] font-bold tracking-[0.1em] text-white uppercase group-hover:text-accent-foreground">
                  {principle.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={200}>
          <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-white/10 pt-10">
            <MessageSquare className="h-5 w-5 text-safety" aria-hidden />
            <p className="text-sm text-white/60">
              Have safety or compliance requirements for your site? Bring them to us early.
            </p>
            <a href="#quote-contact" className="btn-base btn-safety">
              Discuss Your Project
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

