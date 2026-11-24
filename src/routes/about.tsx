import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, SplitFeature, pageMeta } from "@/components/site/page-shell";
import { Process, WhyLevy } from "@/components/site/why-safety";
import { Credentials, Testimonials } from "@/components/site/industries";
import { Reveal } from "@/components/site/reveal";
import aboutCrew from "@/assets/about-crew.jpg";
import contactMeeting from "@/assets/contact-meeting.jpg";
import asbestos from "@/assets/svc-asbestos.jpg";
import demolition from "@/assets/svc-demolition.jpg";
import industrial from "@/assets/proj-industrial.jpg";
import crew from "@/assets/why-crew.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta("/about", "About Levy Contractors | Nashville Since 1979",
      "Meet Levy Contractors, a third-generation family business since 1979. Commercial asbestos abatement and demolition across Tennessee, Alabama, Kentucky and Georgia."),
  component: AboutPage,
});

const GENERATIONS = [
  { n: "01", name: "Bobby Young", role: "Founder", copy: "Established the business in 1979 with a vision of quality workmanship and dependable service." },
  { n: "02", name: "Kellye Bradley", role: "Second Generation", copy: "Carried the family legacy forward, growing the business while holding to its founding values." },
  { n: "03", name: "Nick Bradley", role: "Third Generation", copy: "Leads the next chapter — the same values, a new generation of dedication." },
];

function FamilyLegacy() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] lg:items-start">
          <Reveal>
            <p className="eyebrow text-safety">Our Family</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.02] text-white md:text-6xl">
              Three Generations. One Family Legacy.
            </h2>
            <p className="mt-6 text-[16px] leading-relaxed text-white/70">
              Built on a foundation of hard work, dedication, and craftsmanship, LEVY is a proud
              third-generation family business with a legacy dating back to 1979.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-white/70">
              What began with Bobby Young, who established the business with a vision of providing
              quality workmanship and dependable service, has grown into a family legacy carried
              forward by his daughter, Kellye Bradley, and now the third generation, Nick Bradley.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-white/70">
              Over the years, the business has continued to evolve while staying true to the values
              on which it was founded: integrity, quality, reliability, and a commitment to customer
              satisfaction.
            </p>
            <p className="mt-4 text-[16px] leading-relaxed text-white/70">
              Today, we take pride not only in the work we do but also in the generations of
              dedication behind it. For us, it's more than just a business — it's a family tradition
              built on trust, hard work, and lasting relationships.
            </p>
          </Reveal>
          <div className="grid gap-px bg-white/10">
            {GENERATIONS.map((gen, index) => (
              <Reveal key={gen.name} delay={index * 100}>
                <div className="group flex h-full items-start gap-6 bg-ink p-7 transition-colors hover:bg-safety md:p-9">
                  <p className="font-display text-3xl leading-none text-safety transition-colors group-hover:text-accent-foreground">
                    {gen.n}
                  </p>
                  <div>
                    <h3 className="font-display text-2xl text-white transition-colors group-hover:text-accent-foreground">
                      {gen.name}
                    </h3>
                    <p className="mt-1 text-[11px] font-semibold tracking-[0.18em] text-safety uppercase transition-colors group-hover:text-accent-foreground/80">
                      {gen.role}
                    </p>
                    <p className="mt-3 text-sm leading-relaxed text-white/60 transition-colors group-hover:text-accent-foreground/80">
                      {gen.copy}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AboutPage() {
  return (
    <PageShell>
      <PageHero eyebrow="About Levy" title="Nashville's Industrial Abatement Specialists Since 1979"
        copy="Three generations of commercial and industrial experience, built on safety, quality, and doing the job right."
        image={aboutCrew} alt="Levy crew in hard hats and safety vests in front of the Nashville skyline" />
      <FamilyLegacy />
      <SplitFeature eyebrow="Our Story" title="Built on Experience, Driven by Safety"
        copy="Since 1979, Levy Contractors, Inc. has helped industrial corporations, universities, property management companies, and general contractors across Tennessee, Alabama, Kentucky, and Georgia complete complex environmental construction projects safely and on schedule."
        image={contactMeeting} alt="Levy project manager reviewing plans with a facility manager"
        points={["Founded 1979", "Third-generation family business", "Commercial & industrial", "NWBOC certified"]} />
      <WhyLevy />
      <Process />
      <Credentials />
      <Testimonials />
    </PageShell>
  );
}
