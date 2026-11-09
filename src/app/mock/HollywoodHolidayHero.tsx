import Image from "next/image";
import Link from "next/link";
import styles from "./HollywoodHolidayHero.module.css";

const pricingHref = "/locations/florida/hollywood/pricing";

const offers = [
  {
    image: "/images/mock/holiday-facial.jpg",
    imageAlt: "A facial treatment in progress",
    title: "BOGO FACIALS",
    price: "$150",
    detail: "Buy One, Get One",
    action: "Buy Facials",
  },
  {
    image: "/images/mock/holiday-recovery.jpg",
    imageAlt: "A guest enjoying red light recovery therapy",
    title: "6 or 8 RECOVERY SESSIONS",
    price: "$99",
    detail: "One Month",
    action: "Shop Recovery Packs",
  },
  {
    image: "/images/mock/holiday-sauna.jpg",
    imageAlt: "A guest relaxing in a warm recovery sauna",
    title: "STOCKING STUFFERS",
    price: "$10",
    detail: "Recovery Sessions",
    action: "Member Deals",
    membersOnly: true,
  },
];

export default function HollywoodHolidayHero() {
  return (
    <section className={styles.hero} aria-labelledby="location-hero-title">
      <div className={styles.bow} aria-hidden="true">
        <Image src="/images/mock/holiday-bow.jpg" alt="" width={370} height={285} priority />
      </div>
      <div className={styles.evergreen} aria-hidden="true">
        <Image src="/images/mock/holiday-evergreen.jpg" alt="" width={245} height={350} />
      </div>

      <div className={styles.inner}>
        <header className={styles.heading}>
          <p className={styles.location}><span />ZIVEL HOLLYWOOD, FL<span /></p>
          <h1 id="location-hero-title">Holiday Offers</h1>
          <div className={styles.rule} aria-hidden="true"><span /></div>
        </header>

        <div className={styles.offers} aria-label="Holiday offers">
          {offers.map((offer, index) => (
            <article
              className={styles.card}
              key={offer.title}
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
                {offer.membersOnly && <span className={styles.memberFlag}>Members only</span>}
              </div>
              <div className={styles.cardContent}>
                <h2 className={styles.offerTitle}>{offer.title}</h2>
                <div className={styles.price}>{offer.price}</div>
                <p className={styles.detail}>{offer.detail}</p>
                <Link href={pricingHref} className={styles.action}>
                  {offer.action}<span aria-hidden="true">›</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <p className={styles.disclaimer}>
          All services must be started and completed before 2/28/27. All sales are final and all
          services must be used at the location where they were purchased.
        </p>
      </div>
    </section>
  );
}
