import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { blogPosts } from "@/lib/data/blog";
import { getLocationBlogPosts } from "@/lib/data/locationBlog";
import ScrollReveal from "@/components/ui/ScrollReveal";

const SITE_URL = "https://www.zivel.com";

const LOCATION_BLOG_CONFIG: Record<
  string,
  {
    cityName: string;
    stateSlug: string;
    citySlug: string;
    bookingUrl: string;
    title: string;
    metaDescription: string;
    h1: string;
    subtitle: string;
    tagline: string;
  }
> = {
  bentonville: {
    cityName: "Bentonville",
    stateSlug: "arkansas",
    citySlug: "bentonville",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11443",
    title: "Zivel Bentonville Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Bentonville. Local tips on cryotherapy, red light therapy, infrared sauna, body contouring and more for the Bentonville, Rogers & Northwest Arkansas community.",
    h1: "Bentonville Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Bentonville team",
    tagline: "Insights from Northwest Arkansas",
  },
  rogers: {
    cityName: "Rogers",
    stateSlug: "arkansas",
    citySlug: "rogers",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11442",
    title: "Zivel Rogers Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Rogers. Local tips on cryotherapy, red light therapy, infrared sauna, body contouring and more for the Rogers, Bentonville & Northwest Arkansas community.",
    h1: "Rogers Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Rogers team",
    tagline: "Insights from Northwest Arkansas",
  },
  brecksville: {
    cityName: "Brecksville",
    stateSlug: "ohio",
    citySlug: "brecksville",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11438",
    title: "Zivel Brecksville Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Brecksville. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Brecksville and Cuyahoga Valley community.",
    h1: "Brecksville Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Brecksville team",
    tagline: "Insights from Cuyahoga Valley",
  },
  briargate: {
    cityName: "Briargate",
    stateSlug: "colorado",
    citySlug: "briargate",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11779",
    title: "Zivel Briargate Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Briargate. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Colorado Springs community.",
    h1: "Briargate Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Briargate team",
    tagline: "Insights from Colorado Springs",
  },
  buckhead: {
    cityName: "Buckhead",
    stateSlug: "georgia",
    citySlug: "buckhead",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11537",
    title: "Zivel Buckhead Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Buckhead. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Buckhead and Atlanta community.",
    h1: "Buckhead Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Buckhead team",
    tagline: "Insights from Atlanta",
  },
  "cool-springs": {
    cityName: "Cool Springs",
    stateSlug: "tennessee",
    citySlug: "cool-springs",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11436",
    title: "Zivel Cool Springs Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Cool Springs. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Franklin and Middle Tennessee community.",
    h1: "Cool Springs Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Cool Springs team",
    tagline: "Insights from Middle Tennessee",
  },
  "coral-gables": {
    cityName: "Coral Gables",
    stateSlug: "florida",
    citySlug: "coral-gables",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11432",
    title: "Zivel Coral Gables Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Coral Gables. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Coral Gables and South Florida community.",
    h1: "Coral Gables Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Coral Gables team",
    tagline: "Insights from South Florida",
  },
  fayetteville: {
    cityName: "Fayetteville",
    stateSlug: "arkansas",
    citySlug: "fayetteville",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11616",
    title: "Zivel Fayetteville Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Fayetteville. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Fayetteville and Northwest Arkansas community.",
    h1: "Fayetteville Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Fayetteville team",
    tagline: "Insights from Northwest Arkansas",
  },
  fieldhouse: {
    cityName: "Fieldhouse",
    stateSlug: "mississippi",
    citySlug: "fieldhouse",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11441",
    title: "Zivel Fieldhouse Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Fieldhouse in Hernando, MS. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the DeSoto County and Greater Memphis community.",
    h1: "Fieldhouse Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Fieldhouse team",
    tagline: "Insights from DeSoto County",
  },
  "highlands-ranch": {
    cityName: "Highlands Ranch",
    stateSlug: "colorado",
    citySlug: "highlands-ranch",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11431",
    title: "Zivel Highlands Ranch Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Highlands Ranch. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Highlands Ranch and South Denver community.",
    h1: "Highlands Ranch Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Highlands Ranch team",
    tagline: "Insights from South Denver",
  },
  hollywood: {
    cityName: "Hollywood",
    stateSlug: "florida",
    citySlug: "hollywood",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11433",
    title: "Zivel Hollywood Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Hollywood, FL. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Hollywood and Broward County community.",
    h1: "Hollywood Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Hollywood team",
    tagline: "Insights from South Florida",
  },
  metairie: {
    cityName: "Metairie",
    stateSlug: "louisiana",
    citySlug: "metairie",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11435",
    title: "Zivel Metairie Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Metairie. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Metairie and Greater New Orleans community.",
    h1: "Metairie Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Metairie team",
    tagline: "Insights from Greater New Orleans",
  },
  murfreesboro: {
    cityName: "Murfreesboro",
    stateSlug: "tennessee",
    citySlug: "murfreesboro",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11430",
    title: "Zivel Murfreesboro Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Murfreesboro. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Murfreesboro and Middle Tennessee community.",
    h1: "Murfreesboro Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Murfreesboro team",
    tagline: "Insights from Middle Tennessee",
  },
  newport: {
    cityName: "Newport",
    stateSlug: "kentucky",
    citySlug: "newport",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11437",
    title: "Zivel Newport Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Newport, KY. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Newport and Greater Cincinnati community.",
    h1: "Newport Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Newport team",
    tagline: "Insights from Greater Cincinnati",
  },
  parker: {
    cityName: "Parker",
    stateSlug: "colorado",
    citySlug: "parker",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11680",
    title: "Zivel Parker Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Parker, CO. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Parker and South Denver community.",
    h1: "Parker Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Parker team",
    tagline: "Insights from South Denver",
  },
  riverton: {
    cityName: "Riverton",
    stateSlug: "utah",
    citySlug: "riverton",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11445",
    title: "Zivel Riverton Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Riverton, UT. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Riverton and Wasatch Front community.",
    h1: "Riverton Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Riverton team",
    tagline: "Insights from the Wasatch Front",
  },
  windermere: {
    cityName: "Cumming-Windermere",
    stateSlug: "georgia",
    citySlug: "windermere",
    bookingUrl:
      "https://zivel.myperformanceiq.com/book-appointment?set_location=11617",
    title: "Zivel Cumming-Windermere Blog | Local Wellness & Recovery Insights",
    metaDescription:
      "Wellness, recovery, and beauty insights from Zivel Cumming-Windermere. Local tips on cryotherapy, red light therapy, infrared sauna, and more for the Cumming and North Atlanta community.",
    h1: "Cumming-Windermere Wellness Blog",
    subtitle:
      "Recovery tips, local wellness news, and expert insights from the Zivel Cumming-Windermere team",
    tagline: "Insights from North Atlanta",
  },
};

export async function generateStaticParams() {
  return Object.values(LOCATION_BLOG_CONFIG).map((loc) => ({
    state: loc.stateSlug,
    city: loc.citySlug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; state: string; city: string }>;
}): Promise<Metadata> {
  const { city, state, locale } = await params;
  const cfg = LOCATION_BLOG_CONFIG[city];
  if (!cfg) return {};

  const canonicalPath = `/locations/${state}/${city}/blog`;
  const canonicalUrl = `${SITE_URL}${canonicalPath}`;
  const esUrl = `${SITE_URL}/es${canonicalPath}`;

  return {
    title: cfg.title,
    description: cfg.metaDescription,
    alternates: {
      canonical: locale === "es" ? esUrl : canonicalUrl,
      languages: {
        en: canonicalUrl,
        es: esUrl,
        "x-default": canonicalUrl,
      },
    },
  };
}

export default async function LocationBlogPage({
  params,
}: {
  params: Promise<{ locale: string; state: string; city: string }>;
}) {
  const { city, state } = await params;
  const cfg = LOCATION_BLOG_CONFIG[city];
  if (!cfg) notFound();

  const localPosts = getLocationBlogPosts(city);
  const allPosts = [...localPosts, ...blogPosts];

  return (
    <main id="main-content" tabIndex={-1} className="space-y-0 -mt-20">
      {/* HERO (DARK) */}
      <section className="zv-bleed zv-hero-bg zv-noise relative min-h-[60vh] flex items-end overflow-hidden">
        <div className="absolute inset-0 zv-glow-gold opacity-40" />
        <div className="relative z-10 mx-auto max-w-6xl px-6 py-32 md:py-40">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline zv-hero-animate-1">{cfg.tagline}</p>
            <h1 className="mt-4 font-serif text-5xl md:text-7xl font-light tracking-tight zv-hero-animate-2">
              {cfg.h1}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/70 leading-relaxed zv-hero-animate-3">
              {cfg.subtitle}
            </p>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-bleed zv-divider-dark-to-light" />

      {/* BLOG GRID (LIGHT) */}
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-6 md:grid-cols-2">
            {allPosts.map((p, idx) => {
              const isLocal = localPosts.some((lp) => lp.slug === p.slug);
              const href = isLocal
                ? `/locations/${state}/${city}/blog/${p.slug}`
                : `/blog/${p.slug}`;
              return (
                <ScrollReveal key={p.slug} variant="fade-up" delay={idx * 80}>
                  <Link
                    href={href}
                    className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all duration-300 hover:-translate-y-0.5"
                  >
                    {isLocal && (
                      <span className="inline-block mb-3 text-[10px] uppercase tracking-[0.18em] font-semibold text-[var(--zivel-gold-dark)] bg-[var(--zivel-gold)]/10 px-3 py-1 rounded-full">
                        {cfg.cityName} Exclusive
                      </span>
                    )}
                    <div className="flex items-center gap-3 text-xs text-black/45">
                      <span>{p.publishDate}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--zivel-gold)]" />
                      <span>{p.category}</span>
                      <span className="h-1 w-1 rounded-full bg-[var(--zivel-gold)]" />
                      <span>{p.readingTime}</span>
                    </div>
                    <div className="mt-3 font-serif text-xl text-black/85 group-hover:text-[var(--zivel-gold-dark)] transition-colors">
                      {p.title}
                    </div>
                    <p className="mt-3 text-sm text-black/55 leading-relaxed">
                      {p.description}
                    </p>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          {/* BOTTOM ACTIONS */}
          <ScrollReveal variant="fade-up" delay={200}>
            <div className="mt-16 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href={`/locations/${state}/${city}`}
                className="zv-btn-luxury zv-btn-outline inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Back to Zivel {cfg.cityName}
              </Link>
              <a
                href={cfg.bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zv-btn-luxury zv-btn-gold inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm font-medium tracking-wider uppercase"
              >
                Book Now — {cfg.cityName}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
