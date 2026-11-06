import { createFileRoute } from "@tanstack/react-router";
import { Header, MobileStickyBar } from "@/components/site/header";
import { Hero } from "@/components/site/hero";
import { Services, TrustStats } from "@/components/site/services";
import { Process, Safety, WhyLevy } from "@/components/site/why-safety";
import {
  B2BSection,
  Credentials,
  Industries,
  Projects,
  ServiceArea,
  Testimonials,
} from "@/components/site/industries";
import { ContactSection, Footer } from "@/components/site/contact";
import { ProjectAssistant } from "@/components/site/assistant";
import { ConsultPopup } from "@/components/site/consult-popup";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Levy Industrial Contractors | Nashville Asbestos & Demolition" },
      {
        name: "description",
        content:
          "Commercial and industrial asbestos abatement, demolition, and site assessment since 1987 — serving Tennessee, Alabama, Kentucky, and Georgia. Call 615.227.1645.",
      },
      { property: "og:title", content: "Levy Industrial Contractors | Nashville Since 1987" },
      {
        property: "og:description",
        content:
          "Nashville commercial and industrial environmental construction: asbestos abatement, demolition, and site assessment. Request a free quote.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="bg-background">
      <Header />
      <main>
        <Hero />
        <TrustStats />
        <Services />
        <WhyLevy />
        <Process />
        <Safety />
        <Industries />
        <Projects />
        <B2BSection />
        <Credentials />
        <Testimonials />
        <ServiceArea />
        <ContactSection />
      </main>
      <Footer />
      <MobileStickyBar />
      <ProjectAssistant />
      <ConsultPopup />
    </div>
  );
}
