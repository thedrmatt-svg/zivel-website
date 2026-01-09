import Link from "next/link";

const navLinks = [
  { href: "/services/cryotherapy", label: "Services" },
  { href: "/locations", label: "Locations" },
  { href: "/pathways", label: "Pathways" },
  { href: "/research", label: "Science" },
  { href: "/blog", label: "Blog" },
  { href: "/franchise", label: "Franchise" },
];

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-lg font-semibold tracking-tight">Zivel</span>
          <span className="text-sm text-white/60">Wellness</span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="text-sm text-white/80 hover:text-[var(--zivel-gold)]"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/locations"
            className="rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:border-white/25 hover:bg-white/10"
          >
            Find a Location
          </Link>
          <Link
            href="/"
            className="rounded-xl bg-[var(--zivel-gold)] px-4 py-2 text-sm font-semibold text-black hover:opacity-90"
          >
            Book Now
          </Link>
        </div>
      </div>
    </header>
  );
}
