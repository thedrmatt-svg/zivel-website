import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-0 border-t border-white/[0.06] bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="zv-divider-gold" />

      <div className="mx-auto max-w-6xl px-6 pt-20 pb-12">
        <div className="grid gap-12 md:grid-cols-12">
          <div className="md:col-span-4">
            <Link href="/" className="inline-flex items-start leading-none">
              <Image
                src="/images/brand/zivel-logo.png"
                alt="Zivel"
                width={140}
                height={40}
                style={{ width: "auto", height: "auto" }}
                className="h-auto w-[120px] -mt-3"
                priority
              />
            </Link>

            <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-[280px]">
              Science-backed wellness for recovery, performance, and longevity.
            </p>

            <span className="zv-gold-line-left mt-8" />
          </div>

          <div className="md:col-span-2 space-y-5">
            <div className="zv-tagline">Explore</div>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/services/cryotherapy">
                  Services
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/pathways">
                  Pathways
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/memberships">
                  Memberships
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-5">
            <div className="zv-tagline">Company</div>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/about">
                  About
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/blog">
                  Blog
                </Link>
              </li>
              <li>
                <a className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="https://www.zivelfranchise.com" target="_blank" rel="noopener noreferrer">
                  Franchise
                </a>
              </li>
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/contact">
                  Contact
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/terms-and-conditions">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/privacy-policy">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-5">
            <div className="zv-tagline">Science</div>
            <ul className="space-y-3 text-sm text-white/50">
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/research">
                  Research Library
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/research/cryotherapy">
                  Cryotherapy Studies
                </Link>
              </li>
              <li>
                <Link className="hover:text-[var(--zivel-gold)] transition-colors duration-300" href="/research/red-light-therapy">
                  Red Light Studies
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="zv-divider-white" />

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-8 text-xs text-white/40 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Zivel. All rights reserved.</p>
        <p>
          Wellness services are not medical treatments and do not diagnose, treat,
          cure, or prevent disease.
        </p>
      </div>
    </footer>
  );
}
