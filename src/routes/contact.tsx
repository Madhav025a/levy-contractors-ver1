import { createFileRoute } from "@tanstack/react-router";
import { PageHero, PageShell, SplitFeature, pageMeta } from "@/components/site/page-shell";
import { ServiceArea } from "@/components/site/industries";
import meeting from "@/assets/contact-meeting.jpg";
import assessment from "@/assets/svc-assessment.jpg";

export const Route = createFileRoute("/contact")({
  head: () =>
    pageMeta("/contact", "Contact Levy Contractors | Request a Free Quote",
      "Discuss your commercial or industrial abatement, demolition, or site assessment project. Call +1 615-227-1645 or request a free quote."),
  component: ContactPage,
});

function ContactPage() {
  return (
    <PageShell>
      <PageHero eyebrow="Contact" title="Let's Discuss Your Project"
        copy="Tell us about your facility, scope, and schedule. We'll follow up with next steps and a free quote."
        image={meeting} alt="Levy project manager reviewing plans with a facility manager" />
      <SplitFeature eyebrow="What to Expect" title="A Straight Answer, Fast"
        copy="Share your project details and a member of our team will review the scope, ask the right questions, and schedule a site visit if needed."
        image={assessment} alt="Supervisor reviewing project plans on a tablet"
        points={["Project review", "Site visit", "Detailed quote", "Clear schedule"]} />
      <ServiceArea />
    </PageShell>
  );
}
