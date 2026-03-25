import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import ScrollReveal from "@/components/ui/ScrollReveal";

import { services } from "@/lib/data/services";

const SITE_URL = "https://www.zivel.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const enUrl = `${SITE_URL}/services`;
  const esUrl = `${SITE_URL}/es/services`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: "Services | Zivel",
    description:
      "Explore Zivel's science-backed wellness and recovery services — cryotherapy, red light therapy, infrared sauna, dry float, compression, and more.",
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

function hexToRgba(hex: string, alpha: number) {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export default function ServicesIndexPage() {
  return (
    <div className="space-y-0">
      {/* HERO (DARK) */}
      <section className="zv-bleed zv-hero-bg zv-noise py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl space-y-4">
            <ScrollReveal variant="fade-up">
              <p className="text-sm font-medium tracking-widest uppercase text-[var(--zivel-gold)]">Performance & Recovery</p>
              <h1>Services</h1>
              <p className="text-white/70">
                Explore Zivel&apos;s modern wellness and recovery technologies. Each
                service is designed to help you feel better—faster—with science-backed
                protocols and an elevated studio experience.
              </p>
              <div className="flex flex-wrap gap-3 pt-3">
                <Link
                  href="/locations"
                  className="zv-btn-luxury zv-btn-outline"
                >
                  View Locations
                </Link>
                <a
                  href="https://zivel.myperformanceiq.com/book-appointment?set_location=11417"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="zv-btn-luxury zv-btn-gold"
                >
                  Book Now
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* GRID (LIGHT) */}
      <section className="zv-bleed zv-section-light zv-light zv-noise py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => {
              const accent = s.accent?.hex ?? "#D4AF37";
              const glowSoft = hexToRgba(accent, 0.08);
              const glowHover = hexToRgba(accent, 0.15);
              const hairline = hexToRgba(accent, 0.70);

              const heroSrc =
                s.hero?.media?.type === "image" ? s.hero.media.src : null;

              return (
                <ScrollReveal key={s.slug} variant="fade-up" delay={i * 80}>
                  <Link
                    href={`/services/${s.slug}`}
                    className="group relative overflow-hidden rounded-2xl border border-black/8 bg-white transition
                               hover:-translate-y-1 hover:border-black/15"
                    style={{
                      boxShadow:
                        "0 4px 20px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)",
                    }}
                  >
                    <div
                      className="pointer-events-none absolute left-0 top-0 h-px w-full opacity-80"
                      style={{ background: `linear-gradient(90deg, transparent, ${hairline}, transparent)` }}
                    />

                    <div
                      className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-30 transition duration-500 group-hover:opacity-60"
                      style={{ background: glowSoft }}
                    />
                    <div
                      className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl opacity-15 transition duration-500 group-hover:opacity-40"
                      style={{ background: glowHover }}
                    />

                    <div className="relative aspect-[16/10] w-full overflow-hidden">
                      {heroSrc ? (
                        <Image
                          src={heroSrc}
                          alt={s.name}
                          fill
                          loading="lazy"
                          sizes="(max-width: 1024px) 100vw, 33vw"
                          quality={75}
                          className="object-cover transition duration-700 group-hover:scale-[1.03]"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-black/[0.03] to-transparent text-black/30">
                          Image placeholder
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/70" />
                    </div>

                    <div className="relative p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div className="min-w-0">
                          <h2 className="truncate text-xl font-semibold text-black/85">
                            {s.name}
                          </h2>
                          <p className="mt-2 text-sm text-black/55">
                            {s.hero?.subheadline ??
                              s.seo?.description ??
                              "Explore this service at Zivel."}
                          </p>
                        </div>

                        <span
                          className="mt-1 inline-flex h-2.5 w-2.5 shrink-0 rounded-full"
                          style={{ background: accent }}
                          aria-hidden="true"
                        />
                      </div>

                      <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-black/60 transition group-hover:text-[var(--zivel-gold-dark)]">
                        Explore <span aria-hidden="true">→</span>
                      </div>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
