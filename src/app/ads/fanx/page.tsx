import type { Metadata } from "next";
import Image from "next/image";
import AdsLeadForm from "../_shared/AdsLeadForm";

export const metadata: Metadata = {
  title: "Official Sponsor | Recover Like Celebrities | Zivel × FanX",
  description: "FanX attendees: claim 30% off any Zivel service and your first visit for just $5 at Zivel Riverton.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

const PHONE = "(385) 443-8778";
const PHONE_TEL = "tel:+13854438778";
const services = [
  ["Red Light Therapy", "Recharge tired bodies with targeted light."],
  ["Cryotherapy", "A brisk reset after a full day on the floor."],
  ["Infrared Sauna", "Unwind, sweat, and leave the noise behind."],
  ["Compression Therapy", "Give your legs the standing-ovation treatment."],
  ["Float Therapy", "The quietest room at the convention."],
  ["Oxygen Therapy", "A fresh breath for your next big scene."],
];

export default function FanXPage() {
  return (
    <div className="min-h-[100dvh]" style={{ background: "#131313" }}>
      <header className="sticky top-0 z-50 border-b border-white/10" style={{ background: "rgba(19,19,19,.94)", backdropFilter: "blur(14px)" }}>
        <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
          <div className="flex items-center gap-3">
            <a href="https://www.zivel.com" aria-label="Zivel home"><Image src="/images/brand/zivel-logo.png" alt="Zivel" width={82} height={28} className="h-6 w-auto" /></a>
            <span className="text-white/25">×</span>
            <div className="flex h-9 w-16 items-center justify-center overflow-hidden rounded bg-white">
              <Image src="/images/ads/fanx-logo.png" alt="FanX" width={70} height={70} className="h-14 w-14 object-contain" priority />
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a href={PHONE_TEL} className="hidden text-sm text-white/70 transition-opacity hover:opacity-70 sm:block">{PHONE}</a>
            <a href="#claim" className="rounded-full px-4 py-2.5 text-xs font-bold uppercase tracking-[.16em] text-white transition-transform hover:scale-[1.03]" style={{ background: "#8C1F7A" }}>Claim $5 visit</a>
          </div>
        </div>
      </header>

      <main>
        <section className="relative isolate min-h-[720px] overflow-hidden sm:min-h-[800px]">
          <Image src="/images/ads/fanx-red-carpet.jpg" alt="A red carpet premiere under purple lights" fill priority sizes="(max-width: 768px) 100vw, 55vw" className="object-cover object-[66%_center] sm:object-[right_center]" />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#131313_0%,#131313e8_35%,#13131355_65%,#13131322_100%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(0deg,#131313 0%,transparent 26%)]" />
          <div className="relative mx-auto flex min-h-[720px] max-w-7xl flex-col justify-center px-5 py-16 sm:min-h-[800px] sm:px-10 lg:px-16">
            <div className="max-w-[650px] animate-[fanxRise_.7s_ease-out_both]">
              <div className="mb-8 flex items-center gap-4">
                <span className="rounded-sm px-3 py-1.5 text-[11px] font-bold uppercase tracking-[.22em] text-white" style={{ background: "#5D008C" }}>Official Sponsor</span>
                <span className="h-px w-16 bg-[#8C1F7A]" />
                <span className="text-xs font-semibold uppercase tracking-[.2em] text-white/60">Zivel Riverton</span>
              </div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[.28em] text-[#d68bd1]">Your post-convention premiere</p>
              <h1 className="font-black uppercase leading-[.82] tracking-[-.025em] text-white" style={{ fontFamily: "var(--font-fanx-display)", fontSize: "clamp(4.6rem, 13vw, 9.8rem)" }}>
                Recover<br /><span style={{ color: "#d68bd1" }}>like</span><br />celebrities.
              </h1>
              <p className="mt-8 max-w-md text-base leading-relaxed text-white/75 sm:text-lg">You walked the floor. You met your heroes. Now take the red carpet to recovery.</p>
              <div className="mt-9 flex flex-col gap-3 xs:flex-row sm:flex-row">
                <a href="#claim" className="rounded-full px-7 py-4 text-center text-sm font-bold uppercase tracking-[.16em] text-white shadow-lg transition-transform hover:scale-[1.03]" style={{ background: "#8C1F7A" }}>Get the $5 first visit</a>
                <a href={PHONE_TEL} className="rounded-full border border-white/30 px-7 py-4 text-center text-sm font-bold uppercase tracking-[.16em] text-white transition-colors hover:bg-white/10">Call {PHONE}</a>
              </div>
            </div>
            <div className="absolute bottom-7 right-5 hidden max-w-[240px] border-l border-[#d68bd1] pl-4 text-xs uppercase leading-relaxed tracking-[.18em] text-white/55 lg:block">The spotlight is yours.<br /><span className="text-white">Your body deserves the encore.</span></div>
          </div>
        </section>

        <section className="relative overflow-hidden py-16 sm:py-24" style={{ background: "#5D008C" }}>
          <div className="pointer-events-none absolute -right-16 -top-20 h-64 w-64 rounded-full border-[40px] border-white/10" />
          <div className="mx-auto grid max-w-7xl items-end gap-10 px-5 sm:px-10 lg:grid-cols-[1fr_1.4fr] lg:px-16">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#f0b9ea]">The FanX exclusive</p><h2 className="font-black uppercase leading-[.86] tracking-tight text-white" style={{ fontFamily: "var(--font-fanx-display)", fontSize: "clamp(3.6rem, 8vw, 7.2rem)" }}>Your<br />encore<br />starts here.</h2></div>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="border-t border-white/30 pt-5"><p className="font-black text-5xl text-white" style={{ fontFamily: "var(--font-fanx-display)" }}>30% OFF</p><p className="mt-2 text-sm leading-relaxed text-white/70">Any wellness service for new Zivel clients. Choose your own headliner.</p></div>
              <div className="border-t border-[#f0b9ea] pt-5"><p className="font-black text-5xl text-[#f0b9ea]" style={{ fontFamily: "var(--font-fanx-display)" }}>$5</p><p className="mt-2 text-sm leading-relaxed text-white/70">Your first visit. No velvet rope, no mystery. Just a better way to feel after FanX.</p></div>
            </div>
          </div>
        </section>

        <section className="bg-[#f5edf5] py-16 text-[#131313] sm:py-24">
          <div className="mx-auto max-w-7xl px-5 sm:px-10 lg:px-16">
            <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="mb-2 text-xs font-bold uppercase tracking-[.25em] text-[#8C1F7A]">Choose your scene</p><h2 className="font-black uppercase leading-none tracking-tight" style={{ fontFamily: "var(--font-fanx-display)", fontSize: "clamp(3rem, 7vw, 5.8rem)" }}>The recovery<br />lineup.</h2></div><p className="max-w-xs text-sm leading-relaxed text-black/60">Premium tools for the days when standing in line feels like an endurance sport.</p></div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
              {services.map(([name, desc]) => <article key={name} className="border-t-2 border-[#8C1F7A] pt-4"><h3 className="text-base font-bold leading-tight">{name}</h3><p className="mt-2 text-xs leading-relaxed text-black/55">{desc}</p></article>)}
            </div>
          </div>
        </section>

        <section id="claim" className="scroll-mt-[68px] px-5 py-16 sm:px-10 sm:py-24 lg:px-16" style={{ background: "#131313" }}>
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[1fr_440px] lg:gap-20">
            <div><p className="mb-3 text-xs font-bold uppercase tracking-[.25em] text-[#d68bd1]">Reserved for new clients</p><h2 className="font-black uppercase leading-[.88] tracking-tight text-white" style={{ fontFamily: "var(--font-fanx-display)", fontSize: "clamp(3.8rem, 8vw, 7rem)" }}>Step onto<br /><span className="text-[#d68bd1]">your</span> red<br />carpet.</h2><p className="mt-7 max-w-md text-base leading-relaxed text-white/60">Leave your details and our Riverton team will call to arrange your first visit. Your FanX offer is waiting backstage.</p><div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-xs font-bold uppercase tracking-[.14em] text-white/50"><span>Riverton, Utah</span><a href={PHONE_TEL} className="text-[#d68bd1] hover:opacity-70">{PHONE}</a></div></div>
            <div className="rounded-2xl border border-white/10 p-6 sm:p-8" style={{ background: "linear-gradient(145deg,#241029,#181318)" }}><p className="mb-1 text-xs font-bold uppercase tracking-[.2em] text-[#d68bd1]">Claim your premiere access</p><p className="mb-7 text-sm text-white/45">30% off any service + first visit for $5.</p><AdsLeadForm redirectUrl="/ads/fanx-thank-you" source="FanX Google Ads" formNote="New clients only · Your information stays private." /></div>
          </div>
        </section>
      </main>
      <footer className="border-t border-white/10 bg-[#0d0d0d]"><div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-5 py-8 sm:flex-row sm:px-10 lg:px-16"><Image src="/images/brand/zivel-logo.png" alt="Zivel" width={75} height={25} className="h-5 w-auto opacity-60" /><p className="text-center text-[10px] font-bold uppercase tracking-[.2em] text-white/35">Official Sponsor · FanX Salt Lake · Zivel Riverton</p><a href="https://www.zivel.com/privacy-policy" className="text-xs text-white/35 underline hover:text-white">Privacy Policy</a></div></footer>
      <style>{`@keyframes fanxRise{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}`}</style>
    </div>
  );
}