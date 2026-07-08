const NAV_LINKS = [
  { href: "#why-own-zivel", label: "Why Own a Zivel" },
  { href: "#investment", label: "Investment at a Glance" },
  { href: "#support-training", label: "Support & Training" },
  { href: "#growth-proof", label: "Industry Growth" },
  { href: "#path-to-ownership", label: "Path to Ownership" },
  { href: "#services-pathways", label: "Services & Pathways" },
  { href: "#testimonials", label: "Testimonials" },
  { href: "#franchise-form", label: "Request Franchise Info" },
];

export default function FranchiseNavBanner() {
  return (
    <nav
      aria-label="Franchise page sections"
      className="sticky top-16 md:top-20 z-40 bg-black/95 backdrop-blur-md border-y border-[var(--zivel-gold)]/25 shadow-[0_4px_20px_rgba(0,0,0,0.4)]"
    >
      <div
        className="max-w-7xl mx-auto px-4 md:px-6 flex items-center gap-1 md:gap-2 overflow-x-auto md:overflow-visible md:flex-wrap md:justify-center zv-scrollbar-hide py-3 md:py-4"
      >
        {NAV_LINKS.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className="flex-shrink-0 whitespace-nowrap px-4 py-2 text-[11px] md:text-xs font-semibold tracking-widest uppercase text-white/70 hover:text-[var(--zivel-gold)] border border-white/10 hover:border-[var(--zivel-gold)]/50 rounded-full transition-colors duration-200"
          >
            {link.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
