import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/10 bg-black">
      <div className="mx-auto grid max-w-6xl items-start gap-10 px-4 py-12 md:grid-cols-4">
        {/* Brand column */}
        <div className="space-y-2">
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

        {/* Explore */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Explore</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/services/cryotherapy">
                Services
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/pathways">
                Pathways
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/memberships">
                Memberships
              </Link>
            </li>
          </ul>
        </div>

        {/* Company */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Company</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/about">
                About
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/blog">
                Blog
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/franchise">
                Franchise
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/contact">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Science */}
        <div className="space-y-3">
          <div className="text-sm font-semibold text-white">Science</div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/research">
                Research Library
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/research/cryotherapy">
                Cryotherapy Studies
              </Link>
            </li>
            <li>
              <Link className="hover:text-[var(--zivel-gold)]" href="/research/red-light-therapy">
                Red Light Studies
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-4 py-6 text-xs text-white/60 md:flex-row md:items-center md:justify-between">
          <p>© {new Date().getFullYear()} Zivel Wellness. All rights reserved.</p>
          <p>
            Wellness services are not medical treatments and do not diagnose, treat,
            cure, or prevent disease.
          </p>
        </div>
      </div>
    </footer>
  );
}
