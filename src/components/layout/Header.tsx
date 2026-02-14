"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { services } from "@/lib/data/services";
import { pathways } from "@/lib/data/pathways";
import { getLocationNav } from "@/lib/data/locationNav";

const LOCATIONS_NAV = getLocationNav({ featuredCount: 4 });

const navLinkClass =
  "text-sm font-medium text-white/80 hover:text-white transition-colors";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);
  const [mobilePathwaysOpen, setMobilePathwaysOpen] = useState(false);

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

  return (
    <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/80 backdrop-blur-xl backdrop-saturate-150">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex h-12 md:h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center" aria-label="Zivel Home">
            <Image
              src="/images/brand/zivel-logo.png"
              alt="Zivel"
              width={120}
              height={28}
              priority
              className="h-7 md:h-9 w-auto"
            />
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            <div className="relative group">
              <Link
                href="/services"
                className={`${navLinkClass} ${
                  isActive("/services") ? "text-white" : ""
                }`}
              >
                Services
              </Link>

              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-[360px] rounded-2xl border border-white/10 bg-black/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <Link
                    href="/services"
                    className="block rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                  >
                    View All Services →
                  </Link>

                  <div className="my-2 h-px bg-white/10" />

                  <div className="max-h-[360px] overflow-auto pr-1">
                    {serviceLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-3 hover:bg-white/5"
                      >
                        <div className="text-sm font-semibold text-white">
                          {item.label}
                        </div>
                        <div className="mt-1 text-xs text-white/65">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/pathways"
                className={`${navLinkClass} ${
                  isActive("/pathways") ? "text-white" : ""
                }`}
              >
                Pathways
              </Link>

              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-[420px] rounded-2xl border border-white/10 bg-black/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <Link
                    href="/pathways"
                    className="block rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                  >
                    View All Pathways →
                  </Link>

                  <div className="my-2 h-px bg-white/10" />

                  <div className="max-h-[400px] overflow-auto pr-1">
                    {pathwayLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-3 hover:bg-white/5"
                      >
                        <div className="text-sm font-semibold text-white">
                          {item.label}
                        </div>
                        <div className="mt-1 text-xs text-white/65 line-clamp-2">
                          {item.description}
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <Link
                href="/locations"
                className={`${navLinkClass} inline-flex items-center gap-1 ${
                  isActive("/locations") ? "text-white" : ""
                }`}
              >
                Locations
                <span className="text-white/50 text-xs">▾</span>
              </Link>

              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-[260px] rounded-2xl border border-white/10 bg-black/95 p-3 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <Link
                    href="/locations"
                    className="block rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                  >
                    View All Locations →
                  </Link>

                  <div className="my-2 h-px bg-white/10" />

                  <div className="text-xs font-semibold text-white/60 uppercase tracking-wider px-3 pb-1">Browse by State</div>
                  <div className="space-y-1">
                    {LOCATIONS_NAV.states.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white"
                      >
                        {s.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <Link href="/science" className={navLinkClass}>
              Science
            </Link>
            <Link href="/blog" className={navLinkClass}>
              Blog
            </Link>
            <a href="https://www.zivelfranchise.com" target="_blank" rel="noopener noreferrer" className={navLinkClass}>
              Franchise
            </a>

            <div className="flex items-center gap-3">
              <Link
                href="/locations"
                className="rounded-2xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold text-white hover:border-white/25 hover:bg-white/10"
              >
                Find a Location
              </Link>
              <Link
                href="/#book"
                className="rounded-2xl bg-[var(--zivel-gold)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
              >
                Book Now
              </Link>
            </div>
          </nav>

          <button
            className="md:hidden rounded-lg border border-white/15 bg-white/5 px-2.5 py-1.5 text-xs font-semibold text-white hover:bg-white/10"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen ? (
          <div className="md:hidden pb-6 pt-2">
            <div className="space-y-2 rounded-2xl border border-white/10 bg-black/80 p-3">
              <button
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-label="Toggle services"
              >
                <span>Services</span>
                <span className="text-white/60">
                  {mobileServicesOpen ? "—" : "+"}
                </span>
              </button>

              {mobileServicesOpen ? (
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    href="/services"
                    className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Services →
                  </Link>

                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                onClick={() => setMobilePathwaysOpen((v) => !v)}
                aria-label="Toggle pathways"
              >
                <span>Pathways</span>
                <span className="text-white/60">
                  {mobilePathwaysOpen ? "—" : "+"}
                </span>
              </button>

              {mobilePathwaysOpen ? (
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    href="/pathways"
                    className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Pathways →
                  </Link>

                  {pathwayLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                onClick={() => setMobileLocationsOpen((v) => !v)}
                aria-label="Toggle locations"
              >
                <span>Locations</span>
                <span className="text-white/60">
                  {mobileLocationsOpen ? "—" : "+"}
                </span>
              </button>

              {mobileLocationsOpen && (
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    href="/locations"
                    className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                    onClick={() => setMobileOpen(false)}
                  >
                    Browse All Locations →
                  </Link>
                  <div className="px-3 pt-2 text-xs font-semibold text-white/50 uppercase tracking-wider">States</div>
                  {LOCATIONS_NAV.states.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                </div>
              )}

              <Link
                href="/science"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Science
              </Link>
              <Link
                href="/blog"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
              <a
                href="https://www.zivelfranchise.com"
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Franchise
              </a>

              <div className="grid gap-2 pt-2">
                <Link
                  href="/locations"
                  className="rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-semibold text-white hover:border-white/25 hover:bg-white/10 text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Find a Location
                </Link>
                <Link
                  href="/#book"
                  className="rounded-2xl bg-[var(--zivel-gold)] px-4 py-3 text-sm font-semibold text-black hover:opacity-90 text-center"
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
