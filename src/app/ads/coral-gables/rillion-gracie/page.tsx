import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import AdsLeadForm from "../../_shared/AdsLeadForm";
import FighterRecoveryFaq from "./FighterRecoveryFaq";
import styles from "./campaign.module.css";

export const metadata: Metadata = {
  title: "Train. Recover. Return. | Zivel Coral Gables × Rilion Gracie",
  description:
    "A local recovery resource for Rilion Gracie jiu-jitsu athletes. Explore recovery services and connect with Zivel Coral Gables.",
  robots: { index: false, follow: false },
};

const PHONE = "(786) 527-0842";
const TEL = "tel:+17865270842";
const LOCATION_URL = "/locations/florida/coral-gables";
const SOURCE = "Coral Gables Rilion Gracie Ad";
const SERVICES = [
  "Cryotherapy",
  "Red Light Therapy",
  "Infrared Sauna",
  "Compression Therapy",
  "Float Therapy",
  "Cryo Soothe",
  "Post Fight Facial",
  "Cryo Slimming",
  "I'm not sure yet",
];
const REFERRERS = ["Rilion Gracie"];
const OFFERS = [
  "A — First recovery session free",
  "B — $49 day pass, three standard services, same day",
  "C — Fighter membership, $69 then $139",
];
const RECOVERY_SERVICES = [
  ["Cryotherapy", "/images/home/service-cryo.jpg", "A focused cold experience to complement a considered recovery routine."],
  ["Red Light Therapy", "/locations/coral-gables/services/red-light-therapy.jpg", "A restorative pause between demanding rounds and the next session."],
  ["Infrared Sauna", "/images/home/service-sauna.jpg", "Warm up, slow down, and make room for a quieter reset."],
  ["Compression Therapy", "/images/home/service-compression.jpg", "A comfortable session focused on tired legs after hard mat time."],
  ["Float Therapy", "/images/services/dry-float/hero.jpg", "Settle into a weightless, quiet break without getting wet."],
  ["Cryo Soothe", "/images/home/service-cryosoothe.avif", "A targeted cold therapy session focused on specific areas."],
  ["Post Fight Facial", "/images/home/service-facial.jpg", "A cooling facial experience after a tough sparring session."],
  ["Cryo Slimming", "/images/home/service-slimming.jpg", "A localized service option. Ask the team about suitability and details."],
];
const OFFERS_SECTION = [
  {
    label: "Start here",
    name: "First Recovery Session",
    price: "Free",
    description: "Try a recovery service before choosing what best fits your training rhythm.",
    benefits: ["One recovery session", "Choose your preferred service", "A simple first visit"],
  },
  {
    label: "One-day recovery stack",
    name: "Three-Service Day Pass",
    price: "$49",
    description: "Pair three standard recovery services in one visit after a demanding training day.",
    benefits: ["Three standard services", "Use all three on the same day", "More ways to reset in one visit"],
  },
  {
    label: "Most Popular",
    name: "Fighter Membership",
    price: "$69",
    priceDetail: "first month · then $139/month",
    description: "Make recovery part of your training schedule with 14 recovery services every month.",
    benefits: ["14 recovery services per month", "Over 20% savings", "30-day cancellation notice"],
    featured: true,
  },
];

export default function RilionGraciePage() {
  return (
    <div className={styles.page}>
      <header className={styles.topbar}>
        <div className={`${styles.wrap} ${styles.nav}`}>
          <div className={styles.brandLockup}>
            <Link href={LOCATION_URL} aria-label="Visit Zivel Coral Gables">
              <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={76} height={26} />
            </Link>
            <span className={styles.divider} aria-hidden="true" />
            <Image
              className={styles.partnerLogo}
              src="/images/ads/rilion-gracie-logo.png"
              alt="Rilion Gracie"
              width={128}
              height={40}
            />
          </div>
          <div className={styles.navActions}>
            <a className={styles.phone} href={TEL}>{PHONE}</a>
            <a className={styles.button} href="#request">Explore recovery</a>
          </div>
        </div>
      </header>

      <main>
        <section className={styles.hero}>
          <div className={styles.heroImage}>
            <Image
              src="/images/ads/coral-gables-jiu-jitsu-athlete.jpg"
              alt="Jiu-jitsu athlete in a white gi and black belt, ready for his next training session"
              fill
              priority
              sizes="(max-width: 800px) 100vw, 64vw"
            />
          </div>
          <div className={`${styles.wrap} ${styles.heroWrap}`}>
            <div className={styles.heroContent}>
              <p className={styles.eyebrow}>For the work on and off the mat</p>
              <h1 className={styles.heroTitle}>
                Train hard.<br /><em>Return ready.</em>
              </h1>
              <p className={styles.heroCopy}>
                Jiu-jitsu asks a lot of you. Build a little room for recovery between sessions with a local resource for the Rilion Gracie community.
              </p>
              <div className={styles.heroActions}>
                <a className={styles.button} href="#offers">See athlete offers</a>
                <a className={styles.outlineButton} href={TEL}>Call {PHONE}</a>
              </div>
              <div className={styles.heroNote}>
                <span className={styles.noteRule} />
                <span>Zivel Coral Gables · 348 Minorca Ave</span>
              </div>
            </div>
          </div>
          <div className={styles.heroIndex} aria-hidden="true">01 / TRAIN · RECOVER · REPEAT</div>
        </section>

        <div className={styles.marquee}>
          <div className={`${styles.wrap} ${styles.marqueeInner}`}>
            <span>Show up for the next round</span>
            <span className={styles.marqueeAccent}>The work continues between sessions</span>
            <span>Recovery belongs in the routine</span>
          </div>
        </div>

        <section className={styles.recovery}>
          <div className={styles.wrap}>
            <div className={styles.sectionHead}>
              <div>
                <p className={styles.kicker}>A serious training rhythm deserves a reset</p>
                <h2 className={styles.sectionTitle}>Make space for<br /><span>the next round.</span></h2>
              </div>
              <p className={styles.lede}>
                Find your recovery rhythm close to the academy. Explore options, ask questions, and choose what makes sense for you.
              </p>
            </div>
            <div className={styles.serviceGrid}>
              {RECOVERY_SERVICES.map(([name, image, copy], index) => (
                <article className={styles.serviceCard} key={name}>
                  <div className={styles.serviceImage}>
                    <Image
                      src={image}
                      alt={`${name} service at Zivel Coral Gables`}
                      fill
                      style={name === "Red Light Therapy" ? { objectPosition: "center top" } : undefined}
                      sizes="(max-width: 460px) 100vw, (max-width: 800px) 50vw, 25vw"
                    />
                    <span className={styles.serviceNumber}>0{index + 1}</span>
                  </div>
                  <div className={styles.serviceCopy}>
                    <h3>{name}</h3>
                    <p>{copy}</p>
                  </div>
                </article>
              ))}
            </div>
            <p className={styles.serviceDisclaimer}>Services are designed to complement—not replace—rest, training fundamentals, or care from a qualified health professional.</p>
          </div>
        </section>

        <section className={styles.trainingNote}>
          <div className={`${styles.wrap} ${styles.trainingGrid}`}>
            <div className={styles.trainingMark} aria-hidden="true">02</div>
            <div>
              <p className={styles.kicker}>Jiu-jitsu is a long game</p>
              <h2 className={styles.trainingTitle}>Respect the rounds.<br /><span>Respect the reset.</span></h2>
            </div>
            <p className={styles.trainingCopy}>
              From drilling to sparring, the mat keeps calling. A thoughtful recovery routine can be one more way to take care of the athlete who keeps answering.
            </p>
          </div>
        </section>

        <section id="offers" className={styles.offers} aria-labelledby="offers-heading">
          <div className={styles.wrap}>
            <div className={styles.offersHead}>
              <p className={styles.kicker}>A place to start</p>
              <h2 id="offers-heading" className={styles.sectionTitle}>Pick your pace.<br /><span>Keep your focus.</span></h2>
              <p className={styles.lede}>Start with a session, build a day around three services, or make monthly recovery part of your routine.</p>
            </div>
            <div className={styles.offerGrid}>
              {OFFERS_SECTION.map((offer, index) => (
                <article className={`${styles.offerCard} ${offer.featured ? styles.featured : ""}`} key={offer.name}>
                  <span className={styles.offerIndex}>OPTION 0{index + 1}</span>
                  <span className={styles.offerLabel}>{offer.label}</span>
                  <h3>{offer.name}</h3>
                  <p className={styles.offerPrice}>{offer.price}</p>
                  <p className={styles.offerPriceDetail}>{offer.priceDetail ?? "\u00a0"}</p>
                  <p className={styles.offerDescription}>{offer.description}</p>
                  {offer.featured && <strong className={styles.savings}>Save over 20% with 14 recovery services per month</strong>}
                  <ul className={styles.offerBenefits}>{offer.benefits.map((benefit) => <li key={benefit}>{benefit}</li>)}</ul>
                  <a className={styles.offerButton} href="#request">Ask about this offer</a>
                </article>
              ))}
            </div>
            <p className={styles.offerFineprint}>Ask the Coral Gables team for current eligibility and offer details when they follow up.</p>
          </div>
        </section>

        <FighterRecoveryFaq />

        <section className={styles.locationSection}>
          <div className={`${styles.wrap} ${styles.locationGrid}`}>
            <div className={styles.locationIntro}>
              <p className={styles.kicker}>Right here in Coral Gables</p>
              <h2 className={styles.sectionTitle}>A local stop<br /><span>between sessions.</span></h2>
              <p className={styles.gymDistance}>About 12 minutes from the gym.</p>
            </div>
            <div className={styles.locationContent}>
              <div className={styles.mapPanel}>
                <iframe
                  className={styles.locationMap}
                  src="https://maps.google.com/maps?q=Zivel%20Coral%20Gables%20348%20Minorca%20Ave%20Coral%20Gables%20FL%2033134&output=embed"
                  title="Map showing Zivel Coral Gables at 348 Minorca Ave, Coral Gables, Florida"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className={styles.mapActions}>
                  <p className={styles.driveQualifier}>Drive time varies with traffic.</p>
                  <a
                    className={styles.directionsButton}
                    href="https://www.google.com/maps/dir/?api=1&origin=Rilion+Gracie+Miami&destination=Zivel+Coral+Gables%2C+348+Minorca+Ave%2C+Coral+Gables%2C+FL+33134&travelmode=driving"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Get directions on Google Maps
                    <span aria-hidden="true">↗</span>
                  </a>
                </div>
              </div>
              <div className={styles.locationCard}>
                <span className={styles.locationPin} aria-hidden="true" />
                <p className={styles.locationName}>Zivel Coral Gables</p>
                <address>348 Minorca Ave<br />Coral Gables, FL 33134</address>
                <div className={styles.locationLinks}>
                  <Link href={LOCATION_URL}>Studio details</Link>
                  <a href={TEL}>{PHONE}</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="request" className={styles.request}>
          <div className={`${styles.wrap} ${styles.requestGrid}`}>
            <div className={styles.requestIntro}>
              <p className={styles.kicker}>Start the conversation</p>
              <h2 className={styles.sectionTitle}>Make recovery<br /><span>part of your game.</span></h2>
              <p className={styles.lede}>Tell us what you’re looking for. The Zivel Coral Gables team will follow up with details for Rilion Gracie athletes.</p>
              <div className={styles.requestAddress}>
                <strong>Zivel Coral Gables</strong>
                <span>348 Minorca Ave, Coral Gables, FL 33134</span>
                <a href={TEL}>{PHONE}</a>
              </div>
              <Link className={styles.locationTextLink} href={LOCATION_URL}>Explore the Coral Gables studio</Link>
            </div>
            <div className={styles.formCard}>
              <p className={styles.formEyebrow}>Tell us what works for you</p>
              <h3>Request details</h3>
              <p className={styles.formSub}>Share a few details and we’ll be in touch about the options.</p>
              <AdsLeadForm
                redirectUrl="/ads/coral-gables/rillion-gracie/thank-you"
                source={SOURCE}
                serviceOptions={SERVICES}
                referralOptions={REFERRERS}
                offerOptions={OFFERS}
                formNote="We’ll follow up with the partnership details."
                phonePlaceholder="(786) 555-0123"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className={`${styles.wrap} ${styles.footerRow}`}>
          <span>© {new Date().getFullYear()} Zivel Coral Gables</span>
          <span><a href={TEL}>{PHONE}</a><span aria-hidden="true"> · </span><Link href="/privacy-policy">Privacy</Link></span>
        </div>
      </footer>
    </div>
  );
}
