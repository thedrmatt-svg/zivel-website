"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { services } from "@/lib/data/services";
import { getLocationNav } from "@/lib/data/locationNav";

const LOCATIONS_NAV = getLocationNav({ featuredCount: 4 });


const navLinkClass =
  "text-sm font-medium text-white/80 hover:text-white transition-colors";

export default function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileLocationsOpen, setMobileLocationsOpen] = useState(false);

  const serviceLinks = useMemo(
    () =>
      services.map((s) => ({
        label: s.name,
        href: `/services/${s.slug}`,
        description: s.hero.subheadline,
      })),
    []
  );

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/75 backdrop-blur">
      <div className="section">
        <div className="flex h-16 items-center justify-between gap-4">
          <Link href="/" className="flex items-center" aria-label="Zivel Home">
            <Image
              src="/images/brand/zivel-logo.png"
              alt="Zivel"
              width={120}
              height={28}
              priority
              className="h-7 w-auto"
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
                href="/locations"
                className={`${navLinkClass} inline-flex items-center gap-1 ${
                  isActive("/locations") ? "text-white" : ""
                }`}
              >
                Locations
                <span className="text-white/50 text-xs">▾</span>
              </Link>

              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-[420px] rounded-2xl border border-white/10 bg-black/95 p-4 shadow-[0_20px_60px_rgba(0,0,0,0.6)]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">Browse by State</div>
                      <div className="mt-3 space-y-1">
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
                    <div>
                      <div className="text-xs font-semibold text-white/60 uppercase tracking-wider">Featured</div>
                      <div className="mt-3 space-y-1">
                        {LOCATIONS_NAV.featured.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block rounded-xl px-3 py-2 hover:bg-white/5"
                          >
                            <div className="text-sm text-white/90">{c.label}</div>
                            {c.note && <div className="text-xs text-white/55">{c.note}</div>}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3">
                        <Link
                          href="/locations"
                          className="inline-flex rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-xs text-white/80 hover:bg-white/10 hover:text-white"
                        >
                          View all locations →
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/pathways" className={navLinkClass}>
              Pathways
            </Link>
            <Link href="/science" className={navLinkClass}>
              Science
            </Link>
            <Link href="/blog" className={navLinkClass}>
              Blog
            </Link>
            <Link href="/franchise" className={navLinkClass}>
              Franchise
            </Link>

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
            className="md:hidden rounded-xl border border-white/15 bg-white/5 px-3 py-2 text-sm font-semibold text-white hover:bg-white/10"
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
                  <div className="px-3 pt-3 text-xs font-semibold text-white/50 uppercase tracking-wider">Featured</div>
                  {LOCATIONS_NAV.featured.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-xl px-3 py-2 text-sm text-white/80 hover:bg-white/5"
                      onClick={() => setMobileOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href="/pathways"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Pathways
              </Link>
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
              <Link
                href="/franchise"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-white hover:bg-white/5"
                onClick={() => setMobileOpen(false)}
              >
                Franchise
              </Link>

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
