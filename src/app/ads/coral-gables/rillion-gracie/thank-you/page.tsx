import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "../campaign.module.css";

export const metadata: Metadata = {
  title: "Request Received | Zivel Coral Gables × Rilion Gracie",
  description: "Your Zivel Coral Gables recovery information request has been received.",
  robots: { index: false, follow: false },
};

const BOOKING_URL = "https://zivel.myperformanceiq.com/book-appointment?set_location=11432";
const PHONE = "(786) 527-0842";

export default function RilionGracieThankYouPage() {
  return (
    <main className={styles.thankYou}>
      <div className={styles.thankShape} aria-hidden="true" />
      <div className={`${styles.thankWrap} ${styles.thankGrid}`}>
        <div className={styles.thankMain}>
          <div className={styles.thankBrand}>
            <Link href="/locations/florida/coral-gables" aria-label="Visit Zivel Coral Gables">
              <Image src="/images/brand/zivel-logo.png" alt="Zivel" width={88} height={30} />
            </Link>
            <span className={styles.thankDivider} />
            <Image src="/images/ads/rilion-gracie-logo.png" alt="Rilion Gracie" width={120} height={38} />
          </div>
          <p className={styles.kicker}>Request received</p>
          <h1 className={styles.thankTitle}>Your next<br /><span>round starts here.</span></h1>
          <p className={styles.thankCopy}>
            Thanks for reaching out about recovery for Rilion Gracie athletes. The Zivel Coral Gables team has your request and will be in touch.
          </p>
          <p className={styles.thankAddress}>348 Minorca Ave · Coral Gables, FL 33134</p>
        </div>
        <aside className={styles.thankCard}>
          <span className={styles.kicker}>Ready when you are</span>
          <h2>Put your first visit on the calendar.</h2>
          <p>Book directly at Zivel Coral Gables. The team will still follow up with the partnership details you requested.</p>
          <div className={styles.thankActions}>
            <a className={styles.button} href={BOOKING_URL}>Book a session</a>
            <Link className={styles.thankLink} href="/locations/florida/coral-gables">View Zivel Coral Gables</Link>
            <a className={styles.thankLink} href="tel:+17865270842">Call {PHONE}</a>
          </div>
        </aside>
      </div>
    </main>
  );
}
