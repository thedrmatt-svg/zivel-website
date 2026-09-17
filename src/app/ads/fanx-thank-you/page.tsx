import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Offer Reserved | Zivel × FanX",
  description: "Your FanX offer has been reserved at Zivel Riverton.",
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function FanXThankYouPage() {
  return (
    <main className="flex min-h-[100dvh] flex-col items-center justify-center overflow-hidden px-6 py-20 text-center" style={{ background: "radial-gradient(circle at 70% 20%,#5D008C 0%,#231025 34%,#131313 72%)" }}>
      <div className="mb-12 flex items-center gap-4"><Image src="/images/brand/zivel-logo.png" alt="Zivel" width={92} height={32} className="h-8 w-auto" /><span className="text-white/30">×</span><div className="flex h-10 w-20 items-center justify-center overflow-hidden rounded bg-white"><Image src="/images/ads/fanx-logo.png" alt="FanX" width={70} height={70} className="h-16 w-16 object-contain" /></div></div>
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-[#d68bd1] text-3xl text-[#f0b9ea]" aria-hidden="true">✓</div>
      <p className="mb-3 text-xs font-bold uppercase tracking-[.3em] text-[#d68bd1]">Official Sponsor · FanX Salt Lake</p>
      <h1 className="font-black uppercase leading-[.88] tracking-tight text-white" style={{ fontFamily: "var(--font-fanx-display)", fontSize: "clamp(3.8rem, 10vw, 7.5rem)" }}>You’re on<br /><span className="text-[#d68bd1]">the list.</span></h1>
      <p className="mt-7 max-w-md text-base leading-relaxed text-white/65">Your FanX offer is reserved. The Zivel Riverton team will be in touch shortly to schedule your first visit.</p>
      <p className="mt-3 text-sm font-semibold text-white/40">30% off any service + first visit for $5.</p>
      <a href="tel:+13854438778" className="mt-10 text-xl font-bold text-[#f0b9ea] transition-opacity hover:opacity-70">(385) 443-8778</a>
      <div className="mt-10 flex flex-col gap-3 sm:flex-row"><a href="https://www.zivel.com" className="rounded-full bg-[#8C1F7A] px-7 py-4 text-xs font-bold uppercase tracking-[.16em] text-white hover:opacity-85">Visit Zivel.com</a><a href="https://www.zivel.com/locations/utah/riverton" className="rounded-full border border-white/25 px-7 py-4 text-xs font-bold uppercase tracking-[.16em] text-white hover:bg-white/10">Riverton location</a></div>
      <p className="mt-16 text-xs text-white/25">© {new Date().getFullYear()} Zivel. All rights reserved.</p>
    </main>
  );
}