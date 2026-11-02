import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, SplitFeature, pageMeta } from "@/components/site/page-shell";
import { Process, WhyLevy } from "@/components/site/why-safety";
import { Credentials, Testimonials } from "@/components/site/industries";
import aboutCrew from "@/assets/about-crew.jpg";
import contactMeeting from "@/assets/contact-meeting.jpg";
import asbestos from "@/assets/svc-asbestos.jpg";
import demolition from "@/assets/svc-demolition.jpg";
import industrial from "@/assets/proj-industrial.jpg";
import crew from "@/assets/why-crew.jpg";

export const Route = createFileRoute("/about")({
  head: () =>
    pageMeta("/about", "About Levy Industrial Contractors | Nashville Since 1987",
      "Family of experienced environmental construction professionals serving Nashville commercial and industrial clients since 1987."),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <PageHero eyebrow="About Levy" title="Nashville's Industrial Abatement Specialists Since 1987"
        copy="Decades of commercial and industrial experience, built on safety, quality, and doing the job right."
        image={aboutCrew} alt="Levy crew in hard hats and safety vests in front of the Nashville skyline" />
      <SplitFeature eyebrow="Our Story" title="Built on Experience, Driven by Safety"
        copy="Since 1987, Levy Industrial Contractors, Inc. has helped industrial corporations, universities, property management companies, and general contractors across Middle Tennessee complete complex environmental construction projects safely and on schedule."
        image={contactMeeting} alt="Levy project manager reviewing plans with a facility manager"
        points={["Founded 1987", "Nashville based", "Commercial & industrial", "NWBOC certified"]} />
      <WhyLevy />
      <Process />
      <Credentials />
      <Testimonials />
    </PageShell>
  );
}
