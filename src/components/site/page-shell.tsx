import type { ReactNode } from "react";
import { Phone } from "lucide-react";
import { Header, MobileStickyBar } from "./header";
import { ContactSection, Footer } from "./contact";
import { Reveal } from "./reveal";

export function PageShell({ children, contact = true }: { children: ReactNode; contact?: boolean }) {
  return (
    <div className="bg-background">
      <Header />
      <main>
        {children}
        {contact && <ContactSection />}
      </main>
      <Footer />
      <MobileStickyBar />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  copy,
  image,
  alt,
}: {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  alt: string;
}) {
  return (
    <section className="relative flex min-h-[62vh] items-end overflow-hidden bg-ink pt-40 pb-16">
      <img src={image} alt={alt} width={1600} height={1000} className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/45 to-ink/10" />
      <div className="relative mx-auto w-full max-w-[1400px] px-5 md:px-8">
        <p className="eyebrow anim-rise text-safety">{eyebrow}</p>
        <h1 className="anim-rise mt-3 max-w-4xl font-display text-5xl leading-[0.95] text-white md:text-7xl">{title}</h1>
        <p className="anim-rise mt-5 max-w-2xl text-lg text-white/80">{copy}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <a href="#quote-contact" className="btn-base btn-safety">Request a Free Quote</a>
          <a href="tel:6152271645" className="btn-base btn-outline-light">
            <Phone className="h-4 w-4" aria-hidden /> 615.227.1645
          </a>
        </div>
      </div>
    </section>
  );
}

export function PhotoStrip({ images }: { images: { src: string; alt: string }[] }) {
  return (
    <section className="bg-ink">
      <div className="grid grid-cols-2 gap-px md:grid-cols-4">
        {images.map((img, i) => (
          <Reveal key={img.alt} delay={i * 80}>
            <div className="group aspect-square overflow-hidden">
              <img src={img.src} alt={img.alt} loading="lazy" width={800} height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110" />
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function SplitFeature({
  eyebrow, title, copy, image, alt, points, reverse,
}: {
  eyebrow: string; title: string; copy: string; image: string; alt: string; points?: string[]; reverse?: boolean;
}) {
  return (
    <section className="py-20 md:py-28">
      <div className={`mx-auto grid max-w-[1400px] items-center gap-12 px-5 md:px-8 lg:grid-cols-2 ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}>
        <Reveal>
          <img src={image} alt={alt} loading="lazy" width={1600} height={1000} className="aspect-[4/3] w-full object-cover" />
        </Reveal>
        <Reveal delay={100}>
          <p className="eyebrow text-steel">{eyebrow}</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.02] text-ink md:text-5xl">{title}</h2>
          <p className="mt-6 text-[16px] leading-relaxed text-muted-foreground">{copy}</p>
          {points && (
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {points.map((p) => (
                <li key={p} className="flex items-center gap-2 text-[13px] font-semibold tracking-wide text-ink uppercase">
                  <span className="h-1.5 w-1.5 bg-safety" aria-hidden />{p}
                </li>
              ))}
            </ul>
          )}
        </Reveal>
      </div>
    </section>
  );
}

export function pageMeta(path: string, title: string, description: string) {
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: path },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: path }],
  };
}
