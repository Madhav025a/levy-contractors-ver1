import { createFileRoute, notFound } from "@tanstack/react-router";
import { Camera, MapPin } from "lucide-react";
import { ProjectCard } from "@/components/site/project-card";
import { PageHero, PageShell } from "@/components/site/page-shell";
import { Reveal } from "@/components/site/reveal";
import { getProject, PROJECTS } from "@/lib/projects-data";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const p = getProject(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug };
  },
  head: ({ loaderData }) => {
    const p = loaderData ? getProject(loaderData.slug) : undefined;
    if (!p) return { meta: [{ title: "Project Unavailable | Levy Industrial" }, { name: "robots", content: "noindex" }] };
    const title = `${p.title}, ${p.location} | Levy Industrial Projects`;
    return {
      meta: [
        { title },
        { name: "description", content: `${p.category}: ${p.summary}` },
        { property: "og:title", content: title },
        { property: "og:description", content: p.summary },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${p.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/projects/${p.slug}` }],
    };
  },
  component: ProjectDetail,
});

function ProjectDetail() {
  const { slug } = Route.useLoaderData();
  const p = getProject(slug)!;
  const others = PROJECTS.filter((o) => o.slug !== p.slug).slice(0, 3);

  return (
    <PageShell>
      <PageHero eyebrow={`${p.category} — ${p.location}`} title={p.title} copy={p.summary} image={p.cover} alt={p.title} />

      <section className="bg-background py-20 md:py-28">
        <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="eyebrow text-steel">Project Overview</p>
            <h2 className="mt-3 font-display text-4xl leading-[1.02] text-ink md:text-5xl">About The Project</h2>
            <div className="mt-6 space-y-5 text-[16px] leading-relaxed text-muted-foreground">
              {p.overview.map((para) => <p key={para}>{para}</p>)}
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="border-t-4 border-safety bg-ink p-8">
              <dl className="space-y-4 text-white">
                <div><dt className="eyebrow text-white/50">Location</dt><dd className="mt-1 flex items-center gap-2 font-display text-xl"><MapPin className="h-4 w-4 text-safety" aria-hidden />{p.location}</dd></div>
                <div><dt className="eyebrow text-white/50">Project Type</dt><dd className="mt-1 font-display text-xl">{p.category}</dd></div>
              </dl>
              <p className="eyebrow mt-8 text-white/50">Scope of Work</p>
              <ul className="mt-3 space-y-2.5">
                {p.scope.map((s) => (
                  <li key={s} className="flex items-center gap-3 text-[13px] font-semibold tracking-wide text-white/85 uppercase">
                    <span className="h-1.5 w-1.5 shrink-0 bg-safety" aria-hidden />{s}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Reveal>
            <p className="eyebrow text-safety">What We Did</p>
            <h2 className="mt-3 font-display text-4xl text-white md:text-5xl">Services We Performed</h2>
          </Reveal>
          <div className="mt-10 grid gap-px bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {p.services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 80}>
                <div className="h-full bg-ink p-8">
                  <span className="font-display text-4xl text-safety">{String(i + 1).padStart(2, "0")}</span>
                  <h3 className="mt-3 font-display text-2xl text-white">{svc.title}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-white/65">{svc.copy}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-concrete py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <Reveal>
            <p className="eyebrow text-steel">Gallery</p>
            <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Project Photos &amp; Video</h2>
          </Reveal>
          {p.media.length === 0 ? (
            <div className="mt-10 flex flex-col items-center justify-center gap-3 border border-dashed border-input bg-white px-6 py-20 text-center">
              <Camera className="h-8 w-8 text-steel" aria-hidden />
              <p className="font-display text-2xl text-ink">Project photos coming soon</p>
            </div>
          ) : (
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {p.media.map((m) => (
                <div key={m.src} className="group aspect-[4/3] overflow-hidden bg-ink">
                  {m.type === "video" ? (
                    <video src={m.src} controls playsInline className="h-full w-full object-cover" aria-label={m.alt} />
                  ) : (
                    <img src={m.src} alt={m.alt} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-background py-20">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <p className="eyebrow text-steel">More Projects</p>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {others.map((o) => <ProjectCard key={o.slug} project={o} />)}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

