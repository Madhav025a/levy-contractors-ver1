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
import ryman01 from "@/assets/ryman-01.jpg";
import ryman02 from "@/assets/ryman-02.jpg";
import ryman03 from "@/assets/ryman-03.jpg";
import ryman04 from "@/assets/ryman-04.jpg";
import ryman05 from "@/assets/ryman-05.jpg";
import wildhorse01 from "@/assets/wildhorse-01.jpg";
import wildhorse02 from "@/assets/wildhorse-02.jpg";
import wildhorse03 from "@/assets/wildhorse-03.jpg";
import wildhorse04 from "@/assets/wildhorse-04.jpg";
import wildhorse05 from "@/assets/wildhorse-05.jpg";
import wildhorse06 from "@/assets/wildhorse-06.jpg";
import wildhorse07 from "@/assets/wildhorse-07.jpg";
import wildhorse08 from "@/assets/wildhorse-08.jpg";
import loveCircle01 from "@/assets/love-circle-01.jpg";
import loveCircle02 from "@/assets/love-circle-02.jpg";
import loveCircle03 from "@/assets/love-circle-03.jpg";
import loveCircle04 from "@/assets/love-circle-04.jpg";
import loveCircle05 from "@/assets/love-circle-05.jpg";
import loveCircle06 from "@/assets/love-circle-06.jpg";
import loveCircle07 from "@/assets/love-circle-07.jpg";
import loveCircle08 from "@/assets/love-circle-08.jpg";
import loveCircle09 from "@/assets/love-circle-09.jpg";
import loveCircle10 from "@/assets/love-circle-10.jpg";
import loveCircle11 from "@/assets/love-circle-11.jpg";
import wku01 from "@/assets/wku-01.jpg";
import wku02 from "@/assets/wku-02.jpg";
import wku03 from "@/assets/wku-03.jpg";
import wku04 from "@/assets/wku-04.jpg";
import wku05 from "@/assets/wku-05.jpg";
import wku06 from "@/assets/wku-06.jpg";
import governor01 from "@/assets/governors-mansion-01.jpg";
import governor02 from "@/assets/governors-mansion-02.jpg";
import governor03 from "@/assets/governors-mansion-03.jpg";
import governor04 from "@/assets/governors-mansion-04.jpg";
import governor05 from "@/assets/governors-mansion-05.jpg";
import governor06 from "@/assets/governors-mansion-06.jpg";
import governor07 from "@/assets/governors-mansion-07.jpg";
import governor08 from "@/assets/governors-mansion-08.jpg";
import governor09 from "@/assets/governors-mansion-09.jpg";
import governor10 from "@/assets/governors-mansion-10.jpg";
import belle01 from "@/assets/belle-meade-01.jpg.asset.json";
import belle02 from "@/assets/belle-meade-02.jpg.asset.json";
import belle03 from "@/assets/belle-meade-03.jpg.asset.json";
import belle04 from "@/assets/belle-meade-04.jpg.asset.json";
import belle05 from "@/assets/belle-meade-05.jpg.asset.json";
import belle06 from "@/assets/belle-meade-06.jpg.asset.json";
import belle07 from "@/assets/belle-meade-07.jpg.asset.json";
import belle08 from "@/assets/belle-meade-08.jpg.asset.json";
import joelton01 from "@/assets/joelton-01.jpg";
import joelton02 from "@/assets/joelton-02.jpg";
import joelton03 from "@/assets/joelton-03.jpg";
import joelton04 from "@/assets/joelton-04.jpg";
import joelton05 from "@/assets/joelton-05.jpg";
import joelton06 from "@/assets/joelton-06.jpg";
import joelton07 from "@/assets/joelton-07.jpg";
import joelton08 from "@/assets/joelton-08.jpg";
import howard01 from "@/assets/howard-school-01.jpg.asset.json";
import howard02 from "@/assets/howard-school-02.jpg.asset.json";
import howard03 from "@/assets/howard-school-03.jpg.asset.json";
import howard04 from "@/assets/howard-school-04.jpg.asset.json";
import howard05 from "@/assets/howard-school-05.jpg.asset.json";
import howard06 from "@/assets/howard-school-06.jpg.asset.json";
import howard07 from "@/assets/howard-school-07.jpg.asset.json";
import howard08 from "@/assets/howard-school-08.jpg.asset.json";
import howard09 from "@/assets/howard-school-09.jpg.asset.json";
import howard10 from "@/assets/howard-school-10.jpg.asset.json";

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
    cover: howard09.url,
    media: [
      { type: "image", src: howard03.url, alt: "Howard School entrance with its original sign above the stone columns.", preserveFrame: true },
      { type: "image", src: howard04.url, alt: "Fenced walkway beside Howard School with construction notices and equipment in the distance.", preserveFrame: true },
      { type: "image", src: howard05.url, alt: "Yellow excavator beside the brick school building within the work area.", preserveFrame: true },
      { type: "image", src: howard06.url, alt: "Worker spraying water while an excavator removes a section of Howard School behind fencing.", preserveFrame: true },
      { type: "image", src: howard01.url, alt: "Excavator beside exposed school floors and demolition rubble.", preserveFrame: true },
      { type: "image", src: howard07.url, alt: "Two excavators working among debris beside the remaining brick school structure.", preserveFrame: true },
      { type: "image", src: howard09.url, alt: "Elevated view of the fenced Howard School demolition site and adjacent street.", preserveFrame: true },
      { type: "image", src: howard10.url, alt: "Exposed floors of Howard School with an excavator and rubble in the foreground.", preserveFrame: true },
      { type: "image", src: howard02.url, alt: "Remaining school structure with exposed rooms and the cleared work area.", preserveFrame: true },
      { type: "image", src: howard08.url, alt: "Cleared ground beside the remaining school frame following selective demolition.", preserveFrame: true },
    ],
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
    cover: joelton06,
    media: [
      { type: "image", src: joelton01, alt: "Crane rigging above the Joelton water tank before separation.", preserveFrame: true },
      { type: "image", src: joelton02, alt: "Water tank pedestal and crane positioned alongside the spherical tank.", preserveFrame: true },
      { type: "image", src: joelton03, alt: "Crane lifting the spherical tank section clear of its pedestal.", preserveFrame: true },
      { type: "image", src: joelton04, alt: "Suspended tank section beside the exposed pedestal cap.", preserveFrame: true },
      { type: "image", src: joelton05, alt: "Close view of the weathered tank surface and cutting work at its lower seam.", preserveFrame: true },
      { type: "image", src: joelton06, alt: "Tank section suspended above the pedestal during dismantlement.", preserveFrame: true },
      { type: "image", src: joelton07, alt: "Crane lowering the tank section beside the pedestal and nearby building.", preserveFrame: true },
      { type: "image", src: joelton08, alt: "Tank section lowered by crane above a parked pickup truck.", preserveFrame: true },
    ],
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
    cover: loveCircle11,
    media: [
      { type: "image", src: loveCircle01, alt: "Crane beside the red and white Love Circle radio tower, viewed between leafy trees.", preserveFrame: true },
      { type: "image", src: loveCircle07, alt: "Distant view of the Love Circle tower and crane framed by trees.", preserveFrame: true },
      { type: "image", src: loveCircle06, alt: "Full-height portrait view of the Love Circle tower, crane and suspended work basket.", preserveFrame: true },
      { type: "image", src: loveCircle08, alt: "Crane and Love Circle tower beside a large tree, utility poles and nearby roof.", preserveFrame: true },
      { type: "image", src: loveCircle05, alt: "View upward along the crane boom toward the Love Circle tower and work basket.", preserveFrame: true },
      { type: "image", src: loveCircle02, alt: "Crew working near the top of the Love Circle tower beside a suspended basket.", preserveFrame: true },
      { type: "image", src: loveCircle09, alt: "Worker seated near the top of the red Love Circle tower section.", preserveFrame: true },
      { type: "image", src: loveCircle10, alt: "Workers on the red and white tower framework during Love Circle removal work.", preserveFrame: true },
      { type: "image", src: loveCircle03, alt: "Close view of a worker at the junction of red and white Love Circle tower sections.", preserveFrame: true },
      { type: "image", src: loveCircle04, alt: "Crane lifting an upper red tower section above the remaining white Love Circle tower.", preserveFrame: true },
      { type: "image", src: loveCircle11, alt: "Removed red tower section suspended above the road among trees at Love Circle.", preserveFrame: true },
    ],
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
    cover: wku02,
    media: [
      { type: "image", src: wku02, alt: "Crew members using hand tools from a green aerial lift beside exposed facade framing at WKU's Carol Knicely Building.", preserveFrame: true },
      { type: "image", src: wku01, alt: "Aerial lift and crew above the WKU building courtyard with plastic-covered structure behind them.", preserveFrame: true },
      { type: "image", src: wku03, alt: "Plastic sheeting and timber supports along the upper facade above the WKU conference center entrances.", preserveFrame: true },
      { type: "image", src: wku04, alt: "Wide archival view of the Carol Knicely Building exterior and adjacent parking spaces.", preserveFrame: true },
      { type: "image", src: wku05, alt: "Evening view of covered and exposed facade framing above the Carol Knicely Building entrances.", preserveFrame: true },
      { type: "image", src: wku06, alt: "Exposed overhead framework and protected walkway with red barriers during WKU project work.", preserveFrame: true },
    ],
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
    cover: belle08.url,
    media: [
      { type: "image", src: belle08.url, alt: "Belle Meade Church steeple with exposed framing and a boom lift beside it.", preserveFrame: true },
      { type: "image", src: belle01.url, alt: "Boom lift beside the church steeple and cross under a cloudy sky.", preserveFrame: true },
      { type: "image", src: belle02.url, alt: "Elevated work platform approaching the church steeple beside surrounding trees.", preserveFrame: true },
      { type: "image", src: belle03.url, alt: "Close view of a boom lift platform beside the steeple's upper section.", preserveFrame: true },
      { type: "image", src: belle04.url, alt: "Full-height view of the white church tower and exposed timber framing in the steeple.", preserveFrame: true },
      { type: "image", src: belle05.url, alt: "Exposed steeple framing above the white church tower with a lift alongside.", preserveFrame: true },
      { type: "image", src: belle06.url, alt: "Crew member working from an elevated platform beside exposed steeple framing.", preserveFrame: true },
      { type: "image", src: belle07.url, alt: "Steeple cross and exposed framing during sectional removal work.", preserveFrame: true },
    ],
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
    cover: ryman01,
    media: [
      { type: "image", src: ryman01, alt: "Ryman Auditorium balcony seating and cleared main floor during interior project work.", preserveFrame: true },
      { type: "image", src: ryman05, alt: "Exposed old press box framework above the Ryman Auditorium balcony.", preserveFrame: true },
      { type: "image", src: ryman02, alt: "Crew members in protective suits working behind barrier tape inside Ryman Auditorium.", preserveFrame: true },
      { type: "image", src: ryman03, alt: "Asbestos warning sign and red barrier tape around the Ryman Auditorium work area.", preserveFrame: true },
      { type: "image", src: ryman04, alt: "Containment sheeting and removed framework beneath the Ryman Auditorium balcony.", preserveFrame: true },
    ],
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
    cover: wildhorse04,
    media: [
      { type: "image", src: wildhorse04, alt: "Wildhorse Saloon facade under containment, with street barriers and a yellow Levy container in front.", preserveFrame: true },
      { type: "image", src: wildhorse02, alt: "Wide view of plastic containment covering the Wildhorse Saloon exterior beside neighboring buildings.", preserveFrame: true },
      { type: "image", src: wildhorse03, alt: "Portrait view of exterior containment sheeting, scaffolding and sidewalk barricades at Wildhorse Saloon.", preserveFrame: true },
      { type: "image", src: wildhorse01, alt: "Wildhorse Saloon street frontage and red scaffolding during exterior project work.", preserveFrame: true },
      { type: "image", src: wildhorse05, alt: "Exposed facade framing behind temporary fencing and street barriers at Wildhorse Saloon.", preserveFrame: true },
      { type: "image", src: wildhorse06, alt: "Wildhorse Saloon rooftop surface with hoses and surrounding downtown Nashville buildings.", preserveFrame: true },
      { type: "image", src: wildhorse07, alt: "Interior view looking upward at exposed timber framing and a large dark pipe at Wildhorse Saloon.", preserveFrame: true },
      { type: "image", src: wildhorse08, alt: "Crew members in protective clothing working on the Wildhorse Saloon rooftop with Nashville buildings behind them.", preserveFrame: true },
    ],
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
    cover: governor05,
    media: [
      { type: "image", src: governor05, alt: "Workers on red scaffolding along the brick facade of the Tennessee Governor's Mansion.", preserveFrame: true },
      { type: "image", src: governor04, alt: "Scaffolding and a crew member beside the mansion's arched exterior openings.", preserveFrame: true },
      { type: "image", src: governor01, alt: "Protective plastic sheeting and equipment beside the mansion's curved interior staircase.", preserveFrame: true },
      { type: "image", src: governor02, alt: "Compact demolition equipment working through an excavated opening beneath a supported beam.", preserveFrame: true },
      { type: "image", src: governor03, alt: "Basement excavation with exposed ceiling framing, temporary lighting and compact equipment.", preserveFrame: true },
      { type: "image", src: governor06, alt: "Excavated access opening with crew members and equipment at the mansion.", preserveFrame: true },
      { type: "image", src: governor07, alt: "Stripped basement walls, temporary cables and demolition debris during selective removal.", preserveFrame: true },
      { type: "image", src: governor08, alt: "Exposed basement wall reinforcement and overhead framing during project work.", preserveFrame: true },
      { type: "image", src: governor09, alt: "Temporary flexible ducts beside boarded windows and exterior scaffolding.", preserveFrame: true },
      { type: "image", src: governor10, alt: "Exterior excavation beside the mansion with a compact excavator, worker and boarded windows.", preserveFrame: true },
    ],
  },
];

export const PROJECT_CATEGORIES = ["All", ...Array.from(new Set(PROJECTS.map((p) => p.category)))];

export function getProject(slug: string) {
  return PROJECTS.find((p) => p.slug === slug);
}
