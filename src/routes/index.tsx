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
import { ConsultPopup } from "@/components/site/consult-popup";
import { pageMeta } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () => pageMeta("/", "Levy Contractors | Nashville Asbestos & Demolition",
    "Commercial asbestos abatement, demolition, mold remediation and site assessment since 1979. Serving Tennessee, Alabama, Kentucky and Georgia. Free quotes."),
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
      <ConsultPopup />
    </div>
  );
}
