import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { zivel_coral_gables_location as coralGables } from "@/content/locations/coral-gables-florida";

const BOOKING_URL = `https://zivel.myperformanceiq.com/book-appointment?set_location=${coralGables.booking?.locationId}`;
const PHONE = coralGables.contact?.phone ?? "";
const TEL = `tel:${PHONE.replace(/\D/g, "")}`;

export const metadata: Metadata = {
  title: "Request Received | Sunset Chiropractic × Zivel Coral Gables",
  description: "Your Sunset Chiropractic pathway request has been received by Zivel Coral Gables.",
  robots: { index: false, follow: false },
};

export default function SunsetThankYouPage() {
  return (
    <main id="main-content" className="relative isolate flex min-h-[calc(100svh-5rem)] items-center overflow-hidden bg-[#17120f] px-6 py-20 text-white">
      <div className="pointer-events-none absolute -right-48 -top-48 h-[650px] w-[650px] rounded-full border border-[#d3a772]/25" aria-hidden="true" />
      <div className="pointer-events-none absolute -right-24 -top-24 h-[450px] w-[450px] rounded-full border border-[#d3a772]/15" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(158,98,49,.24),transparent_48%)]" aria-hidden="true" />
      <div className="relative z-10 mx-auto grid w-full max-w-6xl items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
        <div>
          <div className="mb-12 flex flex-wrap items-center gap-5">
            <Link href="/locations/florida/coral-gables" aria-label="Visit Zivel Coral Gables" className="border-r border-white/30 pr-5">
              <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={105} height={40} style={{ width: "105px", height: "auto" }} />
            </Link>
            <div className="rounded bg-[#fbf7f1] px-3 py-1">
              <Image src="/images/partners/sunset-chiropractic-logo.webp" alt="Sunset Chiropractic & Wellness" width={105} height={78} className="h-[61px] w-auto object-contain" />
            </div>
          </div>
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#eacba4]">Request received</p>
          <h1 className="mt-6 max-w-xl font-serif text-[clamp(3.4rem,7vw,6rem)] leading-[1.02] tracking-tight text-white">Your next step <em className="font-normal text-[#dfb779]">starts now.</em></h1>
          <p className="mt-8 max-w-lg text-base leading-8 text-white/80">
            Thank you for reaching out about a Sunset Chiropractic pathway at Zivel Coral Gables. We’ve received your request, and our team will follow up using the contact information you provided.
          </p>
        </div>
        <div className="border-l-4 border-[#dfb779] bg-[#292019] p-7 shadow-2xl shadow-black/30 sm:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-[#eacba4]">Ready when you are</p>
          <h2 className="mt-4 font-serif text-3xl text-white">Book a visit at Zivel.</h2>
          <p className="mt-4 text-sm leading-7 text-white/80">You can choose a time now. The Coral Gables team will still follow up about your pathway request. Check with your Sunset clinician before trying services if you have a medical condition or recent injury.</p>
          <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex min-h-12 w-full items-center justify-center bg-[#dfb779] px-5 text-center text-xs font-bold uppercase tracking-[0.14em] text-[#2c1b12] transition-colors hover:bg-[#f3d7ae] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white">
            Book Now ↗
          </a>
          <div className="mt-7 flex flex-col items-start gap-3 text-sm">
            <Link className="text-[#f0c991] underline underline-offset-4 hover:text-white" href="/locations/florida/coral-gables">View Zivel Coral Gables</Link>
            <a className="text-[#f0c991] underline underline-offset-4 hover:text-white" href={TEL}>Call {PHONE}</a>
            <Link className="text-[#f0c991] underline underline-offset-4 hover:text-white" href="/sunsetchiro">Back to the pathways</Link>
          </div>
        </div>
      </div>
    </main>
  );
}