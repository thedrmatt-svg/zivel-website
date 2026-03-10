"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { services } from "@/lib/data/services";
import { pathways } from "@/lib/data/pathways";
import { getLocationNav } from "@/lib/data/locationNav";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";

const LOCATIONS_NAV = getLocationNav({ featuredCount: 4 });

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const [mobilePathwaysOpen, setMobilePathwaysOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const serviceLinks = useMemo(
    () =>
      services.map((s) => ({
        label: s.name,
        href: `/services/${s.slug}`,
        description: s.hero.subheadline,
      })),
    []
  );

  const pathwayLinks = useMemo(
    () =>
      pathways.map((p) => ({
        label: p.name,
        href: `/pathways/${p.slug}`,
        description: p.seo.description,
      })),
    []
  );

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  const navLinkClass =
    "text-[13px] font-medium tracking-wide uppercase text-white/70 hover:text-[var(--zivel-gold)] transition-colors duration-300";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-xl border-b border-white/[0.06] py-0"
          : "bg-transparent py-2"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex h-16 md:h-20 items-center justify-between gap-4">
          <Link href="/" className="flex items-center" aria-label="Zivel Home">
            <Image
              src="/images/brand/zivel-logo.png"
              alt="Zivel"
              width={120}
              height={28}
              priority
              fetchPriority="high"
              style={{ width: "auto", height: "auto" }}
              className="h-7 md:h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 lg:flex">
            <div className="relative group">
              <Link
                href="/services"
                className={`${navLinkClass} ${isActive("/services") ? "text-[var(--zivel-gold)]" : ""}`}
              >
                Services
              </Link>

              <div className="invisible absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="w-[360px] rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  <Link
                    href="/services"
                    className="block rounded-lg px-3 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                  >
                    View All Services →
                  </Link>
                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="max-h-[360px] overflow-auto pr-1">
                    {serviceLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="mt-1 text-xs text-white/50">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/pathways"
                className={`${navLinkClass} ${isActive("/pathways") ? "text-[var(--zivel-gold)]" : ""}`}
              >
                Pathways
              </Link>

              <div className="invisible absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="w-[420px] rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  <Link
                    href="/pathways"
                    className="block rounded-lg px-3 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                  >
                    View All Pathways →
                  </Link>
                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="max-h-[400px] overflow-auto pr-1">
                    {pathwayLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-lg px-3 py-3 hover:bg-white/5 transition-colors"
                      >
                        <div className="text-sm font-semibold text-white">{item.label}</div>
                        <div className="mt-1 text-xs text-white/50 line-clamp-2">{item.description}</div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/locations"
                className={`${navLinkClass} inline-flex items-center gap-1 ${isActive("/locations") ? "text-[var(--zivel-gold)]" : ""}`}
              >
                Locations
                <span className="text-white/40 text-xs">▾</span>
              </Link>

              <div className="invisible absolute left-1/2 -translate-x-1/2 top-full pt-4 opacity-0 transition-all duration-300 group-hover:visible group-hover:opacity-100">
                <div className="w-[260px] rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl p-3 shadow-[0_20px_60px_rgba(0,0,0,0.8)]">
                  <Link
                    href="/locations"
                    className="block rounded-lg px-3 py-3 text-sm font-semibold text-white hover:bg-white/5 transition-colors"
                  >
                    View All Locations →
                  </Link>
                  <div className="my-2 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <div className="text-xs font-semibold text-white/40 uppercase tracking-wider px-3 pb-1">Browse by State</div>
                  <div className="space-y-1">
                    {LOCATIONS_NAV.states.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block rounded-lg px-3 py-2 text-sm text-white/70 hover:bg-white/5 hover:text-white transition-colors"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/science" className={`${navLinkClass} ${isActive("/science") ? "text-[var(--zivel-gold)]" : ""}`}>
              Science
            </Link>
            <Link href="/blog" className={`${navLinkClass} ${isActive("/blog") ? "text-[var(--zivel-gold)]" : ""}`}>
              Blog
            </Link>
            <a href="https://www.zivelfranchise.com" target="_blank" rel="noopener noreferrer" className={navLinkClass}>
              Franchise
            </a>

            <div className="flex items-center gap-3 ml-2">
              <Link
                href="/locations"
                className="rounded-none border border-white/20 bg-transparent px-4 py-2.5 text-xs font-medium tracking-wider uppercase text-white hover:border-[var(--zivel-gold)] hover:text-[var(--zivel-gold)] transition-all duration-300"
              >
                Find a Location
              </Link>
              <Link
                href="/#book"
                className="rounded-none bg-[var(--zivel-gold)] px-4 py-2.5 text-xs font-medium tracking-wider uppercase text-black hover:bg-[var(--zivel-gold-light)] transition-all duration-300"
              >
                Book Now
              </Link>
            </div>
          </nav>

          <div className="flex items-center gap-2 lg:hidden">
            <button
              className="border border-white/20 bg-transparent px-3 py-2 text-xs font-medium tracking-wider uppercase text-white hover:border-[var(--zivel-gold)] transition-all duration-300"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>

        {mobileOpen ? (
          <div className="lg:hidden pb-6 pt-2">
            <div className="space-y-1 rounded-xl border border-white/10 bg-black/95 backdrop-blur-xl p-4">
              <button
                className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium tracking-wide uppercase text-white hover:text-[var(--zivel-gold)] transition-colors"
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-label="Toggle services"
              >
                <span>Services</span>
                <span className="text-white/40">{mobileServicesOpen ? "−" : "+"}</span>
              </button>

              {mobileServicesOpen ? (
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    href="/services"
                    className="block px-3 py-2 text-sm text-white/70 hover:text-[var(--zivel-gold)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Services →
                  </Link>
                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium tracking-wide uppercase text-white hover:text-[var(--zivel-gold)] transition-colors"
                onClick={() => setMobilePathwaysOpen((v) => !v)}
                aria-label="Toggle pathways"
              >
                <span>Pathways</span>
                <span className="text-white/40">{mobilePathwaysOpen ? "−" : "+"}</span>
              </button>

              {mobilePathwaysOpen ? (
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    href="/pathways"
                    className="block px-3 py-2 text-sm text-white/70 hover:text-[var(--zivel-gold)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Pathways →
                  </Link>
                  {pathwayLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                className="flex w-full items-center justify-between px-3 py-3 text-sm font-medium tracking-wide uppercase text-white hover:text-[var(--zivel-gold)] transition-colors"
                onClick={() => setMobileLocationsOpen((v) => !v)}
                aria-label="Toggle locations"
              >
                <span>Locations</span>
                <span className="text-white/40">{mobileLocationsOpen ? "−" : "+"}</span>
              </button>

              {mobileLocationsOpen && (
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    href="/locations"
                    className="block px-3 py-2 text-sm text-white/70 hover:text-[var(--zivel-gold)] transition-colors"
                    onClick={() => setMobileOpen(false)}
                  >
                    Browse All Locations →
                  </Link>
                  <div className="px-3 pt-2 text-xs font-medium text-white/30 uppercase tracking-wider">States</div>
                  {LOCATIONS_NAV.states.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block px-3 py-2 text-sm text-white/60 hover:text-white transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}

              <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent my-2" />

              <Link
                href="/science"
                className="block px-3 py-3 text-sm font-medium tracking-wide uppercase text-white hover:text-[var(--zivel-gold)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Science
              </Link>
              <Link
                href="/blog"
                className="block px-3 py-3 text-sm font-medium tracking-wide uppercase text-white hover:text-[var(--zivel-gold)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
              <a
                href="https://www.zivelfranchise.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block px-3 py-3 text-sm font-medium tracking-wide uppercase text-white hover:text-[var(--zivel-gold)] transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                Franchise
              </a>

              <div className="grid gap-2 pt-3">
                <Link
                  href="/locations"
                  className="border border-white/20 bg-transparent px-4 py-3 text-xs font-medium tracking-wider uppercase text-white text-center hover:border-[var(--zivel-gold)] transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  Find a Location
                </Link>
                <Link
                  href="/#book"
                  className="bg-[var(--zivel-gold)] px-4 py-3 text-xs font-medium tracking-wider uppercase text-black text-center hover:bg-[var(--zivel-gold-light)] transition-all duration-300"
                  onClick={() => setMobileOpen(false)}
                >
                  Book Now
                </Link>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
