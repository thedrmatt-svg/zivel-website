import Link from "next/link";
import LocationBookingLink from "@/components/location/LocationBookingLink";
import LocationStatusLine from "@/components/location/LocationStatusLine";
import { phoneHref } from "@/lib/contact-links";
import { getLocationBookingAction } from "@/lib/location-booking";
import type { Location } from "@/types/location";
import type { ComponentProps } from "react";
import styles from "./HollywoodHolidayHero.module.css";

type Props = {
  location: Location;
  statusProps?: ComponentProps<typeof LocationStatusLine>;
};

export default function HollywoodLocationInfo({ location, statusProps }: Props) {
  const booking = getLocationBookingAction(location);
  const phone = location.contact?.phone;
  const mapsUrl = statusProps?.mapsUrl;
  const pricingHref = `/locations/${location.stateSlug}/${location.citySlug}/pricing`;

  return (
    <section className={styles.locationInfo} aria-labelledby="location-info-title">
      <div className={styles.locationInfoInner}>
        <div className={styles.locationDetails}>
          <p className={styles.locationEyebrow}>Hollywood, Florida</p>
          <h2 id="location-info-title">{location.name}</h2>
          {location.contact?.address && (
            <p className={styles.locationAddress}>{location.contact.address}</p>
          )}
          {phone && (
            <a className={styles.locationPhone} href={phoneHref(phone)}>
              Call {phone}
            </a>
          )}
          {statusProps && (
            <div className={styles.locationStatus}>
              <span className={styles.statusDot} aria-hidden="true" />
              <LocationStatusLine {...statusProps} phone={undefined} mapsUrl={null} />
            </div>
          )}
        </div>

        <div className={styles.locationActions} data-location-hero-actions="">
          {booking && (
            <LocationBookingLink
              state={location.stateSlug}
              city={location.citySlug}
              href={booking.href}
              target={booking.external ? "_blank" : undefined}
              rel={booking.external ? "noopener noreferrer" : undefined}
              className={styles.bookButton}
            >
              {booking.label}
            </LocationBookingLink>
          )}
          <nav className={styles.secondaryLinks} aria-label="Hollywood studio links">
            <Link href={pricingHref}>Pricing</Link>
            {mapsUrl && (
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Directions
              </a>
            )}
          </nav>
        </div>
      </div>
    </section>
  );
}
