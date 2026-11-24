import { abs } from "./site-url";

export const BUSINESS_ID = `${abs("/")}#organization`;
export const SERVICE_AREAS = ["Tennessee", "Alabama", "Kentucky", "Georgia"];

export const SERVICE_SEO: Record<string, { title: string; description: string }> = {
  "asbestos-removal": {
    title: "Commercial Asbestos Removal in Nashville | Levy Contractors",
    description: "Commercial and industrial asbestos abatement in Nashville and across TN, AL, KY and GA. Containment, removal and closeout by Levy Contractors since 1979.",
  },
  demolition: {
    title: "Commercial Demolition in Nashville | Levy Contractors",
    description: "Selective and structural demolition for commercial and industrial properties in Nashville and across TN, AL, KY and GA. Request a free quote from Levy.",
  },
  "site-assessment": {
    title: "Site Assessment & Asbestos Testing | Levy Contractors",
    description: "Site assessment, asbestos surveys, inspections and laboratory testing for commercial projects across TN, AL, KY and GA. Plan your project with Levy.",
  },
  "mold-remediation": {
    title: "Commercial Mold Remediation | Levy Contractors",
    description: "Commercial and industrial mold remediation across TN, AL, KY and GA. Containment, controlled removal, cleaning and closeout. Request a free quote.",
  },
};

/** Encode metadata scripts without allowing page content to terminate the script. */
export function structuredData(data: unknown) {
  return {
    type: "application/ld+json",
    children: JSON.stringify(data).replace(/</g, "\\u003c"),
  };
}

export function pageMeta(path: string, title: string, description: string) {
  const url = abs(path);
  const parent = path.startsWith("/services/")
    ? { name: "Services", path: "/services" }
    : path.startsWith("/projects/")
      ? { name: "Projects", path: "/projects" }
      : undefined;
  const labels: Record<string, string> = {
    "/about": "About", "/services": "Services", "/projects": "Projects",
    "/contact": "Contact", "/service-area": "Service Area",
  };
  const crumbs = [
    { name: "Home", path: "/" },
    ...(parent ? [parent] : []),
    ...(path === "/" ? [] : [{ name: labels[path] ?? title.split(" | ")[0] ?? title, path }]),
  ];
  return {
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: url }],
    scripts: [structuredData({
      "@context": "https://schema.org",
      "@type": path === "/about" ? "AboutPage" : path === "/contact" ? "ContactPage" : "WebPage",
      "@id": `${url}#webpage`, url, name: title, description,
      inLanguage: "en-US", about: { "@id": BUSINESS_ID },
      isPartOf: { "@id": `${abs("/")}#website` },
    }), ...(path === "/" ? [] : [structuredData({
      "@context": "https://schema.org", "@type": "BreadcrumbList",
      itemListElement: crumbs.map((crumb, index) => ({
        "@type": "ListItem", position: index + 1, name: crumb.name, item: abs(crumb.path),
      })),
    })])],
  };
}