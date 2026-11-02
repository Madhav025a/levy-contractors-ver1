import asbestosImg from "@/assets/svc-asbestos.jpg";
import demolitionImg from "@/assets/svc-demolition.jpg";
import assessmentImg from "@/assets/svc-assessment.jpg";

export type ServicePage = {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  intro: string;
  image: string;
  alt: string;
  scope: { title: string; copy: string }[];
  steps: string[];
  clients: string[];
  faqs: { q: string; a: string }[];
};

export const SERVICE_PAGES: ServicePage[] = [
  {
    slug: "asbestos-removal",
    number: "01",
    title: "Asbestos Removal",
    tagline: "Commercial & industrial asbestos abatement since 1987.",
    intro:
      "Levy has specialized in commercial and industrial asbestos abatement in the Nashville area since 1987. Every project is planned and executed with a strong focus on worker safety, occupant protection, quality, and full regulatory compliance.",
    image: asbestosImg,
    alt: "Workers in protective suits sealing a containment barrier inside a commercial building",
    scope: [
      { title: "Containment & Negative Air", copy: "Engineered containment, critical barriers, and HEPA negative-air systems to isolate work areas." },
      { title: "Friable & Non-Friable Removal", copy: "Pipe and boiler insulation, fireproofing, ceiling materials, flooring, mastics, and roofing." },
      { title: "Occupied Facility Work", copy: "Phased abatement in active plants, campuses, and managed properties with minimal disruption." },
      { title: "Waste Handling & Documentation", copy: "Proper packaging, transport, disposal, and project closeout documentation." },
    ],
    steps: ["Project Review", "Work Plan & Notifications", "Containment Setup", "Abatement", "Clearance & Closeout"],
    clients: ["Industrial corporations", "Universities", "Management companies", "General contractors"],
    faqs: [
      { q: "Do you work in occupied buildings?", a: "Yes. We regularly phase work in active facilities, campuses, and managed properties to keep operations running." },
      { q: "Can you support a general contractor's schedule?", a: "Yes. We coordinate abatement as a subcontractor and plan around the overall project timeline." },
      { q: "What areas do you serve?", a: "Nashville and the surrounding Middle Tennessee region. Call to discuss projects outside the area." },
    ],
  },
  {
    slug: "demolition",
    number: "02",
    title: "Demolition",
    tagline: "Safe, efficient demolition for small and large-scale projects.",
    intro:
      "From selective interior removal to full structural demolition, Levy delivers controlled, efficient demolition for commercial and industrial clients — often paired with abatement so one contractor handles the full scope.",
    image: demolitionImg,
    alt: "Excavator with demolition attachment taking down a concrete commercial building",
    scope: [
      { title: "Structural Demolition", copy: "Complete removal of buildings and structures with planned sequencing and site control." },
      { title: "Selective Demolition", copy: "Interior strip-outs and targeted removal ahead of renovation, preserving what stays." },
      { title: "Commercial Demolition", copy: "Office, retail, and institutional buildings handled with attention to neighbors and access." },
      { title: "Industrial Demolition", copy: "Plants, equipment, and process areas with utility isolation and hazard controls." },
    ],
    steps: ["Site Walk", "Utility Isolation", "Abatement Coordination", "Demolition", "Debris Removal & Cleanup"],
    clients: ["General contractors", "Industrial facilities", "Property managers", "Developers"],
    faqs: [
      { q: "Can you handle abatement and demolition together?", a: "Yes. Combining both under one contractor simplifies scheduling and accountability." },
      { q: "Do you take on smaller selective projects?", a: "Yes. We handle both small selective work and large-scale structural demolition." },
      { q: "How do you manage safety on active sites?", a: "Every job starts with a hazard review, utility verification, and a site-specific safety plan." },
    ],
  },
  {
    slug: "site-assessment",
    number: "03",
    title: "Site Assessment",
    tagline: "Know the risks before the work begins.",
    intro:
      "Our site assessments identify structural, utility, fire, safety, and environmental considerations up front — so owners and contractors can budget accurately and avoid surprises once work starts.",
    image: assessmentImg,
    alt: "Construction supervisor reviewing plans on a tablet inside an industrial plant",
    scope: [
      { title: "Engineering Survey", copy: "Review of structural conditions and building systems that affect the work." },
      { title: "Utilities", copy: "Identification of live utilities and isolation requirements before abatement or demolition." },
      { title: "Fire Prevention", copy: "Assessment of fire risks and controls needed during the project." },
      { title: "Safety Risks", copy: "Documentation of site hazards and the controls required to protect crews and occupants." },
    ],
    steps: ["Engineering Survey", "Utilities", "Fire Prevention", "Safety Risks", "Project Planning"],
    clients: ["Facility managers", "Universities", "Industrial owners", "General contractors"],
    faqs: [
      { q: "When should an assessment happen?", a: "Ideally during early planning, before bids are finalized, so scope and budget are accurate." },
      { q: "What do I receive?", a: "A clear summary of findings and recommended next steps to plan the project." },
      { q: "Can the assessment lead into abatement or demolition?", a: "Yes. Many clients continue with Levy to execute the work identified." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
