import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, pageMeta } from "@/components/site/page-shell";
import { Industries } from "@/components/site/industries";
import { ServiceCards } from "@/components/site/service-cards";
import heroImg from "@/assets/hero-abatement.jpg";

export const Route = createFileRoute("/services/")({
  head: () =>
    pageMeta("/services", "Environmental Construction Services | Levy Contractors",
      "Asbestos abatement, demolition, mold remediation, and combined site assessment with asbestos surveys, inspections and testing across TN, AL, KY, and GA."),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Our Services" title="Environmental Construction Services"
        copy="One accountable contractor for abatement, demolition, mold remediation, and site assessment with asbestos surveys, inspections, and testing."
        image={heroImg} alt="Asbestos abatement crew working inside an industrial facility" />
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1400px] px-5 md:px-8">
          <ServiceCards />
        </div>
      </section>
      <Industries />
    </PageShell>
  );
}
