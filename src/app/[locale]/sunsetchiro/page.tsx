import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { zivel_coral_gables_location as coralGables } from "@/content/locations/coral-gables-florida";

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

const pathways = [
  {
    number: "01",
    name: "Neuro Recovery",
    label: "REST & RECHARGE",
    description:
      "A calm, restorative visit built around light, cold, weightless rest, and a moment to breathe. Your clinician can help you decide what fits your care plan.",
    services: [
      { name: "Red Light Therapy", detail: "A quiet start for a recovery-focused routine." },
      { name: "Cryotherapy", detail: "A brief whole-body cold experience." },
      { name: "Float Therapy", detail: "Dry float time for deep relaxation." },
      { name: "Oxygen", detail: "A comfortable finish at the oxygen bar." },
    ],
  },
  {
    number: "02",
    name: "Accident",
    label: "GENTLE SUPPORT",
    description:
      "A simple sequence for patients looking to add wellness services alongside their clinician-directed recovery. Only begin after your treating clinician clears each service.",
    services: [
      { name: "Red Light Therapy", detail: "A low-effort place to start." },
      { name: "Compression", detail: "Time to rest while the legs are supported." },
      { name: "Cryotherapy", detail: "A short cold session, when appropriate." },
    ],
  },
  {
    number: "03",
    name: "Spine Pain",
    label: "MOVE WITH CARE",
    description:
      "A comfort-minded routine to explore with your chiropractor. Heat and cold may not be right for every condition, so ask your care team first.",
    services: [
      { name: "Red Light Therapy", detail: "A gentle, seated wellness session." },
      { name: "Sauna", detail: "A chance to unwind with infrared warmth." },
      { name: "Cryotherapy", detail: "A brief cold session, if cleared for you." },
    ],
  },
] as const;

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

      <section className="relative isolate min-h-[670px] bg-[#17130f]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_12%_15%,rgba(166,100,48,0.19),transparent_45%)]" />
        <div className="mx-auto grid max-w-7xl lg:min-h-[670px] lg:grid-cols-[1.1fr_0.9fr]">
          <div className="relative z-10 flex flex-col justify-center px-6 py-20 md:px-12 lg:py-24">
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
            <p className="mt-8 max-w-[560px] text-base leading-8 text-white/70 md:text-lg">
              Sunset Chiropractic & Wellness and Zivel Coral Gables bring together clinician-led care and restorative wellness experiences. Explore three thoughtfully arranged service pathways to discuss with your care team.
            </p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a href="#pathways" className="inline-flex min-h-12 items-center justify-center bg-[#b1773f] px-7 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:bg-[#cd965b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
                Find your pathway <span aria-hidden="true" className="ml-3">↗</span>
              </a>
              <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center justify-center border border-white/35 px-7 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors hover:border-[#d7ab70] hover:text-[#d7ab70]">
                Book at Zivel
              </a>
            </div>
          </div>
          <div className="relative min-h-[460px] lg:min-h-full">
            <Image
              src="/images/partners/chiropractic-examination.jpg"
              alt="Stock photograph of a chiropractor examining a patient's neck and shoulder"
              fill
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover object-[center_38%]"
              priority
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#17130f]/50 via-transparent to-transparent lg:bg-gradient-to-r lg:from-[#17130f]/50 lg:via-transparent lg:to-transparent" />
            <div className="absolute bottom-5 right-5 bg-black/70 px-3 py-2 text-[10px] tracking-wide text-white/75">Illustrative stock photography</div>
          </div>
        </div>
      </section>

      <section className="border-y border-[#a66a39]/30 bg-[#eee9e1] py-14 text-[#2b211c]">
        <div className="mx-auto grid max-w-7xl gap-7 px-6 md:grid-cols-[250px_1fr] md:items-center md:gap-16">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#955727]">Two teams. One goal.</p>
          <p className="font-serif text-2xl leading-snug md:text-3xl">
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

      <section className="bg-[#f4f0e9] px-6 py-20 text-[#2b211c] md:py-24">
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

      <section className="bg-[#48301f] px-6 py-20 text-center md:py-24">
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs font-bold uppercase tracking-[0.25em] text-[#eacba4]">Begin with a conversation</p>
          <h2 className="font-serif text-4xl md:text-5xl">Ready to explore what fits?</h2>
          <p className="mx-auto mt-5 max-w-xl leading-7 text-white/75">Check in with your Sunset care team, then connect with Zivel Coral Gables to plan a visit.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center bg-[#dfb779] px-7 text-xs font-bold uppercase tracking-[0.14em] text-[#2c1b12] hover:bg-white">Book at Zivel Coral Gables ↗</a>
            <a href="https://www.sunsetchiropractor.com/" target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center border border-white/50 px-7 text-xs font-bold uppercase tracking-[0.14em] text-white hover:bg-white/10">Visit Sunset Chiropractic ↗</a>
          </div>
        </div>
      </section>
      <p className="bg-[#0e0d0c] px-6 py-6 text-center text-xs leading-6 text-white/45">
        Zivel services are wellness experiences and do not diagnose or treat injuries, neuropathy, or spine conditions. If you have a recent accident, acute pain, or a medical condition, consult your treating clinician before using these services.
      </p>
    </main>
  );
}