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
      <div className={styles.snowfall} aria-hidden="true">
        {Array.from({ length: 18 }, (_, index) => (
          <span className={styles.snowflake} key={index} />
        ))}
      </div>
      <div className={`${styles.holly} ${styles.hollyUpper}`} aria-hidden="true">
        <svg viewBox="0 0 240 180" focusable="false">
          <path className={styles.stem} d="M18 160C76 123 133 75 218 14" />
          <path className={styles.leaf} d="M86 112C68 109 62 121 46 113C48 102 42 98 29 94C43 87 42 78 38 66C53 69 60 61 67 49C74 64 86 65 98 62C91 77 97 86 107 96C95 99 91 104 86 112Z" />
          <path className={styles.leafVein} d="M47 101C65 99 78 95 97 76" />
          <path className={styles.leaf} d="M126 84C111 77 99 84 88 74C95 62 91 54 83 44C98 45 105 37 110 23C119 37 131 36 143 33C137 47 144 56 155 63C142 68 136 74 126 84Z" />
          <path className={styles.leafVein} d="M101 72C118 64 130 56 143 43" />
          <path className={styles.leaf} d="M165 53C151 45 139 50 129 39C136 28 133 19 126 9C140 11 147 3 152 -9C161 5 173 4 185 1C179 15 186 24 197 31C184 36 176 43 165 53Z" />
          <path className={styles.leafVein} d="M143 38C158 30 171 22 184 11" />
          <path className={styles.leaf} d="M77 135C67 119 53 118 51 103C63 98 66 89 64 76C76 84 85 79 98 73C96 89 104 96 115 104C102 109 96 118 90 132L77 135Z" />
          <path className={styles.leafVein} d="M66 108C78 111 88 111 104 101" />
          <circle className={styles.berry} cx="166" cy="78" r="10" />
          <circle className={styles.berry} cx="185" cy="67" r="9" />
          <circle className={styles.berry} cx="185" cy="89" r="9" />
          <circle className={styles.berryShine} cx="163" cy="75" r="2.2" />
          <circle className={styles.berryShine} cx="182" cy="64" r="2" />
          <circle className={styles.berryShine} cx="182" cy="86" r="2" />
        </svg>
      </div>
      <div className={`${styles.holly} ${styles.hollyLower}`} aria-hidden="true">
        <svg viewBox="0 0 240 180" focusable="false">
          <path className={styles.stem} d="M18 160C76 123 133 75 218 14" />
          <path className={styles.leaf} d="M86 112C68 109 62 121 46 113C48 102 42 98 29 94C43 87 42 78 38 66C53 69 60 61 67 49C74 64 86 65 98 62C91 77 97 86 107 96C95 99 91 104 86 112Z" />
          <path className={styles.leafVein} d="M47 101C65 99 78 95 97 76" />
          <path className={styles.leaf} d="M126 84C111 77 99 84 88 74C95 62 91 54 83 44C98 45 105 37 110 23C119 37 131 36 143 33C137 47 144 56 155 63C142 68 136 74 126 84Z" />
          <path className={styles.leafVein} d="M101 72C118 64 130 56 143 43" />
          <path className={styles.leaf} d="M165 53C151 45 139 50 129 39C136 28 133 19 126 9C140 11 147 3 152 -9C161 5 173 4 185 1C179 15 186 24 197 31C184 36 176 43 165 53Z" />
          <path className={styles.leafVein} d="M143 38C158 30 171 22 184 11" />
          <path className={styles.leaf} d="M77 135C67 119 53 118 51 103C63 98 66 89 64 76C76 84 85 79 98 73C96 89 104 96 115 104C102 109 96 118 90 132L77 135Z" />
          <path className={styles.leafVein} d="M66 108C78 111 88 111 104 101" />
          <circle className={styles.berry} cx="166" cy="78" r="10" />
          <circle className={styles.berry} cx="185" cy="67" r="9" />
          <circle className={styles.berry} cx="185" cy="89" r="9" />
          <circle className={styles.berryShine} cx="163" cy="75" r="2.2" />
          <circle className={styles.berryShine} cx="182" cy="64" r="2" />
          <circle className={styles.berryShine} cx="182" cy="86" r="2" />
        </svg>
      </div>
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
