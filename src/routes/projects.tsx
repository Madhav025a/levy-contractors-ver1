import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, PhotoStrip, pageMeta } from "@/components/site/page-shell";
import { B2BSection, Industries, Projects, Testimonials } from "@/components/site/industries";
import industrial from "@/assets/proj-industrial.jpg";
import university from "@/assets/ind-university.jpg";
import commercial from "@/assets/ind-commercial.jpg";
import institutional from "@/assets/ind-institutional.jpg";
import property from "@/assets/ind-property.jpg";

export const Route = createFileRoute("/projects")({
  head: () =>
    pageMeta("/projects", "Projects | Commercial & Industrial Work | Levy Industrial",
      "Asbestos abatement, demolition, and site assessment projects for industrial, university, and commercial clients in Middle Tennessee."),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Our Work" title="Projects Across Middle Tennessee"
        copy="Industrial plants, campuses, commercial buildings, and managed properties — completed safely and properly."
        image={industrial} alt="Industrial facility abatement project" />
      <Projects />
      <PhotoStrip images={[
        { src: university, alt: "University campus building" },
        { src: commercial, alt: "Commercial office building" },
        { src: institutional, alt: "Institutional facility" },
        { src: property, alt: "Managed commercial property" },
      ]} />
      <Industries />
      <B2BSection />
      <Testimonials />
    </PageShell>
  );
}
