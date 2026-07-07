"use client";

import { useState } from "react";

const INVESTMENT_ROWS = [
  { label: "Initial Investment", value: "$327,400 – $429,000" },
  { label: "Liquidity Required", value: "$100,000" },
  { label: "Net Worth Required", value: "$350,000" },
  { label: "Franchise Fee", value: "$39,500" },
  { label: "Royalty Fee", value: "6%" },
  { label: "Ad Fund Contribution", value: "0%", highlight: true },
  { label: "Technology Fee", value: "$1,500" },
  { label: "Agreement Term", value: "10 years, renewable" },
  { label: "Veterans Incentive", value: "$9,500 off franchise fee", highlight: true, accent: true },
];

export default function FranchiseInvestmentReveal() {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {!open ? (
        <div className="text-center py-10">
          <p className="text-white/50 text-sm mb-6 max-w-md mx-auto leading-relaxed">
            Zivel is designed to compete favorably with other health-related franchises on both
            capital requirements and operating costs.
          </p>
          <button
            onClick={() => setOpen(true)}
            className="group inline-flex items-center gap-3 rounded-2xl border border-[var(--zivel-gold)]/40 bg-[var(--zivel-gold)]/5 hover:bg-[var(--zivel-gold)]/10 hover:border-[var(--zivel-gold)]/70 transition-all duration-300 px-8 py-5"
          >
            <span className="flex items-center justify-center w-8 h-8 rounded-full border border-[var(--zivel-gold)]/50 group-hover:border-[var(--zivel-gold)] transition-colors duration-300">
              <svg className="w-4 h-4 text-[var(--zivel-gold)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-6-6h12" />
              </svg>
            </span>
            <span className="text-sm font-semibold tracking-widest uppercase text-[var(--zivel-gold)]">
              Click here to get initial investment summary
            </span>
          </button>
          <p className="mt-4 text-white/25 text-xs">Numbers reflect current FDD disclosures</p>
        </div>
      ) : (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="rounded-2xl overflow-hidden border border-white/10 mb-8">
            {INVESTMENT_ROWS.map((row, i) => (
              <div
                key={row.label}
                className={[
                  "flex items-center justify-between px-8 py-5",
                  row.accent
                    ? "border-t border-[var(--zivel-gold)]/30 bg-[var(--zivel-gold)]/5"
                    : i % 2 === 0
                    ? "bg-white/3"
                    : "bg-transparent",
                ].join(" ")}
              >
                <p className="text-sm text-white/60 font-medium tracking-wide">{row.label}</p>
                <p className={`text-base font-semibold ${row.highlight ? "text-[var(--zivel-gold)]" : "text-white"}`}>
                  {row.value}
                </p>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-2">
            <p className="text-white/30 text-xs">
              Zivel does not provide lending directly. We work with SBA loans, private lenders,
              HELOC, and ROBS financing to help qualified candidates.
            </p>
            <button
              onClick={() => setOpen(false)}
              className="ml-6 flex-shrink-0 text-xs text-white/30 hover:text-white/60 tracking-wider uppercase transition-colors duration-200"
            >
              Hide ↑
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
