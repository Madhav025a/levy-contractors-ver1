import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Phone } from "lucide-react";
import { Header, MobileStickyBar } from "@/components/site/header";
import { ContactSection, Footer } from "@/components/site/contact";
import { Reveal } from "@/components/site/reveal";
import { LeadForm } from "@/components/site/hero";
import { getService, SERVICE_PAGES } from "@/lib/services-data";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { slug: service.slug };
  },
  head: ({ loaderData }) => {
    const s = loaderData ? getService(loaderData.slug) : undefined;
    if (!s) return { meta: [{ title: "Service Unavailable | Levy Industrial" }, { name: "robots", content: "noindex" }] };
    const title = `${s.title} in Nashville | Levy Industrial Contractors`;
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
          <div className="relative mx-auto grid w-full max-w-[1400px] items-center gap-10 px-5 md:px-8 lg:grid-cols-[1fr_400px]">
            <div>
            <Link to="/" hash="services" className="eyebrow text-white/70 hover:text-safety">
              ← All Services
            </Link>
            <p className="mt-6 font-display text-sm tracking-[0.2em] text-safety">{s.number}</p>
            <h1 className="mt-2 font-display text-5xl leading-[0.95] text-white md:text-7xl">{s.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-white/80">{s.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote-contact" className="btn-base btn-safety">Request a Free Quote</a>
              <a href="tel:6152271645" className="btn-base btn-outline-light">
                <Phone className="h-4 w-4" aria-hidden /> 615.227.1645
              </a>
            </div>
            </div>
            <div className="anim-slide-up"><LeadForm id="hero-quote" compact /></div>
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
              <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Our {s.title} Clients</h2>
            </Reveal>
            <div className="mt-10 border border-border bg-card p-6 md:p-10">
              <ul className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-3">
                {s.clientList.map((c, i) => (
                  <li key={c.name} className="flex items-center gap-4 bg-card p-5">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center bg-ink font-display text-sm text-safety">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <p className="font-semibold text-ink">{c.name}</p>
                      <p className="text-[12px] font-semibold tracking-[0.12em] text-muted-foreground uppercase">{c.sector}</p>
                    </div>
                  </li>
                ))}
              </ul>
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
                    className="card-lift group flex items-center gap-5 overflow-hidden border border-border bg-card">
                    <img src={o.image} alt={o.alt} loading="lazy" className="h-40 w-24 shrink-0 object-cover sm:w-36" />
                    <div className="flex-1 pr-5">
                      <span className="font-display text-xs tracking-[0.2em] text-safety">{o.number}</span>
                      <h3 className="font-display text-xl leading-tight text-ink">{o.title}</h3>
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
