import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { services } from "@/lib/data/services";

export const metadata: Metadata = {
  title: "Services | Zivel",
  description:
    "Explore Zivel's science-backed wellness and recovery services — cryotherapy, red light therapy, infrared sauna, dry float, compression, and more.",
  alternates: { canonical: "/services" },
};

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
      {/* HERO */}
      <section className="zv-bleed zv-hero-bg zv-noise py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-4">
          <div className="max-w-3xl space-y-4">
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
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
              >
                View Locations
              </Link>
              <Link
                href="/#book"
                className="rounded-xl bg-[var(--zivel-gold)] px-5 py-3 text-sm font-semibold text-black hover:opacity-90"
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="zv-bleed zv-divider-gold" />

      {/* GRID */}
      <section className="zv-bleed zv-section-gradient zv-noise py-16">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => {
              const accent = s.accent?.hex ?? "#D4AF37";
              const glowSoft = hexToRgba(accent, 0.12);
              const glowHover = hexToRgba(accent, 0.22);
              const hairline = hexToRgba(accent, 0.85);

              const heroSrc =
                s.hero?.media?.type === "image" ? s.hero.media.src : null;

              return (
                <Link
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-black/30 transition
                             hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/[0.06]"
                  style={{
                    boxShadow:
                      "0 0 0 1px rgba(255,255,255,0.05), 0 18px 60px rgba(0,0,0,0.45)",
                  }}
                >
                  <div
                    className="pointer-events-none absolute left-0 top-0 h-px w-full opacity-80"
                    style={{ background: `linear-gradient(90deg, transparent, ${hairline}, transparent)` }}
                  />

                  <div
                    className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full blur-3xl opacity-50 transition duration-500 group-hover:opacity-90"
                    style={{ background: glowSoft }}
                  />
                  <div
                    className="pointer-events-none absolute -bottom-28 -left-28 h-72 w-72 rounded-full blur-3xl opacity-30 transition duration-500 group-hover:opacity-70"
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
                        className="object-cover opacity-95 transition duration-700 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-white/[0.04] to-transparent text-white/40">
                        Image placeholder
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/35 to-black/85" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-black/25" />
                  </div>

                  <div className="relative p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="min-w-0">
                        <h2 className="truncate text-xl font-semibold text-white">
                          {s.name}
                        </h2>
                        <p className="mt-2 text-sm text-white/70">
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

                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-white/80 transition group-hover:text-[var(--zivel-gold)]">
                      Explore <span aria-hidden="true">→</span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>

          <p className="mt-10 text-center text-xs text-white/50">
            Replace placeholders with your real studio photography when ready. No
            code changes needed—just overwrite the image files.
          </p>
        </div>
      </section>
    </div>
  );
}
