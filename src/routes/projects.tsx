import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, pageMeta } from "@/components/site/page-shell";
import { B2BSection, Industries, Projects, Testimonials } from "@/components/site/industries";
import industrial from "@/assets/proj-industrial.jpg";
import university from "@/assets/ind-university.jpg";
import commercial from "@/assets/ind-commercial.jpg";
import institutional from "@/assets/ind-institutional.jpg";
import property from "@/assets/ind-property.jpg";

export const Route = createFileRoute("/projects")({
  head: () =>
    pageMeta("/projects", "Projects | Commercial & Industrial Work | Levy Contractors",
      "Explore Levy Contractors' asbestos abatement, demolition and dismantlement projects for industrial plants, schools and landmarks in Tennessee and Kentucky."),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Our Work" title="Projects Across The Southeast"
        copy="Industrial plants, campuses, commercial buildings, and managed properties — completed safely and properly."
        image={industrial} alt="Industrial facility abatement project" />
      <Projects />
      <Industries />
      <B2BSection />
      <Testimonials />
    </PageShell>
  );
}
