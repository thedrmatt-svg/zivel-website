import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Thank You | Zivel Riverton",
  description: "Your request has been received. The Zivel Riverton team will be in touch shortly.",
  robots: { index: false, follow: false },
};

const PHONE_DISPLAY = "(385) 443-8778";
const PHONE_TEL = "tel:+13854438778";

export default function RivertonThankYouPage() {
  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6 py-20 text-center"
      style={{ backgroundColor: "#080808" }}
    >
      {/* Logo */}
      <Link href="https://www.zivel.com" aria-label="Zivel home" className="mb-10 inline-block">
        <Image
          src="/images/brand/zivel-logo.png"
          alt="Zivel"
          width={110}
          height={38}
          className="h-8 w-auto"
        />
      </Link>

      {/* Gold check */}
      <div
        className="w-18 h-18 rounded-full flex items-center justify-center mx-auto mb-7 text-2xl font-bold"
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
        We&rsquo;ve Got Your Request
      </h1>

      {/* Body copy */}
      <p className="text-white/65 leading-relaxed max-w-md mx-auto mb-10 text-[1.0625rem]">
        Thank you for reaching out to Zivel Riverton. A member of our team will
        contact you shortly to help you find the right option — whether that&rsquo;s
        a single session or a membership plan that fits your goals.
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

      {/* Footer note */}
      <p className="mt-16 text-xs text-white/20">
        © {new Date().getFullYear()} Zivel. All rights reserved.
      </p>
    </main>
  );
}
