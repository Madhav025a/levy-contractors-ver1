import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICE_PAGES } from "@/lib/services-data";
import { Reveal } from "./reveal";

export function ServiceCards() {
  return (
    <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
      {SERVICE_PAGES.map((service, index) => (
        <Reveal key={service.slug} delay={index * 100} className="h-full">
          <Link
            to="/services/$slug"
            params={{ slug: service.slug }}
            className="card-lift group relative flex h-full flex-col overflow-hidden bg-ink"
          >
            {/* Image panel */}
            <div className="relative h-72 shrink-0 overflow-hidden">
              <img
                src={service.cardImage ?? service.image}
                alt={service.cardAlt ?? service.alt}
                loading="lazy"
                width={1280}
                height={960}
                className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/5" />
              {/* Ghosted number */}
              <span
                aria-hidden
                className="absolute -top-3 right-4 font-display text-[7rem] leading-none text-white/10 transition-colors duration-500 group-hover:text-safety/30"
              >
                {service.number}
              </span>
              {/* Number badge */}
              <span className="absolute top-5 left-5 bg-safety px-3 py-2 font-display text-sm tracking-[0.15em] text-white">
                {service.number}
              </span>
              {/* Title overlaid on image */}
              <div className="absolute right-5 bottom-5 left-5">
                <span className="mb-3 block h-[3px] w-10 bg-safety transition-all duration-500 group-hover:w-24" />
                <h3 className="font-display text-3xl leading-[0.95] text-white md:text-4xl">
                  {service.title}
                </h3>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <p className="text-[15px] leading-relaxed text-white/65">{service.tagline}</p>
              <ul className="mt-5 grid gap-2.5">
                {service.scope.slice(0, 4).map((item) => (
                  <li
                    key={item.title}
                    className="flex items-center gap-3 text-[13px] font-semibold tracking-wide text-white/85 uppercase"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 bg-safety" aria-hidden />
                    {item.title}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-2 border-t border-white/10 pt-6 text-[13px] font-bold tracking-[0.12em] text-white uppercase transition-colors group-hover:text-safety">
                Explore Service
                <ArrowRight
                  className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5"
                  aria-hidden
                />
              </span>
            </div>

            {/* Bottom accent line */}
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-[3px] w-0 bg-safety transition-all duration-500 group-hover:w-full"
            />
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
