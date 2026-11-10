import Image from "next/image";
import Link from "next/link";
import { phoneHref } from "@/lib/contact-links";
import LocationBookingLink from "@/components/location/LocationBookingLink";
import LocationStatusLine from "@/components/location/LocationStatusLine";
import HolidayOfferCards from "./HolidayOfferCards";
import { getHolidayOffers } from "./holiday-offers";
import type { LocationBookingAction } from "@/lib/location-booking";
import type { LocationEnhancementCopy } from "@/lib/location-enhancement-copy";
import type { Location } from "@/types/location";
import styles from "./HolidayLocation.module.css";

type Props = {
  location: Location;
  bookingAction: LocationBookingAction | null;
  mapsUrl: string | null;
  locale: string;
  zone: string | null;
  copy: LocationEnhancementCopy;
};

const flakes = Array.from({ length: 16 }, (_, index) => index);

export default function HolidayLocationHero({
  location,
  bookingAction,
  mapsUrl,
  locale,
  zone,
  copy,
}: Props) {
  const pricingHref = `/locations/${location.stateSlug}/${location.citySlug}/pricing`;
  const studioName = location.name.replace(/^Zivel\s+/i, "");
  const mapsHref = mapsUrl ?? null;

  return (
    <>
      <section className={styles.hero} aria-labelledby="location-hero-title">
        <div className={styles.snowfall} aria-hidden="true">
          {flakes.map((flake) => <span className={styles.snowflake} key={flake} />)}
        </div>
        <div className={styles.bow} aria-hidden="true">
          <Image src="/images/mock/holiday-bow-transparent.png" alt="" width={370} height={285} priority />
        </div>
        <div className={styles.heroContent}>
          <header className={styles.heading}>
            <p className={styles.studioLabel}>{location.name}, {location.state}</p>
            <h1 id="location-hero-title">Holiday Offers</h1>
            <div className={styles.rule} aria-hidden="true"><span /></div>
          </header>
          <HolidayOfferCards variant="hero" offers={getHolidayOffers(location.stateSlug, location.citySlug)} />
        </div>
      </section>

      <section className={styles.locationInfo} aria-labelledby="location-info-title">
        <div className={styles.infoInner}>
          <div className={styles.locationDetails}>
            <p className={styles.locationEyebrow}>{studioName}, {location.state}</p>
            <h2 id="location-info-title">{location.name}</h2>
            <p className={styles.seasonalMessage}>
              Make room for recovery this holiday season. Taking time to rest and
              recharge is part of caring for yourself—and showing up for the people
              you love.
            </p>
            {location.contact?.address && (
              <p className={styles.locationAddress}>{location.contact.address}</p>
            )}
            {location.contact?.phone && (
              <a className={styles.locationPhone} href={phoneHref(location.contact.phone)}>
                Call {location.contact.phone}
              </a>
            )}
            {location.hours && (
              <div className={styles.locationStatus}>
                <span className={styles.statusDot} aria-hidden="true" />
                <LocationStatusLine
                  hours={location.hours}
                  zone={zone}
                  phone={undefined}
                  mapsUrl={null}
                  locale={locale}
                  copy={copy}
                />
              </div>
            )}
          </div>
          <div className={styles.locationActions} data-location-hero-actions="">
            {bookingAction && (
              <LocationBookingLink
                state={location.stateSlug}
                city={location.citySlug}
                href={bookingAction.href}
                target={bookingAction.external ? "_blank" : undefined}
                rel={bookingAction.external ? "noopener noreferrer" : undefined}
                className={styles.bookButton}
              >
                {bookingAction.label}
              </LocationBookingLink>
            )}
            <nav className={styles.secondaryLinks} aria-label={`${studioName} studio links`}>
              <Link href={pricingHref}>Pricing</Link>
              {mapsHref && (
                <a href={mapsHref} target="_blank" rel="noopener noreferrer">Directions</a>
              )}
            </nav>
          </div>
        </div>
      </section>
    </>
  );
}
