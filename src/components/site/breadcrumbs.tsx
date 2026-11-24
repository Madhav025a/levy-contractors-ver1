import { Link, useLocation } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

const LABELS: Record<string, string> = {
  about: "About", services: "Services", projects: "Projects", contact: "Contact", "service-area": "Service Area",
};

export function Breadcrumbs({ current }: { current: string }) {
  const { pathname } = useLocation();
  const segs = pathname.split("/").filter(Boolean);
  const crumbs = [{ label: "Home", to: "/" }];
  segs.forEach((s, i) => {
    const to = "/" + segs.slice(0, i + 1).join("/");
    crumbs.push({ label: i === segs.length - 1 ? (LABELS[s] && segs.length === 1 ? LABELS[s] : current) : LABELS[s] ?? s, to });
  });
  return (
    <nav aria-label="Breadcrumb" className="anim-rise mb-5">
      <ol className="flex flex-wrap items-center gap-1.5 text-[12px] font-semibold tracking-wide text-white/75 uppercase">
        {crumbs.map((c, i) => (
          <li key={c.to} className="flex min-w-0 items-center gap-1.5">
            {i > 0 && <ChevronRight className="h-3.5 w-3.5 shrink-0 text-safety" aria-hidden />}
            {i === crumbs.length - 1 ? (
              <span aria-current="page" className="break-words text-white">{c.label}</span>
            ) : (
              <Link to={c.to} className="transition-colors hover:text-white">{c.label}</Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
