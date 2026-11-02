import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, SplitFeature, pageMeta } from "@/components/site/page-shell";
import { ServiceArea } from "@/components/site/industries";
import skyline from "@/assets/nashville-skyline.jpg";
import aboutCrew from "@/assets/about-crew.jpg";
import university from "@/assets/ind-university.jpg";
import industrialInd from "@/assets/ind-industrial.jpg";
import commercial from "@/assets/ind-commercial.jpg";
import gc from "@/assets/ind-gc.jpg";

export const Route = createFileRoute("/service-area")({
  head: () =>
    pageMeta("/service-area", "Service Area | Nashville & Middle Tennessee | Levy Industrial",
      "Levy serves commercial and industrial clients throughout Nashville and the surrounding Middle Tennessee region."),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Service Area" title="Serving Nashville & Middle Tennessee"
        copy="Local crews and decades of regional experience for projects across the Nashville area."
        image={skyline} alt="Nashville skyline at dusk over the Cumberland River" />
      <ServiceArea />
      <SplitFeature eyebrow="Local Since 1987" title="Close to Your Site, Familiar With Your Market"
        copy="Being based in Nashville means faster mobilization, local knowledge, and long-standing relationships with the region's contractors, facilities, and institutions."
        image={aboutCrew} alt="Levy crew with the Nashville skyline behind them"
        points={["Nashville", "Davidson County", "Middle Tennessee", "Surrounding regions"]} />
    </PageShell>
  );
}
