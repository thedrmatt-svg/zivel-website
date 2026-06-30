"use client";

import { useState } from "react";
import { pressItems, PRESS_CATEGORIES, formatPressDate } from "@/lib/data/press";
import type { PressCategory } from "@/lib/data/press";
import ScrollReveal from "@/components/ui/ScrollReveal";

export default function PressGrid() {
  const [active, setActive] = useState<PressCategory>("All");

  const filtered =
    active === "All" ? pressItems : pressItems.filter((p) => p.category === active);

  return (
    <div>
      {/* ── Filter tabs ── */}
      <div className="mb-12 flex flex-wrap gap-2">
        {PRESS_CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={[
              "rounded-full px-5 py-2 text-sm font-semibold tracking-wide transition-all duration-200",
              active === cat
                ? "bg-[var(--zivel-gold)] text-black"
                : "border border-black/15 text-black/60 hover:border-[var(--zivel-gold-dark)] hover:text-[var(--zivel-gold-dark)]",
            ].join(" ")}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Card grid ── */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((item, idx) => (
          <ScrollReveal key={item.id} variant="fade-up" delay={idx * 60}>
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-black/10 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md overflow-hidden"
            >
              {/* Category tag + featured badge */}
              <div className="flex items-center justify-between gap-2 border-b border-black/[0.06] px-6 py-3">
                <span className="text-xs font-semibold uppercase tracking-widest text-[var(--zivel-gold-dark)]">
                  {item.category}
                </span>
                {item.featured && (
                  <span className="rounded-full bg-[var(--zivel-gold)]/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-widest text-[var(--zivel-gold-dark)]">
                    Featured
                  </span>
                )}
              </div>

              <div className="flex flex-1 flex-col p-6">
                {/* Publication name */}
                <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-black/40">
                  {item.publication}
                </p>

                {/* Headline */}
                <h3 className="mb-3 font-serif text-xl font-light leading-snug text-black/90 group-hover:text-[var(--zivel-gold-dark)] transition-colors duration-200">
                  {item.headline}
                </h3>

                {/* Excerpt */}
                <p className="mb-5 flex-1 text-sm leading-relaxed text-black/60 line-clamp-3">
                  {item.excerpt}
                </p>

                {/* Footer: date + CTA */}
                <div className="flex items-center justify-between gap-3 pt-4 border-t border-black/[0.07]">
                  <time
                    dateTime={item.date}
                    className="text-xs text-black/40"
                  >
                    {formatPressDate(item.date)}
                  </time>
                  <span className="text-xs font-semibold tracking-wide text-[var(--zivel-gold-dark)] group-hover:underline underline-offset-4">
                    Read Article →
                  </span>
                </div>
              </div>
            </a>
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}
