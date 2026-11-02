import { Mail, MapPin, Phone } from "lucide-react";
import { Reveal } from "./reveal";
import { LeadForm } from "./hero";
import levyLogo from "@/assets/levy-logo.png.asset.json";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-28 bg-ink py-24 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-14 px-5 md:px-8 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <Reveal>
            <p className="eyebrow text-safety">Start A Project</p>
            <h2 className="mt-3 max-w-xl font-display text-4xl leading-[1.02] text-white md:text-6xl">
              Have A Project Coming Up?
            </h2>
            <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-white/65">
              Tell us what you&apos;re working on. Our team can help determine the right approach
              for your demolition, asbestos abatement, or environmental construction needs.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#quote-contact" className="btn-base btn-safety">
                Request A Free Quote
              </a>
              <a href="tel:6152271645" className="btn-base btn-outline-light">
                <Phone className="h-4 w-4" aria-hidden />
                Call 615.227.1645
              </a>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-12 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2">
              <div className="bg-ink p-6">
                <dt className="eyebrow text-white/40">Company</dt>
                <dd className="mt-2 font-display text-xl text-white">
                  Levy Industrial Contractors, Inc.
                </dd>
              </div>
              <div className="bg-ink p-6">
                <dt className="eyebrow text-white/40">Phone</dt>
                <dd className="mt-2">
                  <a
                    href="tel:6152271645"
                    className="font-display text-xl text-safety hover:underline"
                  >
                    615.227.1645
                  </a>
                </dd>
              </div>
              <div className="bg-ink p-6">
                <dt className="eyebrow text-white/40">Mailing Address</dt>
                <dd className="mt-2 flex items-start gap-2 text-[15px] text-white/75">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-safety" aria-hidden />
                  <span>
                    P.O. Box 70039
                    <br />
                    Nashville, TN
                  </span>
                </dd>
              </div>
              <div className="bg-ink p-6">
                <dt className="eyebrow text-white/40">Contact</dt>
                <dd className="mt-2 flex items-start gap-2 text-[15px] text-white/75">
                  <Mail className="mt-1 h-4 w-4 shrink-0 text-safety" aria-hidden />
                  <span>Use the project form or call our office.</span>
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>

        <Reveal delay={100}>
          <LeadForm id="quote-contact" />
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-ink pt-16 pb-24 lg:pb-16">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <img
              src={levyLogo.url}
              alt="Levy Industrial Contractors, Inc. logo"
              className="h-14 w-auto bg-white px-3 py-2"
            />
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
              Commercial and industrial environmental construction in the Nashville area since 1987.
            </p>
          </div>

          <div>
            <p className="eyebrow text-white/40">Services</p>
            <ul className="mt-4 grid gap-2.5 text-sm text-white/65">
              {[["Asbestos Removal", "asbestos-removal"], ["Demolition", "demolition"], ["Site Assessment", "site-assessment"]].map(
                ([item, slug]) => (
                  <li key={item}>
                    <a href={`/services/${slug}`} className="transition-colors hover:text-safety">
                      {item}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/40">Company</p>
            <ul className="mt-4 grid gap-2.5 text-sm text-white/65">
              {[
                { label: "About", href: "#about" },
                { label: "Safety", href: "#safety" },
                { label: "Projects", href: "#projects" },
                { label: "Contact", href: "#contact" },
                { label: "Request Quote", href: "#quote" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="transition-colors hover:text-safety">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="eyebrow text-white/40">Contact</p>
            <ul className="mt-4 grid gap-2.5 text-sm text-white/65">
              <li>
                <a href="tel:6152271645" className="font-semibold text-white hover:text-safety">
                  615.227.1645
                </a>
              </li>
              <li>P.O. Box 70039</li>
              <li>Nashville, TN</li>
            </ul>
            <a href="/contact#quote-contact" className="btn-base btn-safety mt-6 w-full">
              Request Quote
            </a>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Levy Industrial Contractors, Inc. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="/#top" className="hover:text-safety">
              Privacy Policy
            </a>
            <a href="/#top" className="hover:text-safety">
              Terms &amp; Conditions
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
