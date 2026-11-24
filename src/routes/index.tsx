import { abs } from "@/lib/site-url";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Levy Contractors | Nashville Asbestos & Demolition" },
      {
        name: "description",
        content:
          "Third-generation family business: commercial and industrial asbestos abatement, demolition, and site assessment since 1979 — serving Tennessee, Alabama, Kentucky, and Georgia. Call +1 615-227-1645.",
      },
      { property: "og:title", content: "Levy Contractors | Nashville Since 1979" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: abs("/") },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Levy Contractors | Nashville Since 1979" },
      {
        property: "og:description",
        content:
          "Nashville commercial and industrial environmental construction: asbestos abatement, demolition, and site assessment. Request a free quote.",
      },
    ],
    links: [{ rel: "canonical", href: abs("/") }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org", "@type": "GeneralContractor",
        name: "Levy Contractors, Inc.", url: abs("/"), telephone: "+1 615-227-1645", foundingDate: "1979",
        address: { "@type": "PostalAddress", streetAddress: "P.O. Box 168", addressLocality: "Pleasant View", addressRegion: "TN", postalCode: "37146", addressCountry: "US" },
        areaServed: ["Tennessee", "Alabama", "Kentucky", "Georgia"],
        knowsAbout: ["Asbestos abatement", "Demolition", "Site assessment", "Asbestos surveys and testing", "Mold remediation"],
      }),
    }],
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
      <ConsultPopup />
    </div>
  );
}
