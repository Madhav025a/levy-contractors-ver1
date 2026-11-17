import { createFileRoute } from "@tanstack/react-router";
import { SERVICE_PAGES } from "@/lib/services-data";
import { PROJECTS } from "@/lib/projects-data";
import { abs } from "@/lib/site-url";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: () => {
        const paths = ["/", "/about", "/services", "/projects", "/service-area", "/contact",
          ...SERVICE_PAGES.map((s) => `/services/${s.slug}`), ...PROJECTS.map((p) => `/projects/${p.slug}`)];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${abs(p)}</loc></url>`).join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
