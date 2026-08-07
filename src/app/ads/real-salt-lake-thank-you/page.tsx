import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Thank You | Zivel × Real Salt Lake",
  description: "Your request has been received. The Zivel team will be in touch shortly.",
  robots: { index: false, follow: false },
};

const PHONE_DISPLAY = "(385) 443-8778";
const PHONE_TEL = "tel:+13854438778";

export default function RSLThankYouPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Logos */}
      <div className="flex items-center justify-center gap-4 mb-10">
        <Image
          src="/images/brand/zivel-logo.png"
          alt="Zivel"
          width={90}
          height={32}
          className="h-8 w-auto"
        />
        <span className="text-white/20 text-xl font-thin">×</span>
        {/* Replace with: <Image src="/images/ads/rsl-logo.png" alt="Real Salt Lake" ... /> */}
        <span
          className="text-xs font-black tracking-[0.15em] uppercase"
          style={{ color: "var(--zivel-gold)" }}
        >
          Real Salt Lake
        </span>
      </div>

      {/* Gold check */}
      <div
        className="rounded-full flex items-center justify-center mx-auto mb-7 text-2xl font-bold"
        style={{ width: 72, height: 72, backgroundColor: "var(--zivel-gold)", color: "#000" }}
        aria-hidden="true"
      >
        ✓
      </div>

      {/* Heading */}
      <h1
        className="text-3xl sm:text-4xl font-bold mb-4 leading-tight"
        style={{ fontFamily: "var(--font-playfair)" }}
      >
        Your Offer Is Reserved
      </h1>

      {/* Body copy */}
      <p className="text-white/65 leading-relaxed max-w-md mx-auto mb-3 text-[1.0625rem]">
        Thank you for claiming your exclusive Real Salt Lake × Zivel offer.
        A member of our team will contact you shortly to schedule your first session.
      </p>
      <p className="text-white/40 text-sm mb-10">
        Remember: 30% off + first visit just $5 — new clients only.
      </p>

      {/* Phone fallback */}
      <p className="text-xs uppercase tracking-widest text-white/40 mb-2 font-semibold">
        Or reach us directly
      </p>
      <a
        href={PHONE_TEL}
        className="text-2xl font-bold hover:opacity-80 transition-opacity mb-12"
        style={{ color: "var(--zivel-gold)" }}
      >
        {PHONE_DISPLAY}
      </a>

      {/* Nav links */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <a
          href="https://www.zivel.com"
          className="inline-block px-8 py-4 text-xs font-bold tracking-widest uppercase rounded text-black transition-opacity hover:opacity-90"
          style={{ backgroundColor: "var(--zivel-gold)" }}
        >
          Visit Zivel.com
        </a>
        <a
          href="https://www.zivel.com/locations/utah/riverton"
          className="inline-block px-8 py-4 text-xs font-bold tracking-widest uppercase rounded border transition-colors hover:bg-white/10"
          style={{ borderColor: "var(--zivel-gold)", color: "var(--zivel-gold)" }}
        >
          Riverton Location
        </a>
      </div>

      <p className="mt-16 text-xs text-white/20">
        © {new Date().getFullYear()} Zivel. All rights reserved.
      </p>
    </main>
  );
}
