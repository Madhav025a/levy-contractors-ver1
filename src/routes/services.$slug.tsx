import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Header, MobileStickyBar } from "@/components/site/header";
import { ContactSection, Footer } from "@/components/site/contact";
import { Reveal } from "@/components/site/reveal";
import { LeadForm } from "@/components/site/hero";
import { CLIENT_GROUPS, clientsForGroup, getService, SERVICE_PAGES } from "@/lib/services-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getService(loaderData.slug) : undefined;
    if (!s) return { meta: [{ title: "Service Unavailable | Levy Contractors" }, { name: "robots", content: "noindex" }] };
    const title = `${s.title} in Nashville | Levy Contractors`;
    return {
      meta: [
        { title },
        { name: "description", content: `${s.tagline} ${s.intro.slice(0, 110)}…` },
        { property: "og:title", content: title },
        { property: "og:description", content: s.tagline },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/services/${s.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/services/${s.slug}` }],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useLoaderData();
  const s = getService(slug);
  if (!s) throw notFound();
  const others = SERVICE_PAGES.filter((o) => o.slug !== s.slug);

  return (
    <div className="bg-background">
      <Header />
      <main>
        <section className="relative flex min-h-[92vh] items-center overflow-hidden bg-ink pt-44 pb-20">
          <img src={s.image} alt={s.alt} className="absolute inset-0 h-full w-full object-cover" width={1280} height={960} />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
          <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[1fr_480px]">
            <div>
            <Link to="/" hash="services" className="eyebrow text-white/70 hover:text-safety">
              ← All Services
            </Link>
            <p className="mt-6 font-display text-sm tracking-[0.2em] text-safety">{s.number}</p>
            <h1 className="mt-2 font-display text-5xl leading-[0.95] text-white md:text-7xl">{s.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">{s.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote-contact" className="btn-base btn-safety">Request a Free Quote</a>
              <a href="tel:+16152271645" className="btn-base btn-outline-light">
                <Phone className="h-4 w-4" aria-hidden /> +1 615-227-1645
              </a>
            </div>
            </div>
            <div className="anim-slide-up"><LeadForm id="hero-quote" /></div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1.3fr]">
            <Reveal>
              <p className="eyebrow text-steel">Overview</p>
              <h2 className="mt-3 font-display text-4xl leading-[1.02] text-ink md:text-5xl">What's Included</h2>
              <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">{s.intro}</p>
              <p className="eyebrow mt-10 text-steel">Who We Serve</p>
              <ul className="mt-4 grid gap-2">
                {s.clients.map((c) => (
                  <li key={c} className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-ink uppercase">
                    <span className="h-1.5 w-1.5 bg-safety" aria-hidden />{c}
                  </li>
                ))}
              </ul>
            </Reveal>
            <div className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {s.scope.map((item, i) => (
                <Reveal key={item.title} delay={i * 80}>
                  <div className="h-full bg-card p-7">
                    <span className="block h-[3px] w-10 bg-safety" />
                    <h3 className="mt-5 font-display text-2xl text-ink">{item.title}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-muted-foreground">{item.copy}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-ink py-20 md:py-24">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <p className="eyebrow text-safety">How It Works</p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">Our Process</h2>
            <ol className="mt-10 grid gap-px bg-white/10 md:grid-cols-5">
              {s.steps.map((step, i) => (
                <li key={step} className="bg-ink p-6">
                  <span className="font-display text-3xl text-safety">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-3 text-[13px] font-semibold tracking-[0.08em] text-white uppercase">{step}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-concrete py-20 md:py-24">
          <div className="mx-auto max-w-[1400px] px-5 md:px-8">
            <Reveal>
              <p className="eyebrow text-steel">Trusted By</p>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Our Clients</h2>
              <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-muted-foreground">
                A selection of the facilities, institutions, and organizations Levy has served across
                Tennessee, Alabama, Kentucky, and Georgia since 1987.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-6">
              {CLIENT_GROUPS.map((group, gi) => {
                const members = clientsForGroup(group);
                const mixed = group.sectors.length > 1;
                return (
                  <Reveal key={group.title} delay={gi * 60}>
                    <div className="relative border border-border bg-card p-6 md:p-10">
                      <span className="absolute top-0 left-0 h-[3px] w-16 bg-safety" aria-hidden />
                      <h3 className="font-display text-2xl text-ink md:text-3xl">{group.title}</h3>
                      <p className="mt-2 max-w-3xl text-[14px] leading-relaxed text-muted-foreground">{group.blurb}</p>
                      <ul className="mt-7 grid gap-x-10 gap-y-3.5 md:grid-cols-2">
                        {members.map((c) => (
                          <li key={c.name} className="grid min-w-0 grid-cols-[minmax(0,auto)_minmax(1rem,1fr)] items-baseline gap-x-3 gap-y-1">
                            <span className="min-w-0 break-words text-[14.5px] font-bold text-ink">{c.name}</span>
                            <span className="border-b border-dotted border-muted-foreground/40" aria-hidden />
                            {mixed && (
                              <span className="col-span-2 min-w-0 break-words text-[11px] font-semibold tracking-[0.1em] text-muted-foreground uppercase">
                                {c.sector}
                              </span>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-20 md:py-28">
          <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-2">
            <div>
              <p className="eyebrow text-steel">Common Questions</p>
              <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">FAQ</h2>
              <dl className="mt-8 divide-y divide-border border-y border-border">
                {s.faqs.map((f) => (
                  <div key={f.q} className="py-5">
                    <dt className="font-semibold text-ink">{f.q}</dt>
                    <dd className="mt-2 text-[15px] leading-relaxed text-muted-foreground">{f.a}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div>
              <p className="eyebrow text-steel">More Services</p>
              <div className="mt-8 grid gap-4">
                {others.map((o) => (
                  <Link key={o.slug} to="/services/$slug" params={{ slug: o.slug }}
                    className="card-lift group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden border border-border bg-card sm:gap-5">
                    <img src={o.image} alt={o.alt} loading="lazy" className="h-40 w-24 shrink-0 object-cover sm:w-36" />
                    <div className="min-w-0">
                      <span className="font-display text-xs tracking-[0.2em] text-safety">{o.number}</span>
                      <h3 className="break-words font-display text-xl leading-tight text-ink">{o.title}</h3>
                    </div>
                    <ArrowRight className="mr-5 h-5 w-5 shrink-0 text-ink group-hover:text-safety" aria-hidden />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>

        <ContactSection />
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}
