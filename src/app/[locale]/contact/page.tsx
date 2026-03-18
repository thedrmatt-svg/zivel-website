import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact Zivel",
  description: "Get in touch with Zivel. Find your local studio or reach out to our team.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-32">
      <span className="zv-tagline mb-6 block">Get in Touch</span>
      <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight mb-6">
        Contact Us
      </h1>
      <span className="zv-gold-line mb-8 mx-auto" />
      <p className="text-white/60 text-lg md:text-xl max-w-xl leading-relaxed mb-4">
        A full contact page is on the way. For now, the best way to reach us
        is through your local studio or via email.
      </p>
      <div className="mb-12">
        <a
          href="mailto:contact@zivel.com"
          className="text-[var(--zivel-gold)] hover:underline text-lg font-medium"
        >
          contact@zivel.com
        </a>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        <Link href="/locations" className="zv-btn-luxury zv-btn-gold">
          Find Your Studio
        </Link>
        <Link href="/" className="zv-btn-luxury zv-btn-outline">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
