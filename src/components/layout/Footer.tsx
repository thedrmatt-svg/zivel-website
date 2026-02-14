import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-0 border-t border-white/10 bg-gradient-to-b from-[#0a0a0a] to-black">
      <div className="zv-divider-gold" />

      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-12 md:grid-cols-4">
        <div className="">
          <Link href="/" className="inline-flex items-start leading-none">
            <Image
              src="/images/brand/zivel-logo.png"
              alt="Zivel"
              width={140}
              height={40}
              className="h-auto w-[120px] -mt-3"
              priority
            />
          </Link>

          <p className="text-sm leading-snug text-white/70">
            Science-backed wellness for recovery, performance, and longevity.
          </p>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Explore</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/services/cryotherapy">
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/pathways">
                Pathways
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/memberships">
                Memberships
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Company</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <a className="hover:text-[var(--zivel-gold)] transition-colors" href="https://www.zivelfranchise.com" target="_blank" rel="noopener noreferrer">
                Franchise
              </a>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/contact">
                Contact
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/terms-and-conditions">
                Terms & Conditions
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/privacy-policy">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>

        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Science</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/research">
                Research Library
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/research/cryotherapy">
                Cryotherapy Studies
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)] transition-colors" href="/research/red-light-therapy">
                Red Light Studies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="zv-divider-white" />

      <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} Zivel Wellness. All rights reserved.</p>
        <p>
          Wellness services are not medical treatments and do not diagnose, treat,
          cure, or prevent disease.
        </p>
      </div>
    </footer>
  );
}
