import { useEffect, useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import levyLogo from "@/assets/levy-logo.png.asset.json";

const NAV = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Safety", href: "/safety" },
  { label: "Projects", href: "/projects" },
  { label: "Service Area", href: "/service-area" },
  { label: "Contact", href: "/contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50">
      {/* Trust bar */}
      <div className="hidden bg-safety text-[11.5px] font-bold italic tracking-[0.16em] text-white md:block">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-8 py-2.5 uppercase">
          <span>Commercial &amp; Industrial Environmental Construction</span>
          <span>Serving Nashville Since 1987</span>
          <span>
            Safety <span className="text-white/80">•</span> Quality{" "}
            <span className="text-white/80">•</span> Compliance
          </span>
        </div>
      </div>

      <nav
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-ink/95 backdrop-blur-md"
            : "border-transparent bg-ink/70 backdrop-blur-sm"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-6 px-5 py-3 md:px-8">
          <a href="/" className="flex items-center gap-3">
            <img
              src={levyLogo.url}
              alt="Levy Industrial Contractors, Inc. logo"
              className="h-10 w-auto bg-white px-2 py-1 md:h-12"
            />
          </a>

          <ul className="hidden items-center gap-7 xl:flex">
            {NAV.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="relative py-2 text-[13px] font-semibold tracking-[0.08em] text-white/75 uppercase transition-colors hover:text-white after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-right after:scale-x-0 after:bg-safety after:transition-transform after:duration-300 hover:after:origin-left hover:after:scale-x-100"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden items-center gap-5 lg:flex">
            <a
              href="tel:6152271645"
              className="flex items-center gap-2 text-sm font-bold tracking-wide text-white transition-colors hover:text-safety"
            >
              <Phone className="h-4 w-4 text-safety" aria-hidden />
              615.227.1645
            </a>
            <a href="/contact#quote-contact" className="btn-base btn-safety">
              Request a Free Quote
            </a>
          </div>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center border border-white/20 text-white xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {open && (
          <div className="anim-slide-up border-t border-white/10 bg-ink px-5 pb-6 xl:hidden">
            <ul className="grid gap-1 py-3">
              {NAV.map((item) => (
                <li key={item.label}>
                  <a
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="block border-b border-white/5 py-3 text-sm font-semibold tracking-[0.08em] text-white/80 uppercase"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="grid grid-cols-2 gap-3">
              <a href="tel:6152271645" className="btn-base btn-outline-light">
                Call Now
              </a>
              <a href="/contact#quote-contact" className="btn-base btn-safety" onClick={() => setOpen(false)}>
                Request Quote
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}

export function MobileStickyBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-2 border-t border-white/10 bg-ink lg:hidden">
      <a
        href="tel:6152271645"
        className="flex items-center justify-center gap-2 py-3.5 text-[13px] font-bold tracking-[0.08em] text-white uppercase"
      >
        <Phone className="h-4 w-4 text-safety" aria-hidden />
        Call 615.227.1645
      </a>
      <a
        href="/contact#quote-contact"
        className="flex items-center justify-center bg-safety py-3.5 text-[13px] font-bold tracking-[0.08em] text-accent-foreground uppercase"
      >
        Request Quote
      </a>
    </div>
  );
}
