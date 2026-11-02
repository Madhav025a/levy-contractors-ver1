import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, PhotoStrip, SplitFeature, pageMeta } from "@/components/site/page-shell";
import { Safety } from "@/components/site/why-safety";
import safetyWide from "@/assets/safety-wide.jpg";
import gear from "@/assets/safety-gear.jpg";
import asbestos from "@/assets/svc-asbestos.jpg";
import assessment from "@/assets/svc-assessment.jpg";
import crew from "@/assets/why-crew.jpg";
import heroImg from "@/assets/hero-abatement.jpg";

export const Route = createFileRoute("/safety")({
  head: () =>
    pageMeta("/safety", "Safety & Compliance | Levy Industrial Contractors",
      "How Levy protects crews, occupants, and clients on every commercial and industrial abatement and demolition project."),
  component: SafetyPage,
});

function SafetyPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Safety & Compliance" title="Safety Is the First Line Item on Every Job"
        copy="Planning, protective equipment, containment, and monitoring that protect workers, occupants, and your project."
        image={safetyWide} alt="Abatement workers in protective suits inside containment" />
      <SplitFeature eyebrow="Protective Equipment" title="The Right Gear, Every Time"
        copy="Crews work with full-face respirators, HEPA filtration, disposable protective suits, and air monitoring equipment matched to the hazards of each site."
        image={gear} alt="Respirators, HEPA filters, Tyvek suits and air monitoring pump"
        points={["Respiratory protection", "HEPA filtration", "Air monitoring", "Decontamination"]} />
      <Safety />
      <SplitFeature reverse eyebrow="Planning" title="Hazards Identified Before Work Starts"
        copy="Every project begins with a site review of utilities, structural conditions, fire risks, and access so the work plan addresses risks up front."
        image={assessment} alt="Supervisor reviewing plans inside an industrial plant"
        points={["Site-specific plans", "Utility isolation", "Fire prevention", "Daily oversight"]} />
      <PhotoStrip images={[
        { src: asbestos, alt: "Sealed containment barrier" },
        { src: heroImg, alt: "Crew in respirators" },
        { src: crew, alt: "Crew on site in hi-vis gear" },
        { src: gear, alt: "Safety equipment" },
      ]} />
    </PageShell>
  );
}
