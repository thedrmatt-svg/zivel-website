import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { services } from "@/lib/data/services";
import { scienceArticles } from "@/lib/data/science";
import { locations } from "@/lib/data/locations";
import HomePathwaysSection from "@/components/sections/HomePathwaysSection";
import LocationSearch from "@/components/sections/LocationSearch";
import ScrollReveal from "@/components/ui/ScrollReveal";
import HorizontalScroller from "@/components/ui/HorizontalScroller";

const SITE_URL = "https://www.zivel.com";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const enUrl = `${SITE_URL}/`;
  const esUrl = `${SITE_URL}/es/`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;

  return {
    title: "Zivel | Recover Smarter. Look Better. Feel Stronger.",
    description:
      "Zivel delivers cutting-edge wellness technology nationwide — expert-led recovery, body contouring, and skin rejuvenation in serene private studios. Book cryo, red light, infrared sauna, CryoLift Facial and more.",
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: enUrl,
        es: esUrl,
        "x-default": enUrl,
      },
    },
    openGraph: {
      title: "Zivel | Recover Smarter. Look Better. Feel Stronger.",
      description:
        "Modern wellness technology for pain relief, fat loss, skin rejuvenation, and performance. Find your local studio and book today.",
      url: "https://www.zivel.com",
      images: [{ url: "/images/og-image.jpg", width: 1200, height: 630, alt: "Zivel Wellness Studios" }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Zivel | Recover Smarter. Look Better. Feel Stronger.",
      description:
        "Modern wellness technology for pain relief, fat loss, skin rejuvenation, and performance. Find your local studio and book today.",
      images: ["/images/og-image.jpg"],
    },
  };
}

const serviceImageMap: Record<string, string> = {
  "cryotherapy": "/images/home/service-cryo.jpg",
  "red-light-therapy": "/images/home/service-redlight.jpg",
  "infrared-sauna": "/images/home/service-sauna.jpg",
  "dry-float": "/images/home/service-dryfloat.jpg",
  "compression-therapy": "/images/home/service-compression.jpg",
  "cryo-slimming": "/images/home/service-slimming.jpg",
  "cryo-toning": "/images/home/service-exercise.jpg",
  "cryo-lift-facial": "/images/home/service-facial.avif",
};

const scienceImages = [
  "/images/home/science-1.jpg",
  "/images/home/science-2.jpg",
  "/images/home/science-3.jpg",
];

export default function HomePage() {
  const t = useTranslations();
  const featuredServices = services.slice(0, 6);
  const featuredArticles = scienceArticles.slice(0, 3);

  const testimonials = [
    { quote: "I feel more recovered after every session. The staff makes the experience easy and comfortable.", name: "Sarah M.", city: "Nashville, TN" },
    { quote: "The combination of cryotherapy and red light has become my go-to recovery routine.", name: "Marcus T.", city: "Denver, CO" },
    { quote: "Clean, calm, and consistent—exactly what I was looking for in a wellness studio.", name: "Emily R.", city: "Atlanta, GA" },
    { quote: "Zivel has become an essential part of my weekly routine. I feel stronger and more focused.", name: "James K.", city: "Charlotte, NC" },
    { quote: "The infrared sauna sessions are incredible. I leave feeling completely renewed every time.", name: "Olivia W.", city: "Coral Gables, FL" },
  ];

  return (
    <main className="-mt-20">
      {/* ========== FULL-SCREEN HERO (DARK) ========== */}
      <section className="bg-black" style={{ position: 'relative', width: '100vw', left: '50%', transform: 'translateX(-50%)', marginTop: '-5rem' }} aria-labelledby="home-hero-title">
        <div className="pt-20">
          <Image
            src="/images/home/hero.jpg"
            alt="Zivel wellness services — cryotherapy, facial treatment, and infrared sauna"
            width={1920}
            height={800}
            priority
            fetchPriority="high"
            sizes="100vw"
            quality={80}
            style={{ width: '100%', height: 'auto', display: 'block' }}
          />
        </div>

        <div className="bg-black text-center text-white px-6 pt-6 pb-10 md:pt-8 md:pb-14">
          <span className="zv-tagline mb-4 block">Experience the Difference</span>

          <h1 id="home-hero-title" className="mb-6 font-serif text-5xl md:text-7xl font-light tracking-tight">
            {t("hero.title")}
          </h1>

          <p className="mx-auto max-w-2xl text-lg md:text-xl text-white/70 leading-relaxed">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a href="#book" className="zv-btn-luxury zv-btn-gold">
              Book Your Session
            </a>
            <a href="#services" className="zv-btn-luxury zv-btn-outline">
              Explore Services
            </a>
          </div>
        </div>
      </section>

      {/* ========== TRANSITION: DARK → LIGHT ========== */}
      <div className="zv-divider-dark-to-light" />

      {/* ========== BOOKING WIDGET (LIGHT) ========== */}
      <section id="book" className="zv-bleed zv-immersive-section zv-section-light zv-noise zv-light" aria-labelledby="home-booking-title">
        <div className="mx-auto max-w-5xl px-6">
          <ScrollReveal variant="fade-up">
            <div className="text-center mb-12">
              <span className="zv-tagline mb-4 block">Reserve Your Experience</span>
              <h2 id="home-booking-title">Book Your Session</h2>
              <span className="zv-gold-line mt-6" />
            </div>
          </ScrollReveal>

          <ScrollReveal variant="scale" delay={200}>
            <div className="rounded-2xl zv-card-glass p-6 md:p-8">
              <p className="mb-8 text-center max-w-lg mx-auto">
                Choose your location, select a service, and pick a time that works for you.
              </p>

              <div className="overflow-hidden rounded-xl border border-black/10">
                <iframe
                  className="block h-[640px] w-full bg-white"
                  style={{ marginBottom: '-60px' }}
                  src="https://zivel.myperformanceiq.com/book-appointment?set_location=11417"
                  title="Book an appointment at Zivel"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  allowFullScreen
                />
              </div>

              <p className="mt-6 text-center text-sm text-black/40">
                If the booking form does not load,{" "}
                <a
                  href="https://zivel.myperformanceiq.com/book-appointment?set_location=11417"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[var(--zivel-gold-dark)] zv-gold-underline"
                >
                  open the booking page
                </a>
                .
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ========== SIGNATURE SERVICES (DARK) ========== */}
      <section id="services" className="zv-bleed zv-immersive-section zv-section-gradient zv-noise zv-diagonal-accent" aria-labelledby="home-services-title">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end mb-14">
            <div className="lg:col-span-8">
              <ScrollReveal variant="fade-up">
                <span className="zv-tagline mb-4 block">Our Modalities</span>
                <h2 id="home-services-title">Signature Services</h2>
                <span className="zv-gold-line-left mt-6" />
                <p className="mt-6 text-white/60 text-lg">
                  Choose a single session or build a routine. Each service is designed to work on its own—and even better together.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <ScrollReveal variant="fade-left" delay={200}>
                <Link href="/services" className="zv-btn-luxury zv-btn-outline">
                  View All Services
                </Link>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredServices.map((service, i) => (
              <ScrollReveal key={service.slug} variant="fade-up" delay={i * 100}>
                <Link href={`/services/${service.slug}`} className="block zv-luxury-card overflow-hidden h-full group">
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    <Image
                      src={serviceImageMap[service.slug] || "/images/home/service-exercise.jpg"}
                      alt={service.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl mb-3 group-hover:text-[var(--zivel-gold)] transition-colors duration-500">{service.name}</h3>
                    <p className="text-sm text-white/60 line-clamp-3 mb-6">
                      {service.hero.subheadline}
                    </p>
                    <span className="text-sm font-medium text-[var(--zivel-gold)] flex items-center gap-2">
                      Explore {service.name}
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ========== STATEMENT QUOTE (LIGHT) — WITH BACKGROUND IMAGE ========== */}
      <section className="zv-bleed zv-immersive-section relative overflow-hidden" aria-label="Brand statement">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/quote-bg.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal variant="fade-in" duration={1200}>
            <span className="zv-quote-mark block mb-4">&ldquo;</span>
            <p className="zv-quote-large text-white">
              The real journey begins when you arrive. We exist to help you recover smarter, perform better, and feel the difference.
            </p>
            <span className="zv-gold-line mt-10" />
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ========== PATHWAYS (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-elevated zv-noise">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <HomePathwaysSection />
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ========== LOCATIONS (LIGHT) ========== */}
      <section id="locations" className="zv-bleed zv-immersive-section zv-section-light zv-noise zv-light" aria-labelledby="home-locations-title">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end mb-14">
            <div className="lg:col-span-8">
              <ScrollReveal variant="fade-up">
                <span className="zv-tagline mb-4 block">Visit Us</span>
                <h2 id="home-locations-title">Find a Zivel Near You</h2>
                <span className="zv-gold-line-left mt-6" />
                <p className="mt-6 text-lg">
                  Visit a studio near you and book in minutes. Every location delivers the same premium experience—designed to feel calm, modern, and consistent.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <ScrollReveal variant="fade-left" delay={200}>
                <Link href="/locations" className="zv-btn-luxury zv-btn-outline">
                  Browse Locations
                </Link>
              </ScrollReveal>
            </div>
          </div>

          <ScrollReveal variant="fade-up" delay={300}>
            <LocationSearch
              variant="light"
              locations={locations.map((loc) => ({
                name: loc.name,
                stateSlug: loc.stateSlug,
                citySlug: loc.citySlug,
                state: loc.state,
                city: loc.city,
                contact: loc.contact,
                geo: loc.geo,
              }))}
            />
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ========== ABOUT ZIVEL (DARK) ========== */}
      <section id="about" className="zv-bleed zv-immersive-section zv-section-recessed" aria-labelledby="home-about-title">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <ScrollReveal variant="fade-right">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl">
                <Image
                  src="/images/home/about-studio.jpg"
                  alt="Inside a Zivel wellness studio"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 border border-white/10 rounded-2xl z-10" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>
            </ScrollReveal>

            <ScrollReveal variant="fade-left" delay={200}>
              <div>
                <span className="zv-tagline mb-4 block">Our Story</span>
                <h2 id="home-about-title" className="mb-6">About Zivel</h2>
                <span className="zv-gold-line-left mb-8" />
                <p className="text-white/60 text-lg leading-relaxed mb-8">
                  Zivel brings modern wellness technology to local communities through a network of independently operated studios. We focus on evidence-informed modalities, clean environments, and personalized guidance—so you can feel better and recover smarter.
                </p>
                <Link href="/about" className="zv-btn-luxury zv-btn-outline">
                  Learn More About Zivel
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ========== TESTIMONIALS (LIGHT — WARM) ========== */}
      <section id="reviews" className="zv-bleed zv-immersive-section zv-section-light-warm zv-noise zv-light" aria-labelledby="home-social-proof-title">
        <div className="mx-auto max-w-6xl px-6 mb-14">
          <ScrollReveal variant="fade-up">
            <div className="text-center">
              <span className="zv-tagline mb-4 block">Testimonials</span>
              <h2 id="home-social-proof-title">What Our Clients Say</h2>
              <span className="zv-gold-line mt-6" />
            </div>
          </ScrollReveal>
        </div>

        <ScrollReveal variant="fade-in" delay={300}>
          <HorizontalScroller speed={50} className="py-4">
            {testimonials.map((testimonial) => (
              <figure
                key={testimonial.name}
                className="flex-shrink-0 w-[400px] rounded-2xl border border-black/8 bg-black/[0.02] p-8 backdrop-blur-sm"
              >
                <span className="zv-quote-mark block mb-2">&ldquo;</span>
                <blockquote className="text-base text-black/70 italic leading-relaxed font-[var(--font-playfair)]">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="block h-px w-8 bg-[var(--zivel-gold)]/40" />
                  <div>
                    <span className="font-semibold text-black/80 text-sm">{testimonial.name}</span>
                    <span className="text-black/40 text-sm ml-2">{testimonial.city}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </HorizontalScroller>
        </ScrollReveal>
      </section>

      <div className="zv-divider-dark-to-light" />

      {/* ========== SCIENCE HUB PREVIEW (DARK) ========== */}
      <section id="science" className="zv-bleed zv-immersive-section zv-section-cool zv-noise zv-diagonal-accent" aria-labelledby="home-science-title">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end mb-14">
            <div className="lg:col-span-8">
              <ScrollReveal variant="fade-up">
                <span className="zv-tagline mb-4 block">The Evidence</span>
                <h2 id="home-science-title">Science-Informed, Studio-Ready</h2>
                <span className="zv-gold-line-left mt-6" />
                <p className="mt-6 text-white/60 text-lg">
                  Explore clear, evidence-informed articles that explain how these modalities are studied—and how to use them as part of a consistent routine.
                </p>
              </ScrollReveal>
            </div>

            <div className="lg:col-span-4 lg:text-right">
              <ScrollReveal variant="fade-left" delay={200}>
                <Link href="/science" className="zv-btn-luxury zv-btn-outline">
                  Explore the Science Hub
                </Link>
              </ScrollReveal>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {featuredArticles.map((article, i) => (
              <ScrollReveal key={article.slug} variant="fade-up" delay={i * 150}>
                <Link href={`/science/${article.slug}`} className="block zv-luxury-card overflow-hidden h-full group">
                  <div className="relative aspect-[16/9] w-full overflow-hidden">
                    <Image
                      src={scienceImages[i] || scienceImages[0]}
                      alt={article.title}
                      fill
                      className={`object-cover transition-transform duration-700 group-hover:scale-105 ${i === 1 ? 'object-top' : i === 2 ? 'object-bottom' : ''}`}
                      sizes="(max-width: 768px) 100vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg mb-3 group-hover:text-[var(--zivel-gold)] transition-colors duration-500">
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2 mb-4">
                      {article.description}
                    </p>
                    <span className="text-sm font-medium text-[var(--zivel-gold)] flex items-center gap-2">
                      Read article<span className="sr-only"> — {article.title}</span>
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">
                        <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* ========== FINAL CTA (DARK) — WITH BACKGROUND IMAGE ========== */}
      <section className="zv-bleed zv-immersive-section relative overflow-hidden" aria-labelledby="home-final-cta-title">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/home/cta-bg.jpg"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.1)_0%,transparent_60%)]" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal variant="fade-up">
            <span className="zv-tagline mb-6 block">Begin Today</span>
            <h2 id="home-final-cta-title" className="mb-6">
              Ready to Feel the Difference?
            </h2>
            <p className="mx-auto max-w-xl text-white/60 text-lg mb-10">
              Book a session today—or build a routine with memberships designed for consistency.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#book" className="zv-btn-luxury zv-btn-gold">
                Book Now
              </a>
              <Link href="/memberships" className="zv-btn-luxury zv-btn-outline">
                View Memberships
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
