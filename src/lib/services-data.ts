import asbestosImg from "@/assets/svc-asbestos.jpg";
import demolitionImg from "@/assets/svc-demolition.jpg";
import assessmentImg from "@/assets/svc-assessment.jpg";
import testingImg from "@/assets/svc-testing.jpg";
import moldImg from "@/assets/svc-mold.jpg";

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
  clientList: { name: string; sector: string }[];
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
    clientList: [
      { name: "Industrial Manufacturing Client", sector: "Industrial" },
      { name: "University Campus Client", sector: "Higher Education" },
      { name: "Property Management Client", sector: "Property Management" },
      { name: "General Contractor Client", sector: "Construction" },
      { name: "Healthcare Facility Client", sector: "Institutional" },
      { name: "Commercial Office Client", sector: "Commercial" },
    ],
    clients: ["Industrial corporations", "Universities", "Management companies", "General contractors"],
    faqs: [
      { q: "Do you work in occupied buildings?", a: "Yes. We regularly phase work in active facilities, campuses, and managed properties to keep operations running." },
      { q: "Can you support a general contractor's schedule?", a: "Yes. We coordinate abatement as a subcontractor and plan around the overall project timeline." },
      { q: "What areas do you serve?", a: "Tennessee, Alabama, Kentucky, and Georgia. Call to discuss projects outside the region." },
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
    clientList: [
      { name: "General Contractor Client", sector: "Construction" },
      { name: "Industrial Plant Client", sector: "Industrial" },
      { name: "Commercial Developer Client", sector: "Development" },
      { name: "Property Management Client", sector: "Property Management" },
      { name: "Retail Property Client", sector: "Commercial" },
      { name: "Municipal Facility Client", sector: "Public Sector" },
    ],
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
    clientList: [
      { name: "Facility Management Client", sector: "Facility Management" },
      { name: "University Campus Client", sector: "Higher Education" },
      { name: "Industrial Owner Client", sector: "Industrial" },
      { name: "General Contractor Client", sector: "Construction" },
      { name: "Institutional Facility Client", sector: "Institutional" },
      { name: "Commercial Property Client", sector: "Commercial" },
    ],
    clients: ["Facility managers", "Universities", "Industrial owners", "General contractors"],
    faqs: [
      { q: "When should an assessment happen?", a: "Ideally during early planning, before bids are finalized, so scope and budget are accurate." },
      { q: "What do I receive?", a: "A clear summary of findings and recommended next steps to plan the project." },
      { q: "Can the assessment lead into abatement or demolition?", a: "Yes. Many clients continue with Levy to execute the work identified." },
    ],
  },
];

  {
    slug: "asbestos-surveys-testing",
    number: "04",
    title: "Asbestos Surveys, Inspections & Testing",
    tagline: "Know what's in the building before work begins.",
    intro:
      "Before renovation or demolition, Levy performs asbestos surveys, inspections, and testing for commercial and industrial properties — identifying suspect materials so owners and contractors can plan scope, budget, and compliance requirements accurately.",
    image: testingImg,
    alt: "Inspector in protective equipment collecting a material sample for asbestos testing",
    scope: [
      { title: "Asbestos Surveys", copy: "Pre-renovation and pre-demolition surveys of commercial and industrial buildings." },
      { title: "Inspections", copy: "Systematic inspection of suspect materials throughout the facility." },
      { title: "Sampling & Testing", copy: "Material sampling with laboratory analysis to confirm asbestos content." },
      { title: "Findings & Next Steps", copy: "Clear reporting of results and recommended next steps for abatement or management." },
    ],
    steps: ["Project Review", "Site Walk & Inspection", "Sampling & Testing", "Lab Analysis", "Report & Recommendations"],
    clientList: [
      { name: "Commercial Property Client", sector: "Commercial" },
      { name: "Industrial Facility Client", sector: "Industrial" },
      { name: "General Contractor Client", sector: "Construction" },
      { name: "Property Management Client", sector: "Property Management" },
      { name: "University Campus Client", sector: "Higher Education" },
      { name: "Institutional Facility Client", sector: "Institutional" },
    ],
    clients: ["Commercial property owners", "General contractors", "Property managers", "Industrial facilities"],
    faqs: [
      { q: "When is an asbestos survey required?", a: "Typically before renovation or demolition of older commercial and industrial buildings, so materials can be handled correctly." },
      { q: "What happens if asbestos is found?", a: "We explain the findings and can plan the abatement work, keeping everything with one contractor." },
      { q: "What areas do you serve?", a: "Tennessee, Alabama, Kentucky, and Georgia. Call to discuss projects outside the region." },
    ],
  },
  {
    slug: "mold-remediation",
    number: "05",
    title: "Mold Remediation",
    tagline: "Controlled, safe mold removal for commercial facilities.",
    intro:
      "Levy provides mold remediation for commercial and industrial properties, using containment and controlled removal methods to address affected areas and help return the space to service.",
    image: moldImg,
    alt: "Worker in protective suit treating a mold-affected wall inside a commercial building",
    scope: [
      { title: "Assessment & Containment", copy: "Evaluation of affected areas and containment to prevent spread during work." },
      { title: "Controlled Removal", copy: "Removal of mold-affected materials using controlled methods and proper PPE." },
      { title: "Cleaning & Treatment", copy: "Cleaning and treatment of affected surfaces within the work area." },
      { title: "Disposal & Closeout", copy: "Proper disposal of contaminated materials and project closeout." },
    ],
    steps: ["Site Review", "Containment Setup", "Removal & Treatment", "Cleaning", "Closeout"],
    clientList: [
      { name: "Property Management Client", sector: "Property Management" },
      { name: "Commercial Building Client", sector: "Commercial" },
      { name: "Industrial Facility Client", sector: "Industrial" },
      { name: "Institutional Facility Client", sector: "Institutional" },
      { name: "General Contractor Client", sector: "Construction" },
      { name: "University Campus Client", sector: "Higher Education" },
    ],
    clients: ["Property managers", "Commercial owners", "Industrial facilities", "Institutions"],
    faqs: [
      { q: "Do you work in occupied buildings?", a: "Yes. We use containment to isolate work areas and minimize disruption to building operations." },
      { q: "Can mold remediation be combined with other work?", a: "Yes. It is often coordinated with demolition or renovation scopes already planned for the building." },
      { q: "What areas do you serve?", a: "Tennessee, Alabama, Kentucky, and Georgia. Call to discuss projects outside the region." },
    ],
  },
];

export function getService(slug: string) {
  return SERVICE_PAGES.find((s) => s.slug === slug);
}
