import { Link } from "@tanstack/react-router";
import { ArrowRight, MapPin } from "lucide-react";
import type { ProjectPage } from "@/lib/projects-data";

export function ProjectCard({ project }: { project: ProjectPage }) {
  return (
    <Link to="/projects/$slug" params={{ slug: project.slug }} className="card-lift group flex h-full flex-col overflow-hidden border border-border bg-white">
      <div className="relative aspect-[16/11] overflow-hidden">
        <img src={project.cover} alt={`${project.title} — ${project.category} project by Levy Contractors in ${project.location}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-107" />
        <span className="absolute top-4 left-4 bg-safety px-2.5 py-1 text-[11px] font-bold tracking-[0.1em] text-accent-foreground uppercase">{project.category}</span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="font-display text-xl text-ink">{project.title}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] text-steel uppercase"><MapPin className="h-3.5 w-3.5" aria-hidden />{project.location}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[12px] font-bold tracking-[0.12em] text-ink uppercase group-hover:text-safety">View Project <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden /></span>
      </div>
    </Link>
  );
}
