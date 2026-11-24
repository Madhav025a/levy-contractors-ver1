import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, SplitFeature, pageMeta } from "@/components/site/page-shell";
import { ServiceArea } from "@/components/site/industries";
import skyline from "@/assets/nashville-skyline.jpg";
import aboutCrew from "@/assets/about-crew.jpg";

export const Route = createFileRoute("/service-area")({
  head: () =>
    pageMeta("/service-area", "Service Area | TN, AL, KY & GA | Levy Contractors",
      "Levy Contractors serves commercial and industrial projects across Tennessee, Alabama, Kentucky and Georgia. Asbestos, demolition, mold and assessment services."),
  component: ServiceAreaPage,
});

function ServiceAreaPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Service Area" title="Serving Tennessee, Alabama, Kentucky & Georgia"
        copy="Based in Nashville, with decades of regional experience on commercial and industrial projects across the Southeast."
        image={skyline} alt="Nashville skyline at dusk over the Cumberland River" />
      <ServiceArea />
      <SplitFeature eyebrow="Local Since 1979" title="Close to Your Site, Familiar With Your Market"
        copy="Being based in Nashville means faster mobilization across the region, local knowledge, and long-standing relationships with the area's contractors, facilities, and institutions."
        image={aboutCrew} alt="Levy crew with the Nashville skyline behind them"
        points={["Tennessee", "Alabama", "Kentucky", "Georgia"]} />
    </PageShell>
  );
}
