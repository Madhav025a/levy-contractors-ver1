import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SERVICE_PAGES } from "@/lib/services-data";
import { Reveal } from "./reveal";

export function ServiceCards() {
  return (
    <div className="grid auto-rows-fr gap-6 md:grid-cols-2">
      {SERVICE_PAGES.map((service, index) => (
        <Reveal key={service.slug} delay={index * 100} className="h-full">
          <Link to="/services/$slug" params={{ slug: service.slug }}
            className="card-lift group flex h-full flex-col overflow-hidden border border-border bg-card">
            <div className="relative h-64 shrink-0 overflow-hidden">
              <img src={service.image} alt={service.alt} loading="lazy" width={1280} height={960}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <span className="absolute top-5 left-5 bg-ink px-3 py-2 font-display text-sm text-safety">{service.number}</span>
            </div>
            <div className="flex flex-1 flex-col p-6 md:p-7">
              <span className="mb-5 block h-[3px] w-10 bg-safety transition-all duration-500 group-hover:w-24" />
              <h3 className="min-h-28 font-display text-2xl leading-7 text-foreground">{service.title}</h3>
              <p className="min-h-20 text-[15px] leading-relaxed text-muted-foreground">{service.tagline}</p>
              <ul className="mt-4 grid gap-2">
                {service.scope.slice(0, 4).map((item) => (
                  <li key={item.title} className="flex min-h-10 items-center gap-3 text-[13px] font-semibold text-foreground">
                    <span className="h-1.5 w-1.5 shrink-0 bg-safety" aria-hidden />{item.title}
                  </li>
                ))}
              </ul>
              <span className="mt-auto inline-flex items-center gap-2 pt-7 text-[13px] font-bold text-foreground uppercase group-hover:text-safety-deep">
                Explore Service <ArrowRight className="h-4 w-4" aria-hidden />
              </span>
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}