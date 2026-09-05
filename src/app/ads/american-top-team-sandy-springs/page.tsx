import type { Metadata } from "next";
import Image from "next/image";
import AdsLeadForm from "../_shared/AdsLeadForm";

export const metadata: Metadata = {
  title: "Recovery Built for the Work | Zivel × American Top Team Sandy Springs",
  description: "Performance recovery for the people who train at American Top Team Sandy Springs.",
  robots: { index: false, follow: false },
};

const PHONE = "(404) 309-5954";
const TEL = "tel:+14043095954";
const SOURCE = "American Top Team Sandy Springs Google Ads";
const SERVICES = ["Cryotherapy", "Red Light Therapy", "Infrared Sauna", "Compression Therapy", "I'm not sure yet"];

export default function AmericanTopTeamPage() {
  return (
    <div className="att-page">
      <style>{`
        .att-page { --red:#ff4040; --blue:#0057e1; --gold:#c99a3b; --ink:#07101d; --cream:#f4f1ea; background:var(--ink); color:#fff; }
        .att-page * { box-sizing:border-box; }
        .att-display { font-family:var(--font-att), sans-serif; }
        .att-top { position:sticky; top:0; z-index:20; background:rgba(7,16,29,.9); backdrop-filter:blur(16px); border-bottom:1px solid rgba(255,255,255,.12); }
        .att-wrap { width:min(1180px, calc(100% - 40px)); margin:auto; }
        .att-nav { height:76px; display:flex; align-items:center; justify-content:space-between; gap:20px; }
        .att-lockup { display:flex; align-items:center; gap:12px; }
        .att-lockup img { object-fit:contain; }
        .att-divider { width:1px; height:28px; background:rgba(255,255,255,.25); }
        .att-kicker { color:var(--gold); font:800 11px var(--font-att); text-transform:uppercase; letter-spacing:.2em; }
        .att-button { display:inline-flex; align-items:center; justify-content:center; min-height:48px; padding:0 23px; background:var(--red); color:#fff; font:800 11px var(--font-att); letter-spacing:.16em; text-transform:uppercase; text-decoration:none; transition:transform .2s,background .2s,box-shadow .2s; }
        .att-button:hover,.att-button:focus-visible { background:#ff5b5b; transform:translateY(-2px); box-shadow:0 10px 25px rgba(255,64,64,.22); }
        .att-button.gold { background:var(--gold); color:#10100e; }
        .att-button.gold:hover,.att-button.gold:focus-visible { background:#d9ad58; }
        .att-hero { min-height:calc(100svh - 76px); position:relative; display:flex; align-items:center; overflow:hidden; }
        .att-hero-image { position:absolute; inset:0 0 0 42%; }
        .att-hero-image img { object-fit:cover; object-position:center; }
        .att-hero:after { content:""; position:absolute; inset:0; background:linear-gradient(90deg,var(--ink) 0%,rgba(7,16,29,.97) 28%,rgba(7,16,29,.55) 56%,rgba(7,16,29,.08) 100%); pointer-events:none; }
        .att-hero-content { position:relative; z-index:1; padding:70px 0 90px; width:58%; }
        .att-eyebrow { display:inline-flex; align-items:center; gap:10px; color:#fff; font:800 11px var(--font-att); letter-spacing:.18em; text-transform:uppercase; }
        .att-eyebrow:before { content:""; width:34px; height:3px; background:var(--red); }
        .att-h1 { margin:20px 0 22px; max-width:700px; font:900 clamp(3.35rem,7.2vw,7.4rem)/.91 var(--font-att); letter-spacing:-.07em; text-transform:uppercase; }
        .att-h1 em { color:var(--gold); font-style:normal; }
        .att-lede { max-width:510px; color:rgba(255,255,255,.72); font-size:18px; line-height:1.6; }
        .att-actions { display:flex; flex-wrap:wrap; gap:12px; margin-top:34px; }
        .att-call { display:inline-flex; align-items:center; color:#fff; text-decoration:none; font-weight:700; padding:0 16px; min-height:48px; border:1px solid rgba(255,255,255,.28); transition:border-color .2s,color .2s; }
        .att-call:hover,.att-call:focus-visible { color:var(--gold); border-color:var(--gold); }
        .att-hero-mark { position:absolute; right:40px; bottom:35px; z-index:2; width:100px; height:auto; opacity:.82; filter:drop-shadow(0 8px 22px rgba(0,0,0,.35)); }
        .att-ticker { background:var(--red); color:#fff; overflow:hidden; border-top:1px solid rgba(255,255,255,.2); border-bottom:1px solid rgba(0,0,0,.35); }
        .att-ticker-inner { min-height:54px; display:flex; align-items:center; justify-content:space-between; gap:24px; font:800 11px var(--font-att); letter-spacing:.2em; text-transform:uppercase; }
        .att-ticker span:nth-child(2) { color:#ffd0d0; }
        .att-light { background:var(--cream); color:var(--ink); padding:100px 0; }
        .att-section-grid { display:grid; grid-template-columns:1.05fr .95fr; gap:90px; align-items:center; }
        .att-h2 { margin:12px 0 20px; font:900 clamp(2.4rem,4.7vw,4.9rem)/.95 var(--font-att); letter-spacing:-.065em; text-transform:uppercase; }
        .att-copy { color:#45505a; font-size:17px; line-height:1.65; max-width:540px; }
        .att-proof { border-left:4px solid var(--blue); margin-top:34px; padding:4px 0 4px 20px; font:800 15px/1.5 var(--font-att); text-transform:uppercase; letter-spacing:.04em; }
        .att-service-list { display:grid; grid-template-columns:1fr 1fr; border-top:1px solid #c9c8c2; }
        .att-service { padding:21px 14px 21px 0; border-bottom:1px solid #c9c8c2; font:800 13px var(--font-att); text-transform:uppercase; letter-spacing:.08em; }
        .att-service:before { content:"+"; color:var(--red); margin-right:10px; }
        .att-dark { background:#0b1727; padding:100px 0; position:relative; overflow:hidden; }
        .att-dark:before { content:""; position:absolute; width:400px; height:400px; right:-180px; top:-180px; border:1px solid rgba(0,87,225,.4); transform:rotate(45deg); }
        .att-form-grid { display:grid; grid-template-columns:1fr 390px; gap:72px; align-items:start; }
        .att-form-card { padding:30px; background:#101f31; border-top:3px solid var(--gold); box-shadow:0 20px 60px rgba(0,0,0,.22); }
        .att-form-card :global(form) { margin-top:18px; }
        .att-form-title { font:900 27px/1.05 var(--font-att); text-transform:uppercase; letter-spacing:-.04em; }
        .att-form-sub { color:rgba(255,255,255,.58); font-size:14px; line-height:1.5; margin:10px 0 22px; }
        .att-footer { padding:30px 0; background:#050b13; border-top:1px solid rgba(255,255,255,.1); }
        .att-footer-row { display:flex; align-items:center; justify-content:space-between; gap:20px; color:rgba(255,255,255,.45); font-size:12px; }
        .att-footer a { color:var(--gold); text-underline-offset:4px; }
        @media (max-width:800px) {
          .att-wrap { width:min(100% - 32px, 600px); }
          .att-nav { height:68px; }
          .att-nav .att-phone { display:none; }
          .att-nav .att-button { min-height:40px; padding:0 14px; font-size:10px; }
          .att-hero { min-height:720px; align-items:flex-end; }
          .att-hero-image { inset:0; opacity:.62; }
          .att-hero:after { background:linear-gradient(180deg,rgba(7,16,29,.28) 0%,rgba(7,16,29,.7) 38%,var(--ink) 78%); }
          .att-hero-content { width:100%; padding:70px 0 60px; }
          .att-h1 { font-size:clamp(3.2rem,16vw,6rem); }
          .att-lede { font-size:16px; }
          .att-hero-mark { width:70px; right:18px; bottom:20px; }
          .att-ticker-inner { min-height:46px; font-size:9px; letter-spacing:.12em; }
          .att-ticker-inner span:nth-child(2) { display:none; }
          .att-light,.att-dark { padding:70px 0; }
          .att-section-grid,.att-form-grid { grid-template-columns:1fr; gap:42px; }
          .att-h2 { font-size:clamp(2.5rem,12vw,4rem); }
          .att-form-card { padding:24px 20px; }
          .att-footer-row { align-items:flex-start; flex-direction:column; }
        }
      `}</style>

      <header className="att-top">
        <div className="att-wrap att-nav">
          <div className="att-lockup">
            <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={74} height={24} style={{ width: "auto", height: "auto" }} />
            <span className="att-divider" aria-hidden="true" />
            <Image src="/images/ads/american-top-team-logo.png" alt="American Top Team Sandy Springs" width={43} height={43} style={{ width: "auto", height: "auto" }} />
            <span className="att-kicker hidden sm:inline">Official recovery partner</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="att-phone text-sm text-white/70 hover:text-white transition-colors" href={TEL}>{PHONE}</a>
            <a className="att-button gold" href="#request">Get recovery info</a>
          </div>
        </div>
      </header>

      <main>
        <section className="att-hero">
          <div className="att-hero-image"><Image src="/images/ads/american-top-team-athletes.jpg" alt="Two MMA athletes standing ready in a training space" fill priority sizes="(max-width: 800px) 100vw, 58vw" /></div>
          <div className="att-wrap">
            <div className="att-hero-content">
              <p className="att-eyebrow">Zivel Buckhead × ATT Sandy Springs</p>
              <h1 className="att-h1 att-display">Train hard.<br /><em>Recover smart.</em></h1>
              <p className="att-lede">The work does not stop when class ends. Discover performance-recovery services designed for serious training, demanding schedules, and the people who show up anyway.</p>
              <div className="att-actions">
                <a className="att-button" href="#request">Request partnership details</a>
                <a className="att-call" href={TEL}>Call {PHONE}</a>
              </div>
            </div>
          </div>
          <Image className="att-hero-mark" src="/images/ads/american-top-team-logo.png" alt="" width={100} height={100} aria-hidden="true" />
        </section>

        <div className="att-ticker"><div className="att-wrap att-ticker-inner"><span>Recovery is part of the discipline</span><span>Strength · consistency · longevity</span><span>Built for the next round</span></div></div>

        <section className="att-light">
          <div className="att-wrap att-section-grid">
            <div>
              <p className="att-kicker" style={{ color: "#0057e1" }}>More than rest</p>
              <h2 className="att-h2 att-display">Keep your edge<br />between sessions.</h2>
              <p className="att-copy">Hard training asks a lot from your body. Zivel pairs focused recovery services with a calm, professional studio environment so you can take care of the work behind the work.</p>
              <p className="att-proof">For fighters, coaches, and gym members who take their output seriously.</p>
            </div>
            <div className="att-service-list" aria-label="Recovery service categories">
              {SERVICES.slice(0, 4).map((service) => <div className="att-service" key={service}>{service}</div>)}
              <div className="att-service">Performance support</div><div className="att-service">Guided consultation</div>
            </div>
          </div>
        </section>

        <section id="request" className="att-dark">
          <div className="att-wrap att-form-grid">
            <div>
              <p className="att-kicker">Start the conversation</p>
              <h2 className="att-h2 att-display">Your recovery<br /><span style={{ color: "#ff4040" }}>has a home.</span></h2>
              <p className="att-lede">Leave your details and the Zivel Buckhead team will follow up with current partnership information. Offer details will be shared directly as they become available.</p>
              <div className="mt-8 flex flex-col gap-3 text-sm text-white/60">
                <span><strong className="text-white">Zivel Buckhead</strong> · Atlanta, Georgia</span>
                <a className="text-[#c99a3b] underline underline-offset-4 hover:text-white transition-colors" href="/locations/georgia/buckhead">Explore the Buckhead studio</a>
              </div>
            </div>
            <div className="att-form-card">
              <p className="att-form-title att-display">Request details</p>
              <p className="att-form-sub">Tell us how to reach you. No pricing or promotion is required to get started.</p>
              <AdsLeadForm redirectUrl="/ads/american-top-team-sandy-springs-thank-you" source={SOURCE} serviceOptions={SERVICES} formNote="We’ll follow up with the partnership details." />
            </div>
          </div>
        </section>
      </main>

      <footer className="att-footer"><div className="att-wrap att-footer-row"><span>© {new Date().getFullYear()} Zivel · American Top Team Sandy Springs</span><span><a href={TEL}>{PHONE}</a> · <a href="https://www.zivel.com/privacy-policy">Privacy</a></span></div></footer>
    </div>
  );
}