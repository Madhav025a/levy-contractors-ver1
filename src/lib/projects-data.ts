import demolitionImg from "@/assets/svc-demolition.jpg";
import asbestosImg from "@/assets/svc-asbestos.jpg";
import selectiveImg from "@/assets/proj-selective.jpg";
import industrialImg from "@/assets/proj-industrial.jpg";
import bs01 from "@/assets/bridgestone-01.jpg.asset.json";
import bs02 from "@/assets/bridgestone-02.jpg.asset.json";
import bs03 from "@/assets/bridgestone-03.jpg.asset.json";
import bs04 from "@/assets/bridgestone-04.jpg.asset.json";
import bs05 from "@/assets/bridgestone-05.jpg.asset.json";
import bs06 from "@/assets/bridgestone-06.jpg.asset.json";
import bs07 from "@/assets/bridgestone-07.jpg.asset.json";
import bs08 from "@/assets/bridgestone-08.jpg.asset.json";
import bs09 from "@/assets/bridgestone-09.jpg.asset.json";
import bs10 from "@/assets/bridgestone-10.jpg.asset.json";
import samDavisCover from "@/assets/sam-davis-cover.jpg.asset.json";
import bell01 from "@/assets/south-central-bell-01.jpg";
import bell02 from "@/assets/south-central-bell-02.jpg";
import bell03 from "@/assets/south-central-bell-03.jpg";
import bell04 from "@/assets/south-central-bell-04.jpg";
import bell05 from "@/assets/south-central-bell-05.jpg";
import bell06 from "@/assets/south-central-bell-06.jpg";

export type ProjectMedia =
  | { type: "image"; src: string; alt: string; preserveFrame?: boolean }
  | { type: "video"; src: string; alt: string }
  | { type: "youtube"; id: string; alt: string };

export type ProjectPage = {
  slug: string;
  title: string;
  location: string;
  category: "Demolition" | "Selective Demolition" | "Asbestos Abatement" | "Dismantlement";
  summary: string;
  overview: string[];
  scope: string[];
  services: { title: string; copy: string }[];
  /** Placeholder cover until the owner supplies real project photos. */
  cover: string;
  media: ProjectMedia[];
};

export const PROJECTS: ProjectPage[] = [
  {
    slug: "bridgestone-firestone-plant",
    title: "Bridgestone/Firestone Plant",
    location: "Lebanon, TN",
    category: "Selective Demolition",
    summary: "Selective demolition of tornado-damaged structure while protecting inventory in place.",
    overview: [
      "After a tornado struck the Bridgestone/Firestone facility in Lebanon, Tennessee, Levy was brought in to remove the structurally damaged portions of the building.",
      "The challenge was that the plant's inventory remained inside. Our crews used specialized equipment and careful sequencing to take down damaged structure while protecting the inventory in place — avoiding the cost and delay of relocating it.",
    ],
    scope: ["Storm-damage assessment", "Selective structural demolition", "In-place inventory protection", "Specialized equipment", "Debris removal"],
    services: [
      { title: "Selective Demolition", copy: "Removed only the tornado-damaged structure, leaving the sound parts of the plant standing." },
      { title: "Inventory Protection", copy: "Protected the plant's inventory in place so it did not have to be moved during the work." },
      { title: "Specialized Equipment", copy: "Used equipment chosen for working close to stored goods inside an active building." },
    ],
    cover: bs02.url,
    media: [
      { type: "image", src: bs02.url, alt: "Demolition excavator gripping a bent structural steel beam on the collapsed roof of the tire warehouse." },
      { type: "image", src: bs03.url, alt: "Excavator dismantling the crushed roof section next to upright tire storage racks in the concrete yard." },
      { type: "image", src: bs04.url, alt: "Excavator removing damaged roof panels, exposing the warehouse interior filled with rows of tire racks." },
      { type: "image", src: bs05.url, alt: "Long-reach excavator dismantling a collapsed metal roof above tall interior storage racks stacked with tires." },
      { type: "image", src: bs09.url, alt: "Excavator with a hydraulic demolition shear dismantling the collapsed metal roof above racks loaded with stacked tires." },
      { type: "image", src: bs10.url, alt: "Excavator claw above tall storage racks filled with tires beneath a caved-in roof, with sheet-metal debris in the foreground." },
      { type: "image", src: bs06.url, alt: "High-reach demolition excavator breaking the upper concrete wall above loading bays 23 and 24." },
      { type: "image", src: bs07.url, alt: "Hydraulic shear crushing the concrete exterior wall beside a marked pedestrian doorway, with exposed rebar and rubble." },
      { type: "image", src: bs08.url, alt: "High-reach excavator tearing down the lower concrete wall section next to loading bay 24." },
      { type: "image", src: bs01.url, alt: "Worker in a safety vest managing hoses on the exterior lot, with scrap metal piles and the collapsed tire warehouse behind." },
    ],
  },
  {
    slug: "howard-school-phase-1",
    title: "Howard School — Phase I",
    location: "Nashville, TN",
    category: "Asbestos Abatement",
    summary: "Asbestos abatement ahead of selective demolition, with haul-off, fencing, and erosion control.",
    overview: [
      "Phase I at the Howard School in Nashville began with abatement of asbestos-containing materials so that selective demolition could proceed safely.",
      "Once abatement was complete, Levy carried out the selective demolition, hauled off all debris, and installed fencing and erosion control to leave the site secure and compliant.",
    ],
    scope: ["Asbestos abatement", "Selective demolition", "Full debris haul-off", "Site fencing", "Erosion control"],
    services: [
      { title: "Asbestos Abatement", copy: "Removed asbestos-containing materials before any demolition began." },
      { title: "Selective Demolition", copy: "Took down the planned portions of the building once abatement was complete." },
      { title: "Haul-Off & Site Controls", copy: "Hauled off all debris and installed fencing and erosion control." },
    ],
    cover: asbestosImg,
    media: [],
  },
  {
    slug: "joelton-water-tank",
    title: "Joelton Water Tank",
    location: "Joelton, TN",
    category: "Dismantlement",
    summary: "Manual dismantlement of a 150,000-gallon water tank for reassembly at another facility.",
    overview: [
      "Levy removed a 150,000-gallon water tank in Joelton, Tennessee. Rather than being scrapped, the tank was to be reassembled and put back into service at another facility.",
      "That meant the dismantlement had to be done by hand — piece by piece — so every component came down intact and ready for reuse.",
    ],
    scope: ["150,000-gallon tank", "Manual dismantlement", "Component preservation for reuse", "Rigging and lowering", "Site cleanup"],
    services: [
      { title: "Manual Dismantlement", copy: "Took the 150,000-gallon tank apart by hand, piece by piece." },
      { title: "Component Preservation", copy: "Kept every section intact so the tank could be reassembled at another facility." },
    ],
    cover: industrialImg,
    media: [],
  },
  {
    slug: "love-circle-tower",
    title: "Love Circle Tower",
    location: "Nashville, TN",
    category: "Demolition",
    summary: "Removal of a radio tower to make way for a new park area.",
    overview: [
      "At Love Circle in Nashville, Levy removed a radio tower so the site could be transformed into a new park area.",
      "Tower removal requires controlled, planned work at height and careful protection of the surrounding area — clearing the way for the community space that followed.",
    ],
    scope: ["Radio tower removal", "Work-at-height planning", "Controlled takedown", "Debris removal", "Site prep for park"],
    services: [
      { title: "Tower Removal", copy: "Removed the radio tower in a controlled, planned takedown." },
      { title: "Site Clearing", copy: "Cleared the site so it could become a new park area." },
    ],
    cover: demolitionImg,
    media: [],
  },
  {
    slug: "wku-carol-knicely-building",
    title: "Western Kentucky University — Carol Knicely Building",
    location: "Bowling Green, KY",
    category: "Selective Demolition",
    summary: "Façade and sidewalk removal for a new building entrance.",
    overview: [
      "For Western Kentucky University, Levy removed the façade of the Carol Knicely Building along with the adjacent sidewalk to make way for a new entrance.",
      "Working on an active campus called for careful site control and coordination so students, faculty, and visitors stayed safe throughout.",
    ],
    scope: ["Façade removal", "Sidewalk removal", "Active-campus site control", "Prep for new entrance", "Debris haul-off"],
    services: [
      { title: "Façade Removal", copy: "Removed the building's façade to prepare for a new entrance." },
      { title: "Sidewalk Removal", copy: "Removed the adjacent sidewalk to open up the new entrance area." },
    ],
    cover: selectiveImg,
    media: [],
  },
  {
    slug: "belle-meade-church",
    title: "Belle Meade Church",
    location: "Nashville, TN",
    category: "Selective Demolition",
    summary: "Removal of a church steeple in sections.",
    overview: [
      "Levy removed the steeple at Belle Meade Church in Nashville. To protect the building below, the steeple was taken down in sections rather than all at once.",
      "Sectional removal let our crew control every lift and keep the rest of the church structure undisturbed.",
    ],
    scope: ["Steeple removal", "Sectional takedown", "Lifting and rigging", "Protection of existing structure", "Cleanup"],
    services: [
      { title: "Steeple Removal", copy: "Removed the church steeple in sections." },
      { title: "Structure Protection", copy: "Controlled every lift to keep the rest of the church undisturbed." },
    ],
    cover: selectiveImg,
    media: [],
  },
  {
    slug: "ryman-auditorium",
    title: "Ryman Auditorium",
    location: "Nashville, TN",
    category: "Asbestos Abatement",
    summary: "Balcony removal work and removal of transite from the old press box.",
    overview: [
      "At Nashville's historic Ryman Auditorium, Levy removed a section from the balcony and removed transite (asbestos-cement) material from the old press box.",
      "Working inside a landmark venue meant protecting historic finishes while handling regulated material with care.",
    ],
    scope: ["Balcony section removal", "Transite removal", "Old press box", "Historic-building protection", "Regulated disposal"],
    services: [
      { title: "Balcony Work", copy: "Removed a section from the balcony of the historic auditorium." },
      { title: "Transite Removal", copy: "Removed transite (asbestos-cement) material from the old press box." },
    ],
    cover: asbestosImg,
    media: [],
  },
  {
    slug: "wildhorse-saloon",
    title: "Wildhorse Saloon",
    location: "Nashville, TN",
    category: "Asbestos Abatement",
    summary: "Removal of exterior asbestos transite under containment.",
    overview: [
      "Levy removed asbestos transite from the exterior of the Wildhorse Saloon in downtown Nashville.",
      "The work was performed under containment to keep fibers controlled in a busy downtown setting.",
    ],
    scope: ["Exterior transite removal", "Containment", "Downtown site control", "Regulated disposal"],
    services: [
      { title: "Asbestos Transite Removal", copy: "Removed asbestos transite from the building's exterior." },
      { title: "Containment", copy: "Performed the work under containment to keep fibers controlled downtown." },
    ],
    cover: asbestosImg,
    media: [],
  },
  {
    slug: "south-central-bell-green-hills",
    title: "South Central Bell Building — Green Hills",
    location: "Nashville, TN",
    category: "Demolition",
    summary: "Whole-structure demolition.",
    overview: [
      "Levy performed complete demolition of the South Central Bell Building in Nashville's Green Hills area.",
      "The full-structure takedown cleared the site for redevelopment.",
    ],
    scope: ["Whole-structure demolition", "Heavy equipment", "Debris removal", "Site clearing"],
    services: [
      { title: "Whole-Structure Demolition", copy: "Demolished the entire building." },
      { title: "Debris Removal", copy: "Removed demolition debris to clear the site." },
    ],
    cover: bell02,
    media: [
      { type: "image", src: bell02, alt: "Red lattice crane in front of the partially demolished South Central Bell building, with Levy equipment in the foreground.", preserveFrame: true },
      { type: "image", src: bell06, alt: "Close view of the red crane and exposed brick structure during South Central Bell demolition.", preserveFrame: true },
      { type: "image", src: bell05, alt: "Partially demolished brick facade with exposed floors and rubble at South Central Bell.", preserveFrame: true },
      { type: "image", src: bell03, alt: "Crane facing the exposed South Central Bell structure from the work area.", preserveFrame: true },
      { type: "image", src: bell04, alt: "Demolition progress showing the remaining building sections and debris piles.", preserveFrame: true },
      { type: "image", src: bell01, alt: "Archival black-and-white view of the South Central Bell demolition site from across the street.", preserveFrame: true },
    ],
  },
  {
    slug: "sam-davis-hotel",
    title: "Sam Davis Hotel",
    location: "Nashville, TN",
    category: "Demolition",
    summary: "Implosion of a 12-story hotel in downtown Nashville.",
    overview: [
      "Levy imploded the 12-story Sam Davis Hotel in downtown Nashville.",
      "Bringing down a high-rise in the middle of the city takes precise planning and strict safety controls for the surrounding streets and buildings.",
    ],
    scope: ["12-story implosion", "Downtown safety controls", "Debris removal", "Site clearing"],
    services: [
      { title: "Building Implosion", copy: "Imploded the 12-story hotel in downtown Nashville." },
      { title: "Downtown Safety Controls", copy: "Protected surrounding streets and buildings during the implosion." },
    ],
    cover: samDavisCover.url,
    media: [
      { type: "youtube", id: "an9ZlCYob0s", alt: "Video of the Sam Davis Hotel project in downtown Nashville." },
    ],
  },
  {
    slug: "governors-mansion",
    title: "Governor's Mansion",
    location: "Nashville, TN",
    category: "Selective Demolition",
    summary: "Selective demolition of select areas.",
    overview: [
      "At the Tennessee Governor's Mansion, Levy carried out selective demolition of a few select areas.",
      "Work at a high-profile residence calls for precision, discretion, and protection of everything that stays.",
    ],
    scope: ["Selective demolition", "Protection of existing finishes", "Careful debris removal"],
    services: [
      { title: "Selective Demolition", copy: "Demolished a few select areas of the mansion." },
      { title: "Protection of Existing Spaces", copy: "Protected the parts of the residence that remained." },
    ],
    cover: selectiveImg,
    media: [],
  },
];

export const PROJECT_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
