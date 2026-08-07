"use client";

import { useState } from "react";

type FAQItem = { q: string; a: string };

export default function FAQAccordion({ faqs }: { faqs: FAQItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(i: number) {
    setOpenIndex((prev) => (prev === i ? null : i));
  }

  return (
    <div className="space-y-0 divide-y divide-white/10 border border-white/10 rounded-xl overflow-hidden">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i} style={{ backgroundColor: "rgba(255,255,255,0.02)" }}>
            <button
              type="button"
              onClick={() => toggle(i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/5"
            >
              <span
                className="font-semibold text-white leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {faq.q}
              </span>
              <span
                className="shrink-0 w-7 h-7 rounded-full border flex items-center justify-center transition-transform duration-200"
                style={{
                  borderColor: "var(--zivel-gold)",
                  color: "var(--zivel-gold)",
                  transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{ maxHeight: isOpen ? 600 : 0 }}
            >
              <p className="text-white/65 text-sm leading-relaxed px-6 pb-5">
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
