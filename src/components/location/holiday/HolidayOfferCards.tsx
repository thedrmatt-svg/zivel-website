import Image from "next/image";
import {
  HOLIDAY_OFFER_DISCLAIMER,
  type HolidayOffer,
} from "./holiday-offers";
import styles from "./HolidayOfferCards.module.css";

export type HolidayOfferCardsProps = {
  variant?: "hero" | "pricing";
  offers: readonly HolidayOffer[];
};

export default function HolidayOfferCards({
  variant = "hero",
  offers,
}: HolidayOfferCardsProps) {
  const gridClass = offers.length === 1 ? styles.offersSingle
    : offers.length === 2 ? `${styles.offers} ${styles.offersPair}` : styles.offers;

  return (
    <section className={styles.offerSection} data-variant={variant} aria-label="Holiday offers">
      <div className={gridClass}>
        {offers.map((offer, index) => (
          <article
            className={styles.card}
            key={offer.id}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className={styles.photo}>
              <Image
                src={offer.image}
                alt={offer.imageAlt}
                width={800}
                height={410}
                sizes="(max-width: 700px) 100vw, (max-width: 1080px) 33vw, 390px"
                className={styles.photoImage}
              />
              <div className={styles.photoShade} aria-hidden="true" />
            </div>
            <div className={styles.cardContent}>
              <h2 className={styles.offerTitle}>{offer.title}</h2>
              {offer.price && <div className={styles.price}>{offer.price}</div>}
              {offer.description && <p className={styles.description}>{offer.description}</p>}
              <a
                href={offer.purchaseUrl}
                target={offer.purchaseUrl.startsWith("/") ? undefined : "_blank"}
                rel={offer.purchaseUrl.startsWith("/") ? undefined : "noopener noreferrer"}
                className={styles.action}
              >
                {offer.action}<span aria-hidden="true">›</span>
              </a>
            </div>
          </article>
        ))}
      </div>
      <p className={styles.disclaimer}>{HOLIDAY_OFFER_DISCLAIMER}</p>
    </section>
  );
}
