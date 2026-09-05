import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Request Received | Zivel × American Top Team Sandy Springs",
  description: "Your Zivel recovery information request has been received.",
  robots: { index: false, follow: false },
};

export default function AmericanTopTeamThankYou() {
  return (
    <main className="min-h-screen bg-[#07101d] relative overflow-hidden flex items-center">
      <style>{`
        .ty-display{font-family:var(--font-att),sans-serif}.ty-wrap{width:min(900px,calc(100% - 40px));margin:auto}.ty-grid{display:grid;grid-template-columns:1fr 1fr;align-items:center;gap:70px}.ty-circle{position:absolute;width:620px;height:620px;border:1px solid rgba(0,87,225,.28);border-radius:50%;right:-210px;top:-180px}.ty-circle:after{content:"";position:absolute;inset:45px;border:1px solid rgba(201,154,59,.22);border-radius:50%}.ty-kicker{font:800 11px var(--font-att);letter-spacing:.2em;text-transform:uppercase;color:#c99a3b}.ty-h1{font:900 clamp(3rem,7vw,6.6rem)/.9 var(--font-att);letter-spacing:-.07em;text-transform:uppercase;margin:18px 0 22px}.ty-copy{color:rgba(255,255,255,.67);line-height:1.65;font-size:17px}.ty-box{border-left:4px solid #ff4040;padding:24px 0 24px 24px;background:rgba(255,255,255,.045)}.ty-link{display:inline-flex;min-height:48px;align-items:center;padding:0 22px;background:#c99a3b;color:#111;text-decoration:none;font:800 11px var(--font-att);letter-spacing:.15em;text-transform:uppercase;transition:transform .2s,background .2s}.ty-link:hover,.ty-link:focus-visible{background:#d9ad58;transform:translateY(-2px)}@media(max-width:700px){.ty-grid{grid-template-columns:1fr;gap:42px}.ty-wrap{width:min(100% - 32px,550px)}.ty-circle{width:420px;height:420px;right:-250px;top:-190px}.ty-h1{font-size:clamp(3.1rem,16vw,5.2rem)}}
      `}</style>
      <div className="ty-circle" aria-hidden="true" />
      <div className="ty-wrap ty-grid relative z-10 py-20">
        <div>
          <div className="flex items-center gap-3 mb-12"><Link href="/locations/georgia/buckhead" aria-label="Visit the Zivel Buckhead location page"><Image src="/images/brand/zivel-logo.png" alt="Zivel" width={90} height={30} style={{ width: "auto", height: "auto" }} /></Link><span className="text-white/25 text-2xl">×</span><a href="https://www.attsandysprings.com/" aria-label="Visit American Top Team Sandy Springs"><Image src="/images/ads/american-top-team-logo.png" alt="American Top Team" width={51} height={52} /></a></div>
          <p className="ty-kicker">Request received</p>
          <h1 className="ty-h1">You’re<br /><span className="text-[#ff4040]">in the work.</span></h1>
          <p className="ty-copy max-w-md">Thanks for reaching out about the Zivel Buckhead and American Top Team Sandy Springs partnership. A member of the team will follow up with the current details.</p>
        </div>
        <div className="ty-box">
          <p className="ty-kicker mb-3">While you wait</p>
          <p className="text-xl font-bold leading-snug mb-8">Explore the studio built for recovery in Buckhead.</p>
          <div className="flex flex-col items-start gap-3"><Link className="ty-link" href="/locations/georgia/buckhead">Visit Zivel Buckhead</Link><a className="text-[#c99a3b] hover:text-white transition-colors text-sm underline underline-offset-4" href="tel:+14043095954">Call (404) 309-5954</a></div>
        </div>
      </div>
    </main>
  );
}