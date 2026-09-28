import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { zivel_coral_gables_location as coralGables } from "@/content/locations/coral-gables-florida";
import SunsetInquiryForm from "./SunsetInquiryForm";
import { pathways } from "./pathways";
import styles from "./page.module.css";

const LOCATION_URL = "/locations/florida/coral-gables";
const BOOKING_URL = `https://zivel.myperformanceiq.com/book-appointment?set_location=${coralGables.booking?.locationId}`;
const PHONE = coralGables.contact?.phone ?? "";
const TEL = `tel:${PHONE.replace(/\D/g, "")}`;

export const metadata: Metadata = {
  title: "Sunset Chiropractic & Wellness × Zivel Coral Gables | Recovery Pathways",
  description:
    "Explore three complementary wellness pathways for Sunset Chiropractic & Wellness patients at Zivel Coral Gables: Neuro Recovery, Accident, and Spine Pain.",
  alternates: { canonical: "https://www.zivel.com/sunsetchiro" },
};

export default function SunsetChiroPage() {
  return (
    <main id="main-content" className="overflow-hidden bg-[#0e0d0c] text-white">
      <div className="relative border-b border-white/10 bg-[#11100e]">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-[#d3ab76]">
            A Coral Gables wellness collaboration
          </p>
          <a href="#pathways" className="text-xs font-semibold uppercase tracking-[0.15em] text-white/75 underline decoration-[#ba8148] underline-offset-8 transition-colors hover:text-white">
            Explore the pathways ↓
          </a>
        </div>
      </div>

      <section className="relative isolate flex min-h-[790px] items-end overflow-hidden bg-[#17130f] lg:min-h-[670px] lg:items-center">
        <div className="absolute inset-y-0 right-0 w-full lg:w-[68%]">
          <Image
            src="/images/partners/chiropractic-examination.jpg"
            alt="Stock photograph of a chiropractor examining a patient's neck and shoulder"
            fill
            sizes="(max-width: 1024px) 100vw, 68vw"
            className="object-cover object-[center_30%]"
            priority
          />
        </div>
        <div className={styles.heroOverlay} aria-hidden="true" />
        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-16 md:px-12 lg:py-24">
          <div className="max-w-[680px] lg:w-[64%]">
            <div className="mb-12 flex flex-wrap items-center gap-5">
              <div className="flex h-[64px] items-center border-r border-white/20 pr-5">
                <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={105} height={40} style={{ width: "105px", height: "auto" }} priority />
              </div>
              <div className="rounded bg-[#fbf7f1] px-3 py-1">
                <Image src="/images/partners/sunset-chiropractic-logo.webp" alt="Sunset Chiropractic & Wellness" width={105} height={78} className="h-[61px] w-auto object-contain" priority />
              </div>
            </div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.27em] text-[#d7ab70]">Care that goes beyond the appointment</p>
            <h1 className="max-w-[710px] font-serif text-[clamp(3.2rem,6.3vw,6rem)] leading-[1.02] tracking-tight">
              Your next step in <em className="font-normal text-[#d7ab70]">feeling well.</em>
            </h1>
            <p className="mt-8 max-w-[560px] text-base leading-8 text-white/85 md:text-lg">
              Sunset Chiropractic & Wellness and Zivel Coral Gables bring together clinician-led care and restorative wellness experiences. Explore three thoughtfully arranged service pathways to discuss with your care team.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#pathways" className="inline-flex min-h-12 items-center justify-center bg-[#8a4d23] px-7 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#713b1a] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Find your pathway <span aria-hidden="true" className="ml-3">↗</span>
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center border border-white/35 px-7 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#d7ab70] hover:text-[#d7ab70]">
                Book at Zivel
              </a>
            </div>
          </div>
        </div>
        <div className="absolute right-4 top-4 z-10 bg-black/80 px-3 py-2 text-[10px] tracking-wide text-white lg:bottom-4 lg:top-auto">Illustrative stock photography</div>
      </section>

      <section className={`${styles.lightSection} border-y border-[#a66a39]/30 bg-[#eee9e1] py-14 text-[#2b211c]`}>
        <div className="mx-auto grid max-w-7xl gap-7 px-6 md:grid-cols-[250px_1fr] md:items-center md:gap-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#955727]">Two teams. One goal.</p>
          <p className={`${styles.lightText} font-serif text-2xl leading-snug md:text-3xl`}>
            A more considered way to pair your chiropractic care with time to rest, recharge, and reconnect with your routine.
          </p>
        </div>
      </section>

      <section id="pathways" className="scroll-mt-24 bg-[#0e0d0c] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-3xl">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#d7ab70]">Designed for the journey</p>
            <h2 className="font-serif text-4xl tracking-tight md:text-6xl">Three pathways. <span className="text-[#d7ab70]">Your pace.</span></h2>
            <p className="mt-6 text-base leading-7 text-white/65">These are suggested service combinations, not medical treatment plans. Talk with your Sunset provider about what is appropriate for you before booking.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {pathways.map((pathway) => (
              <article key={pathway.name} className="group flex flex-col border border-[#8c6646]/50 bg-[#191612] p-7 transition-colors hover:border-[#d7ab70] md:p-9">
                <div className="mb-10 flex items-start justify-between">
                  <span className="font-serif text-5xl text-[#d7ab70]">{pathway.number}</span>
                  <span className="border border-[#aa7444]/50 px-3 py-2 text-[10px] font-bold tracking-[0.14em] text-[#d7ab70]">{pathway.label}</span>
                </div>
                <h3 className="font-serif text-3xl md:text-4xl">{pathway.name}</h3>
                <p className="mt-5 min-h-[112px] text-sm leading-7 text-white/65">{pathway.description}</p>
                <div className="mt-7 border-t border-white/15 pt-6">
                  <p className="mb-5 text-[11px] font-bold uppercase tracking-[0.2em] text-[#d7ab70]">The sequence</p>
                  <ol className="space-y-5">
                    {pathway.services.map((service, index) => (
                      <li key={service.name} className="flex gap-4">
                        <span className="shrink-0 pt-0.5 text-xs font-semibold text-[#d7ab70]">{String(index + 1).padStart(2, "0")}</span>
                        <span><strong className="block text-sm font-semibold text-white">{service.name}</strong><span className="mt-1 block text-xs leading-5 text-white/55">{service.detail}</span></span>
                      </li>
                    ))}
                  </ol>
                </div>
                <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="mt-10 inline-flex min-h-12 items-center justify-between border-t border-[#a66a39]/60 pt-5 text-xs font-bold uppercase tracking-[0.16em] text-[#e3b780] transition-colors hover:text-white">
                  Book at Zivel <span aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.lightSection} bg-[#f4f0e9] px-6 py-20 text-[#2b211c] md:py-24`}>
        <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:gap-24">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#925729]">Your local Zivel studio</p>
            <h2 className="font-serif text-4xl leading-tight md:text-5xl">A place to make recovery part of your day.</h2>
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-base leading-8 text-[#594b40]">All three pathways use services available at Zivel Coral Gables. Our studio team can explain each experience and help you choose what to try, while your Sunset clinician remains your guide for medical questions and clearance.</p>
            <address className="mt-7 not-italic font-semibold">{coralGables.contact?.address}</address>
            <a href={TEL} className="mt-2 w-fit font-semibold text-[#925729] underline underline-offset-4">{PHONE}</a>
            <Link href={LOCATION_URL} className="mt-7 w-fit text-xs font-bold uppercase tracking-[0.16em] text-[#925729] underline underline-offset-8 hover:text-black">Explore Zivel Coral Gables ↗</Link>
          </div>
        </div>
      </section>

      <section id="request" className="scroll-mt-20 bg-[radial-gradient(circle_at_15%_10%,#604029,#2a1c16_58%,#17120f)] px-6 py-20 md:py-28">
        <div className="mx-auto grid max-w-7xl items-start gap-12 lg:grid-cols-[1fr_420px] lg:gap-20">
          <div className="lg:pt-6">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.25em] text-[#eacba4]">Start the conversation</p>
            <h2 className="max-w-2xl font-serif text-4xl leading-tight text-white md:text-6xl">Your next step <span className="text-[#eacba4]">starts here.</span></h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-white/80">
              Tell the Zivel Coral Gables team how to reach you and which pathway you’re interested in. We’ll follow up to help you plan a visit.
            </p>
            <p className="mt-7 max-w-xl text-sm leading-7 text-white/75">
              If you’re recovering from an accident or managing a medical condition, check with your Sunset clinician before trying any of these services.
            </p>
            <div className="mt-10 flex flex-col items-start gap-2 text-sm text-white/85">
              <strong className="text-white">Zivel Coral Gables</strong>
              <span>{coralGables.contact?.address}</span>
              <a href={TEL} className="text-[#f0c991] underline underline-offset-4 hover:text-white">{PHONE}</a>
            </div>
          </div>
          <div className="border-t-4 border-[#dfb779] bg-[#1b1714] p-6 shadow-2xl shadow-black/25 sm:p-9">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#eacba4]">Sunset × Zivel Coral Gables</p>
            <h3 className="mt-3 font-serif text-3xl text-white">Ask about a pathway</h3>
            <p className="mt-3 mb-7 text-sm leading-6 text-white/75">Share your contact details and select the pathway you’d like to explore.</p>
            <SunsetInquiryForm />
          </div>
        </div>
      </section>
      <p className="bg-[#0e0d0c] px-6 py-6 text-center text-xs leading-6 text-white/70">
        Zivel services are wellness experiences and do not diagnose or treat injuries, neuropathy, or spine conditions. If you have a recent accident, acute pain, or a medical condition, consult your treating clinician before using these services.
      </p>
    </main>
  );
}