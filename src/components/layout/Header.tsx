"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";
import { services } from "@/lib/data/services";
import { getLocationNav } from "@/lib/data/locationNav";
import { useTheme } from "@/components/ThemeProvider";

const LOCATIONS_NAV = getLocationNav({ featuredCount: 4 });

export default function Header() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
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

  const navLinkClass =
    "text-sm font-medium text-[var(--zivel-nav-text)] hover:text-[var(--zivel-nav-text-hover)] transition-colors";

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--zivel-border)] bg-[var(--zivel-header-bg)] backdrop-blur">
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
                  isActive("/services") ? "!text-[var(--zivel-nav-text-hover)]" : ""
                }`}
              >
                Services
              </Link>

              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-[360px] rounded-2xl border border-[var(--zivel-border)] bg-[var(--zivel-dropdown-bg)] p-3 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                  <Link
                    href="/services"
                    className="block rounded-xl px-3 py-3 text-sm font-semibold text-[var(--zivel-text-primary)] hover:bg-[var(--zivel-dropdown-hover)]"
                  >
                    View All Services →
                  </Link>

                  <div className="my-2 h-px bg-[var(--zivel-border)]" />

                  <div className="max-h-[360px] overflow-auto pr-1">
                    {serviceLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block rounded-xl px-3 py-3 hover:bg-[var(--zivel-dropdown-hover)]"
                      >
                        <div className="text-sm font-semibold text-[var(--zivel-text-primary)]">
                          {item.label}
                        </div>
                        <div className="mt-1 text-xs text-[var(--zivel-dropdown-sub)]">
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
                  isActive("/locations") ? "!text-[var(--zivel-nav-text-hover)]" : ""
                }`}
              >
                Locations
                <span className="text-[var(--zivel-text-muted)] text-xs">▾</span>
              </Link>

              <div className="invisible absolute left-0 top-full pt-3 opacity-0 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                <div className="w-[420px] rounded-2xl border border-[var(--zivel-border)] bg-[var(--zivel-dropdown-bg)] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.3)]">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <div className="text-xs font-semibold text-[var(--zivel-text-muted)] uppercase tracking-wider">Browse by State</div>
                      <div className="mt-3 space-y-1">
                        {LOCATIONS_NAV.states.map((s) => (
                          <Link
                            key={s.href}
                            href={s.href}
                            className="block rounded-xl px-3 py-2 text-sm text-[var(--zivel-dropdown-text)] hover:bg-[var(--zivel-dropdown-hover)] hover:text-[var(--zivel-nav-text-hover)]"
                          >
                            {s.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-semibold text-[var(--zivel-text-muted)] uppercase tracking-wider">Featured</div>
                      <div className="mt-3 space-y-1">
                        {LOCATIONS_NAV.featured.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            className="block rounded-xl px-3 py-2 hover:bg-[var(--zivel-dropdown-hover)]"
                          >
                            <div className="text-sm text-[var(--zivel-dropdown-text)]">{c.label}</div>
                            {c.note && <div className="text-xs text-[var(--zivel-dropdown-sub)]">{c.note}</div>}
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3">
                        <Link
                          href="/locations"
                          className="inline-flex rounded-xl border border-[var(--zivel-btn-outline-border)] bg-[var(--zivel-btn-outline-bg)] px-3 py-2 text-xs text-[var(--zivel-dropdown-text)] hover:bg-[var(--zivel-btn-outline-bg-hover)] hover:text-[var(--zivel-nav-text-hover)]"
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
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="rounded-xl border border-[var(--zivel-btn-outline-border)] bg-[var(--zivel-btn-outline-bg)] p-2 text-[var(--zivel-btn-outline-text)] hover:bg-[var(--zivel-btn-outline-bg-hover)] transition-colors"
              >
                {theme === "dark" ? (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                ) : (
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                )}
              </button>
              <Link
                href="/locations"
                className="rounded-2xl border border-[var(--zivel-btn-outline-border)] bg-[var(--zivel-btn-outline-bg)] px-4 py-2 text-sm font-semibold text-[var(--zivel-btn-outline-text)] hover:border-[var(--zivel-btn-outline-bg-hover)] hover:bg-[var(--zivel-btn-outline-bg-hover)]"
              >
                Find a Location
              </Link>
              <Link
                href="/#book"
                className="rounded-2xl bg-[var(--zivel-gold)] px-4 py-2 text-sm font-semibold text-[var(--zivel-gold-btn-text)] hover:opacity-90"
              >
                Book Now
              </Link>
            </div>
          </nav>

          <button
            className="md:hidden rounded-xl border border-[var(--zivel-btn-outline-border)] bg-[var(--zivel-btn-outline-bg)] px-3 py-2 text-sm font-semibold text-[var(--zivel-btn-outline-text)] hover:bg-[var(--zivel-btn-outline-bg-hover)]"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? "Close" : "Menu"}
          </button>
        </div>

        {mobileOpen ? (
          <div className="md:hidden pb-6 pt-2">
            <div className="space-y-2 rounded-2xl border border-[var(--zivel-border)] bg-[var(--zivel-mobile-bg)] p-3">
              <button
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-[var(--zivel-text-primary)] hover:bg-[var(--zivel-dropdown-hover)]"
                onClick={() => setMobileServicesOpen((v) => !v)}
                aria-label="Toggle services"
              >
                <span>Services</span>
                <span className="text-[var(--zivel-text-muted)]">
                  {mobileServicesOpen ? "—" : "+"}
                </span>
              </button>

              {mobileServicesOpen ? (
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    href="/services"
                    className="block rounded-xl px-3 py-2 text-sm text-[var(--zivel-dropdown-text)] hover:bg-[var(--zivel-dropdown-hover)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    View All Services →
                  </Link>

                  {serviceLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm text-[var(--zivel-dropdown-text)] hover:bg-[var(--zivel-dropdown-hover)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : null}

              <button
                className="flex w-full items-center justify-between rounded-xl px-3 py-3 text-sm font-semibold text-[var(--zivel-text-primary)] hover:bg-[var(--zivel-dropdown-hover)]"
                onClick={() => setMobileLocationsOpen((v) => !v)}
                aria-label="Toggle locations"
              >
                <span>Locations</span>
                <span className="text-[var(--zivel-text-muted)]">
                  {mobileLocationsOpen ? "—" : "+"}
                </span>
              </button>

              {mobileLocationsOpen && (
                <div className="space-y-1 px-2 pb-2">
                  <Link
                    href="/locations"
                    className="block rounded-xl px-3 py-2 text-sm text-[var(--zivel-dropdown-text)] hover:bg-[var(--zivel-dropdown-hover)]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Browse All Locations →
                  </Link>
                  <div className="px-3 pt-2 text-xs font-semibold text-[var(--zivel-text-muted)] uppercase tracking-wider">States</div>
                  {LOCATIONS_NAV.states.map((s) => (
                    <Link
                      key={s.href}
                      href={s.href}
                      className="block rounded-xl px-3 py-2 text-sm text-[var(--zivel-dropdown-text)] hover:bg-[var(--zivel-dropdown-hover)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {s.label}
                    </Link>
                  ))}
                  <div className="px-3 pt-3 text-xs font-semibold text-[var(--zivel-text-muted)] uppercase tracking-wider">Featured</div>
                  {LOCATIONS_NAV.featured.map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      className="block rounded-xl px-3 py-2 text-sm text-[var(--zivel-dropdown-text)] hover:bg-[var(--zivel-dropdown-hover)]"
                      onClick={() => setMobileOpen(false)}
                    >
                      {c.label}
                    </Link>
                  ))}
                </div>
              )}
              <Link
                href="/pathways"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-[var(--zivel-text-primary)] hover:bg-[var(--zivel-dropdown-hover)]"
                onClick={() => setMobileOpen(false)}
              >
                Pathways
              </Link>
              <Link
                href="/science"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-[var(--zivel-text-primary)] hover:bg-[var(--zivel-dropdown-hover)]"
                onClick={() => setMobileOpen(false)}
              >
                Science
              </Link>
              <Link
                href="/blog"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-[var(--zivel-text-primary)] hover:bg-[var(--zivel-dropdown-hover)]"
                onClick={() => setMobileOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/franchise"
                className="block rounded-xl px-3 py-3 text-sm font-semibold text-[var(--zivel-text-primary)] hover:bg-[var(--zivel-dropdown-hover)]"
                onClick={() => setMobileOpen(false)}
              >
                Franchise
              </Link>

              <div className="grid gap-2 pt-2">
                <button
                  onClick={() => { toggleTheme(); setMobileOpen(false); }}
                  className="rounded-2xl border border-[var(--zivel-btn-outline-border)] bg-[var(--zivel-btn-outline-bg)] px-4 py-3 text-sm font-semibold text-[var(--zivel-btn-outline-text)] hover:bg-[var(--zivel-btn-outline-bg-hover)] text-center flex items-center justify-center gap-2"
                >
                  {theme === "dark" ? (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
                      Light Mode
                    </>
                  ) : (
                    <>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
                      Dark Mode
                    </>
                  )}
                </button>
                <Link
                  href="/locations"
                  className="rounded-2xl border border-[var(--zivel-btn-outline-border)] bg-[var(--zivel-btn-outline-bg)] px-4 py-3 text-sm font-semibold text-[var(--zivel-btn-outline-text)] hover:border-[var(--zivel-btn-outline-bg-hover)] hover:bg-[var(--zivel-btn-outline-bg-hover)] text-center"
                  onClick={() => setMobileOpen(false)}
                >
                  Find a Location
                </Link>
                <Link
                  href="/#book"
                  className="rounded-2xl bg-[var(--zivel-gold)] px-4 py-3 text-sm font-semibold text-[var(--zivel-gold-btn-text)] hover:opacity-90 text-center"
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
