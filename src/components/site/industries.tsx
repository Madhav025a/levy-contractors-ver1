import { useState } from "react";
import { Award, BadgeCheck, FileCheck2, MapPin, ShieldCheck, Star } from "lucide-react";
import { Reveal } from "./reveal";
import { ProjectCard } from "./project-card";
import { PROJECTS, PROJECT_CATEGORIES } from "@/lib/projects-data";
import industrialImg from "@/assets/ind-industrial.jpg";
import universityImg from "@/assets/ind-university.jpg";
import commercialImg from "@/assets/ind-commercial.jpg";
import propertyImg from "@/assets/ind-property.jpg";
import gcImg from "@/assets/ind-gc.jpg";
import institutionalImg from "@/assets/ind-institutional.jpg";
import certWbe from "@/assets/nwboc-wbe-certified-v2.png.asset.json";
import certWosb from "@/assets/nwboc-wosb-certified-v2.png.asset.json";
import certTn from "@/assets/tn-diversity-business-enterprise.png.asset.json";
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
            companies across Tennessee, Alabama, Kentucky, and Georgia.
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

export function Projects() {
  const [active, setActive] = useState("All");
  const visible = active === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === active);

  return (
    <section id="projects" className="scroll-mt-28 bg-background py-24 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="eyebrow text-steel">Portfolio</p>
          <h2 className="mt-3 font-display text-4xl text-ink md:text-5xl">Featured Projects</h2>
          <p className="mt-4 max-w-2xl text-[15px] text-muted-foreground">
            Landmark, industrial, and institutional work across Middle Tennessee and beyond.
          </p>
        </Reveal>
        <div className="mt-10 flex flex-wrap gap-2">
          {PROJECT_CATEGORIES.map((category) => (
            <button key={category} type="button" onClick={() => setActive(category)}
              className={`border px-4 py-2 text-[12px] font-bold tracking-[0.1em] uppercase transition-colors ${
                active === category ? "border-ink bg-ink text-white" : "border-border text-steel hover:border-ink hover:text-ink"
              }`}>
              {category}
            </button>
          ))}
        </div>
        <div className="mt-10 grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((project) => <ProjectCard key={project.slug} project={project} />)}
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
          <a href="#quote-contact" className="btn-base btn-safety mt-8">
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
            (WOSB), and certified by the Tennessee Governor's Office of Diversity Business Enterprise.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-8 flex flex-col items-center gap-8 border border-border bg-ink px-6 py-8 sm:flex-row sm:justify-center sm:gap-12">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {[certWbe, certWosb, certTn].map((cert, i) => (
                <img
                  key={i}
                  src={cert.url}
                  alt={["NWBOC Women's Business Enterprise (WBE) Certified logo", "NWBOC Women-Owned Small Business (WOSB) Certified logo", "Tennessee Governor's Office of Diversity Business Enterprise certified seal"][i]}
                  className={i === 2 ? "h-28 w-auto md:h-36" : "h-28 w-auto rounded-sm bg-white px-4 py-3 md:h-36"}
                  loading="lazy"
                />
              ))}
            </div>
            <div className="max-w-md text-center sm:text-left">
              <p className="font-display text-2xl text-white">What Our Certifications Mean For Your Project</p>
              <p className="mt-2 text-sm leading-relaxed text-white/60">
                Levy is certified by the National Women Business Owners Corporation as a
                Women&apos;s Business Enterprise (WBE) and Women-Owned Small Business (WOSB), and by the State of Tennessee Governor&apos;s Office
                of Diversity Business Enterprise. For
                commercial and institutional clients, hiring Levy counts toward supplier diversity
                and small-business participation goals on public and private contracts, including Tennessee state work — while
                delivering the same experienced crews, safety record, and regulatory compliance
                we&apos;ve brought to every project since 1979.
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
                    className="h-12 w-12 shrink-0 rounded-full object-cover object-top"
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
            Serving Tennessee, Alabama, Kentucky &amp; Georgia
          </h2>
          <p className="mt-5 max-w-md text-[15px] leading-relaxed text-muted-foreground">
            Levy Contractors is based in Nashville, Tennessee and serves commercial and
            industrial clients across Tennessee, Alabama, Kentucky, and Georgia.
          </p>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {["Tennessee", "Alabama", "Kentucky", "Georgia"].map((state) => (
              <div key={state} className="flex items-start gap-3 border-l-2 border-safety pl-5">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-safety" aria-hidden />
                <div>
                  <p className="font-display text-xl text-ink">{state}</p>
                  <p className="text-sm text-muted-foreground">
                    {state === "Tennessee" ? "Home base — Nashville" : "Service area"}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={120}>
          <div className="overflow-hidden border border-border">
            <iframe
              title="Levy Contractors service area — Tennessee, Alabama, Kentucky, Georgia"
              src="https://www.google.com/maps?q=Nashville,+Tennessee&z=6&output=embed"
              loading="lazy"
              className="h-[420px] w-full grayscale-[0.85] contrast-110"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
