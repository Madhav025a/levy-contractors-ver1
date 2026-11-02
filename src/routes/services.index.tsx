import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { PageHero, PageShell, pageMeta } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { Industries } from "@/components/site/industries";
import { SERVICE_PAGES } from "@/lib/services-data";
import heroImg from "@/assets/hero-abatement.jpg";
import gear from "@/assets/safety-gear.jpg";
import selective from "@/assets/proj-selective.jpg";
import industrial from "@/assets/proj-industrial.jpg";
import safetyWide from "@/assets/safety-wide.jpg";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageMeta("/services", "Services | Asbestos Removal, Demolition & Site Assessment | Levy",
      "Commercial and industrial asbestos removal, demolition, and site assessment services in Nashville and Middle Tennessee."),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Our Services" title="Environmental Construction Services"
        copy="One accountable contractor for abatement, demolition, and pre-project assessment."
        image={heroImg} alt="Asbestos abatement crew working inside an industrial facility" />
      <section className="py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-6 px-5 md:px-8 lg:grid-cols-3">
          {SERVICE_PAGES.map((s, i) => (
            <Reveal key={s.slug} delay={i * 100}>
              <Link to="/services/$slug" params={{ slug: s.slug }}
                className="card-lift group flex h-full flex-col overflow-hidden border border-border bg-card">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.alt} loading="lazy" width={1280} height={960}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/75 to-transparent" />
                  <span className="absolute top-5 left-5 font-display text-sm tracking-[0.2em] text-safety">{s.number}</span>
                  <h2 className="absolute bottom-5 left-5 font-display text-3xl text-white">{s.title}</h2>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <p className="text-[15px] leading-relaxed text-muted-foreground">{s.tagline}</p>
                  <ul className="mt-5 grid gap-2">
                    {s.scope.map((sc) => (
                      <li key={sc.title} className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-ink uppercase">
                        <span className="h-1.5 w-1.5 bg-safety" aria-hidden />{sc.title}
                      </li>
                    ))}
                  </ul>
                  <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[13px] font-bold tracking-[0.1em] text-ink uppercase group-hover:text-safety-deep">
                    View Service <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
      <Industries />
    </PageShell>
  );
}
