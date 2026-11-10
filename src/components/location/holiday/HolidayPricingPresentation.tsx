import Image from "next/image";
import styles from "./HolidayPricingPresentation.module.css";

const flakes = Array.from({ length: 16 }, (_, index) => index);

export function HolidayPricingIntro({ cityDisplay }: { cityDisplay: string }) {
  return (
    <>
      <p className="zv-tagline mb-4">Investment</p>
      <h1 className="font-serif text-4xl md:text-6xl font-light tracking-tight text-white">
        Holiday Specials, Pricing &amp; Memberships
      </h1>
      <p className="mt-4 text-lg font-semibold text-white/90 max-w-xl leading-relaxed">
        Give the gift of feeling better. And don&apos;t forget yourself.
      </p>
      <p className="mt-4 text-lg text-white/60 max-w-xl leading-relaxed">
        This holiday season, give something that truly matters—time to relax, recharge, and recover.
        Whether you&apos;re treating yourself or surprising someone you love, Zivel {cityDisplay} makes
        it easy to give the gift of recovery, relaxation, and self-care. Because feeling your best
        isn&apos;t just a gift for others. It&apos;s one you deserve, too.
      </p>
    </>
  );
}

export function HolidayPricingBow() {
  return (
    <div className={styles.bow} aria-hidden="true">
      <Image src="/images/mock/holiday-bow-transparent.png" alt="" width={370} height={285} priority />
    </div>
  );
}

export function HolidayPricingSnowfall() {
  return (
    <div className={styles.snowfall} aria-hidden="true">
      {flakes.map((flake) => <span className={styles.snowflake} key={flake} />)}
    </div>
  );
}
