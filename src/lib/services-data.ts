import asbestosImg from "@/assets/svc-asbestos.jpg";
import demolitionImg from "@/assets/svc-demolition.jpg";
import assessmentImg from "@/assets/svc-assessment.jpg";
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
    title: "Site Assessment & Asbestos Surveys, Inspections & Testing",
    tagline: "Know the risks before the work begins.",
    intro:
      "Levy brings site assessment and asbestos surveys, inspections, and testing together in one pre-project service. We review building conditions, utilities, safety considerations, and suspect asbestos-containing materials to help commercial and industrial owners plan renovation, abatement, or demolition with a clear understanding of the work ahead.",
    image: assessmentImg,
    alt: "Construction supervisor reviewing plans on a tablet inside an industrial plant",
    scope: [
      { title: "Site Assessment", copy: "Review structural conditions, building systems, access, and the proposed work area. The assessment identifies conditions that can affect sequencing, coordination, and the scope of a commercial or industrial project." },
      { title: "Asbestos Surveys", copy: "Review the areas affected by planned renovation or demolition and identify suspect asbestos-containing materials. The survey establishes what needs closer inspection or sampling so environmental considerations can be included in project planning." },
      { title: "Asbestos Inspections", copy: "Inspect accessible suspect materials and document their location, condition, and relationship to the proposed work. Inspection findings help define the sampling scope and identify areas requiring further evaluation." },
      { title: "Sampling & Testing", copy: "Collect material samples for laboratory analysis to determine whether asbestos is present. Testing results inform decisions about handling materials and planning any necessary abatement; visual inspection alone cannot confirm asbestos content." },
      { title: "Utilities & Fire Prevention", copy: "Identify utilities that may affect the work and discuss isolation requirements and fire risks. These findings support coordination with owners, facility managers, and the project team before site activities begin." },
      { title: "Safety & Site Controls", copy: "Review hazards, occupant access, and the separation of work areas from active operations. Use the assessment to identify protection measures and site controls that need to be addressed in the project plan." },
      { title: "Findings & Project Planning", copy: "Bring site observations and asbestos testing results together in a clear summary of findings and recommended next steps. Discuss how those findings affect the scope, schedule, and coordination of assessment, abatement, or demolition work." },
    ],
    steps: ["Project & Records Review", "Site Assessment & Inspection", "Survey & Material Sampling", "Testing & Findings", "Recommendations & Planning"],
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
      { q: "Are asbestos surveys, inspections, and testing part of this service?", a: "Yes. They are included within the combined assessment service. The project scope determines which areas are surveyed, which suspect materials are inspected, and what samples are needed for laboratory analysis." },
      { q: "Can an inspection alone confirm whether a material contains asbestos?", a: "No. An inspection identifies suspect materials; material sampling and laboratory analysis are used to determine asbestos content." },
      { q: "What happens if asbestos is found?", a: "We explain the findings and discuss the next steps for the planned work, including coordination of asbestos abatement when needed." },
    ],
  },
  {
    slug: "mold-remediation",
    number: "04",
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
  const canonicalSlug = slug === "asbestos-surveys-testing" ? "site-assessment" : slug;
  return SERVICE_PAGES.find((s) => s.slug === canonicalSlug);
}
