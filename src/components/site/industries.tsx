import { useState } from "react";
import { Award, BadgeCheck, FileCheck2, MapPin, ShieldCheck, Star } from "lucide-react";
import { Reveal } from "./reveal";
import industrialImg from "@/assets/ind-industrial.jpg";
import universityImg from "@/assets/ind-university.jpg";
import commercialImg from "@/assets/ind-commercial.jpg";
import propertyImg from "@/assets/ind-property.jpg";
import gcImg from "@/assets/ind-gc.jpg";
import institutionalImg from "@/assets/ind-institutional.jpg";
import selectiveImg from "@/assets/proj-selective.jpg";
import industrialProjImg from "@/assets/proj-industrial.jpg";
import asbestosImg from "@/assets/svc-asbestos.jpg";
import demolitionImg from "@/assets/svc-demolition.jpg";
import assessmentImg from "@/assets/svc-assessment.jpg";
import nwbocCert from "@/assets/nwboc-certifications.png.asset.json";
import review1 from "@/assets/review-1.jpg";
import review2 from "@/assets/review-2.jpg";
import review3 from "@/assets/review-3.jpg";

const REVIEWS = [
  { image: review1, alt: "Headshot of a facility manager in a hard hat", name: "Facility Manager", company: "Industrial Client" },
  { image: review2, alt: "Headshot of a construction project manager in a safety vest", name: "Project Manager", company: "General Contractor" },
  { image: review3, alt: "Headshot of a general contractor executive", name: "Owner's Representative", company: "Commercial Property" },
];

const INDUSTRIES = [
  { title: "Industrial Facilities", image: industrialImg, alt: "Industrial plant with steel silos and piping" },
  { title: "Universities", image: universityImg, alt: "Historic brick university campus building" },
  { title: "Commercial Properties", image: commercialImg, alt: "Modern commercial office building at dusk" },
  { title: "Property Management", image: propertyImg, alt: "Property manager walking a commercial building under renovation" },
  { title: "General Contractors", image: gcImg, alt: "General contractors reviewing plans at a construction site" },
  { title: "Institutional Facilities", image: institutionalImg, alt: "Institutional healthcare facility exterior" },
];

export function Industries() {
  return (
    <section className="bg-concrete py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-steel">Who We Work With</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Industries We Serve</h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground">
            Levy has been selected by major industrial corporations, universities, and management
            companies across the Nashville area.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((industry, index) => (
            <Reveal key={industry.title} delay={index * 80}>
              <article className="card-lift group relative aspect-[4/3] overflow-hidden">
                <img
                  src={industry.image}
                  alt={industry.alt}
                  loading="lazy"
                  width={1008}
                  height={1008}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-107"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <span className="block h-[3px] w-8 bg-safety transition-all duration-500 group-hover:w-20" />
                  <h3 className="mt-3 font-display text-2xl text-white">{industry.title}</h3>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

type Project = {
  title: string;
  category: string;
  service: string;
  location: string;
  copy: string;
  image: string;
  alt: string;
};

const PROJECTS: Project[] = [
  {
    title: "Sample Project A",
    category: "Asbestos Abatement",
    service: "Asbestos Removal",
    location: "Nashville, TN",
    copy: "Containment and abatement within an occupied commercial facility.",
    image: asbestosImg,
    alt: "Workers sealing containment barriers inside a commercial building",
  },
  {
    title: "Sample Project B",
    category: "Demolition",
    service: "Structural Demolition",
    location: "Middle Tennessee",
    copy: "Structural demolition of a concrete commercial building.",
    image: demolitionImg,
    alt: "Excavator demolishing a concrete commercial structure",
  },
  {
    title: "Sample Project C",
    category: "Selective Demolition",
    service: "Interior Demolition",
    location: "Nashville, TN",
    copy: "Interior strip-out ahead of a tenant renovation.",
    image: selectiveImg,
    alt: "Interior selective demolition of a commercial office floor",
  },
  {
    title: "Sample Project D",
    category: "Industrial",
    service: "Industrial Demolition",
    location: "Middle Tennessee",
    copy: "Debris handling and haul-off at an industrial site.",
    image: industrialProjImg,
    alt: "Excavator loading concrete debris into a dump truck",
  },
  {
    title: "Sample Project F",
    category: "Site Assessment",
    service: "Pre-Demolition Survey",
    location: "Nashville, TN",
    copy: "Engineering survey, utility location, and safety risk review.",
    image: assessmentImg,
    alt: "Supervisor reviewing plans on a tablet in an industrial plant",
  },
];

const CATEGORIES = [
  "All",
  "Asbestos Abatement",
  "Demolition",
  "Selective Demolition",
  "Industrial",
  "Commercial",
  "Site Assessment",
];

export function Projects() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="scroll-mt-28 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-steel">Portfolio</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Project Types</h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground">
            Representative placeholder projects for this mockup — to be replaced with verified Levy
            project data.
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-10 flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActive(category)}
                className={`border px-4 py-2 text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                  active === category
                    ? "border-ink bg-ink text-white"
                    : "border-border text-steel hover:border-ink hover:text-ink"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project, index) => (
            <Reveal key={project.title} delay={index * 70}>
              <article className="card-lift group h-full overflow-hidden border border-border bg-white">
                <div className="relative aspect-[16/11] overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.alt}
                    loading="lazy"
                    width={1200}
                    height={912}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-107"
                  />
                  <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/35" />
                  <span className="absolute top-4 left-4 bg-safety px-2.5 py-1 text-[11px] font-bold tracking-[0.1em] text-accent-foreground uppercase">
                    {project.category}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-display text-xl text-ink">{project.title}</h3>
                  <p className="mt-1 flex items-center gap-1.5 text-[12px] font-semibold tracking-[0.08em] text-steel uppercase">
                    <MapPin className="h-3.5 w-3.5" aria-hidden />
                    {project.location} — {project.service}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.copy}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const B2B_POINTS = [
  "Early site planning",
  "Environmental considerations",
  "Demolition planning",
  "Safety planning",
  "Specialized equipment",
  "Experienced crews",
  "Project coordination",
  "Compliance-focused execution",
];

export function B2BSection() {
  return (
    <section className="bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-[1fr_1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-safety">For Commercial Clients</p>
          <h2 className="mt-3 max-w-xl font-display text-4xl leading-[1.02] text-white md:text-5xl">
            A Contractor You Can Bring Into The Project Early.
          </h2>
          <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/60">
            The earlier we&apos;re involved, the more we can do to keep the schedule, the budget,
            and the site under control.
          </p>
          <a href="#quote" className="btn-base btn-safety mt-8">
            Discuss Your Project
          </a>
        </Reveal>

        <div className="grid gap-px bg-white/10 sm:grid-cols-2">
          {B2B_POINTS.map((point, index) => (
            <Reveal key={point} delay={index * 60}>
              <div className="flex h-full items-center gap-3 bg-ink px-5 py-5">
                <BadgeCheck className="h-4.5 w-4.5 shrink-0 text-safety" aria-hidden />
                <span className="text-[13px] font-semibold tracking-[0.06em] text-white/85 uppercase">
                  {point}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const CREDENTIALS = [
  { icon: Award, label: "Certifications" },
  { icon: FileCheck2, label: "Licensing" },
  { icon: ShieldCheck, label: "Safety Credentials" },
  { icon: BadgeCheck, label: "Insurance" },
];

export function Credentials() {
  return (
    <section className="border-y border-border bg-background py-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-steel">Credentials</p>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            NWBOC-certified as a Women's Business Enterprise (WBE) and Women-Owned Small Business
            (WOSB).
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-col items-center gap-8 border border-border bg-ink px-6 py-8 sm:flex-row sm:justify-center sm:gap-12">
            <img
              src={nwbocCert.url}
              alt="NWBOC WBE Certified and WOSB Certified certification marks"
              className="h-48 w-auto"
              loading="lazy"
            />
            <div className="max-w-sm text-center sm:text-left">
              <p className="font-display text-2xl text-white">NWBOC Certified</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                National Women Business Owners Corporation certification — WBE and WOSB — supporting
                supplier diversity requirements on commercial and industrial projects.
              </p>
            </div>
          </div>
        </Reveal>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CREDENTIALS.map((credential, index) => (
            <Reveal key={credential.label} delay={index * 80}>
              <div className="flex h-full items-center gap-4 border border-dashed border-input bg-concrete/60 px-6 py-7">
                <credential.icon className="h-6 w-6 text-steel" aria-hidden />
                <span className="text-[13px] font-bold tracking-[0.1em] text-ink uppercase">
                  {credential.label}
                </span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  return (
    <section className="bg-concrete py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-steel">Social Proof</p>
          <h2 className="mt-3 max-w-3xl font-display text-4xl leading-[1.02] text-ink md:text-5xl">
            Trusted By The Organizations That Depend On Us.
          </h2>
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((review, index) => (
            <Reveal key={review.name} delay={index * 100}>
              <figure className="h-full border border-dashed border-input bg-white p-8">
                <div className="flex items-center gap-1 text-steel" aria-label="Rating placeholder">
                  {[0, 1, 2, 3, 4].map((star) => (
                    <Star key={star} className="h-4 w-4" aria-hidden />
                  ))}
                </div>
                <blockquote className="mt-5 text-[15px] leading-relaxed text-muted-foreground">
                  Verified client review placeholder. Google review content will be displayed here
                  once confirmed.
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-4 border-t border-border pt-4">
                  <img
                    src={review.image}
                    alt={review.alt}
                    loading="lazy"
                    width={512}
                    height={512}
                    className="h-12 w-12 shrink-0 rounded-full object-cover object-top grayscale"
                  />
                  <span className="text-[12px] font-semibold tracking-[0.1em] text-ink uppercase">
                    {review.name}
                    <span className="block text-[11px] font-normal tracking-[0.08em] text-muted-foreground">
                      {review.company}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ServiceArea() {
  return (
    <section id="service-area" className="scroll-mt-28 bg-background py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <p className="eyebrow text-steel">Where We Work</p>
          <h2 className="mt-3 font-display text-4xl leading-[1.02] text-ink md:text-5xl">
            Serving Nashville &amp; Middle Tennessee
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Levy Industrial Contractors is based in Nashville, Tennessee and has worked in the
            Nashville area since 1987.
          </p>
          <div className="mt-8 flex items-start gap-3 border-l-2 border-safety pl-5">
            <MapPin className="mt-0.5 h-5 w-5 text-safety" aria-hidden />
            <div>
              <p className="font-display text-xl text-ink">Nashville, Tennessee</p>
              <p className="text-sm text-muted-foreground">Primary service location</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden border border-border">
            <iframe
              title="Levy Industrial Contractors service area — Nashville, Tennessee"
              src="https://www.google.com/maps?q=Nashville,+Tennessee&z=10&output=embed"
              loading="lazy"
              className="h-[420px] w-full grayscale-[0.85] contrast-110"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
