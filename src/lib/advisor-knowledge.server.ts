import { SERVICE_PAGES, CLIENT_LIST } from "./services-data";
import { PROJECTS } from "./projects-data";

// Bundled at build time; no crawling, filesystem access, or remote pages at request time.
const websiteCopy = import.meta.glob([
  "../components/site/hero.tsx", "../components/site/why-safety.tsx",
  "../components/site/industries.tsx", "../components/site/contact.tsx",
  "../components/site/services.tsx", "../routes/about.tsx",
  "../routes/contact.tsx", "../routes/service-area.tsx",
  "../routes/services.index.tsx", "../routes/projects.tsx",
], { eager: true, query: "?raw", import: "default" });

function copyFromSource(source: string) {
  // Include prose strings, scope arrays and JSX text; exclude imports and implementation.
  const prose = [...source.matchAll(/"([^"\n]{18,})"/g)]
    .map((match) => match[1] ?? "")
    .filter((text) => !/class|@\/|^https?:|^tel:|^\/|px-|bg-|text-|grid|flex|placeholder/i.test(text));
  const jsx = [...source.matchAll(/>([^<>{}]+)</g)]
    .map((match) => (match[1] ?? "").replace(/&apos;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim())
    .filter((text) => /[a-z]{3}/i.test(text) && !/placeholder|once confirmed/i.test(text));
  return [...new Set([...prose, ...jsx])].join("\n");
}

export function websiteKnowledge() {
  return JSON.stringify({
    company: {
      name: "Levy Contractors, Inc.", founded: 1987,
      base: "Nashville, Tennessee", phone: "+1 615-227-1645",
      mailingAddress: "P.O. Box 70039, Nashville, TN",
      serviceArea: ["Tennessee", "Alabama", "Kentucky", "Georgia"],
      certifications: ["NWBOC Women's Business Enterprise (WBE)", "NWBOC Women-Owned Small Business (WOSB)", "State of Tennessee Governor's Office of Diversity Business Enterprise (certified Diversity Business Enterprise)"],
      audience: "Commercial, industrial and institutional clients, universities, government, property managers and general contractors",
      links: { about: "/about", contact: "/contact", services: "/services", projects: "/projects", serviceArea: "/service-area", credentials: "/about" },
      unknown: "Pricing, availability, exact business hours, public email, insurance amounts and specific license numbers are not published. Testimonials are placeholders, not verified reviews.",
    },
    services: SERVICE_PAGES.map(({ image, alt, ...service }) => ({ ...service, path: `/services/${service.slug}` })),
    clients: { note: "Owner-provided general client list; not assigned to individual services", list: CLIENT_LIST },
    projects: PROJECTS.map(({ cover, media, ...project }) => ({
      ...project, path: `/projects/${project.slug}`,
      media: media.map((item) => ({ type: item.type, description: item.alt })),
    })),
    supplementaryWebsiteCopy: Object.entries(websiteCopy).map(([file, source]) => ({
      page: file.includes("about.tsx") ? "/about" : file.includes("service-area.tsx") ? "/service-area" : file.includes("contact.tsx") ? "/contact" : "/",
      copy: typeof source === "string" ? copyFromSource(source) : "",
    })),
  });
}