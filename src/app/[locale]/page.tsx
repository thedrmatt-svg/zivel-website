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

export const metadata: Metadata = {
  title: "Zivel | Wellness & Recovery",
  description:
    "Zivel is modern wellness technology—delivered in calm, premium studios—with evidence-informed services designed to support recovery, performance, and daily well-being.",
  alternates: { canonical: "/" },
};

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
      {/* ========== FULL-SCREEN HERO ========== */}
      <section className="zv-bleed zv-hero-fullscreen zv-noise" aria-labelledby="home-hero-title">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[radial-gradient(circle,rgba(212,175,55,0.08)_0%,transparent_70%)]" />
        </div>

        <div className="zv-hero-content">
          <span className="zv-tagline mb-6 block zv-hero-animate-1">Experience the Difference</span>

          <h1 id="home-hero-title" className="mb-8 zv-hero-animate-2">
            {t("hero.title")}
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-white/70 leading-relaxed zv-hero-animate-3">
            {t("hero.subtitle")}
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4 zv-hero-animate-4">
            <a href="#book" className="zv-btn-luxury zv-btn-gold">
              Book Your Session
            </a>
            <a href="#services" className="zv-btn-luxury zv-btn-outline">
              Explore Services
            </a>
          </div>

          <div className="mt-16 flex justify-center gap-12 text-sm text-white/50 zv-hero-animate-5">
            {["Recovery", "Performance", "Longevity"].map((item) => (
              <span key={item} className="flex items-center gap-2">
                <span className="block h-px w-4 bg-[var(--zivel-gold)]/40" />
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10">
          <div className="zv-scroll-hint flex flex-col items-center gap-2 text-white/40">
            <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            <svg width="16" height="24" viewBox="0 0 16 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4V20M8 20L2 14M8 20L14 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </section>

      {/* ========== GOLD DIVIDER ========== */}
      <div className="zv-divider-gold" />

      {/* ========== BOOKING WIDGET ========== */}
      <section id="book" className="zv-bleed zv-immersive-section zv-section-elevated zv-noise" aria-labelledby="home-booking-title">
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
              <p className="mb-8 text-center text-white/60 max-w-lg mx-auto">
                Choose your location, select a service, and pick a time that works for you.
              </p>

              <div className="h-[560px] w-full rounded-xl border border-white/10 bg-black/40 flex items-center justify-center text-white/40">
                Booking Widget Placeholder (iframe will go here)
              </div>

              <p className="mt-6 text-center text-sm text-white/50">
                If the booking form does not load,{" "}
                <Link href="/locations" className="text-[var(--zivel-gold)] zv-gold-underline">
                  find a location
                </Link>{" "}
                to book directly.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-white" />

      {/* ========== SIGNATURE SERVICES ========== */}
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
                <Link href={`/services/${service.slug}`} className="block zv-luxury-card p-8 h-full group">
                  <h3 className="text-xl mb-3 group-hover:text-[var(--zivel-gold)] transition-colors duration-500">{service.name}</h3>
                  <p className="text-sm text-white/60 line-clamp-3 mb-6">
                    {service.hero.subheadline}
                  </p>
                  <span className="text-sm font-medium text-[var(--zivel-gold)] flex items-center gap-2">
                    Explore
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
                      <path d="M3 8H13M13 8L9 4M13 8L9 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* ========== STATEMENT QUOTE ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-recessed" aria-label="Brand statement">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal variant="fade-in" duration={1200}>
            <span className="zv-quote-mark block mb-4">&ldquo;</span>
            <p className="zv-quote-large">
              The real journey begins when you arrive. We exist to help you recover smarter, perform better, and feel the difference.
            </p>
            <span className="zv-gold-line mt-10" />
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-gold" />

      {/* ========== PATHWAYS ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-elevated zv-noise">
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <HomePathwaysSection />
          </ScrollReveal>
        </div>
      </section>

      <div className="zv-divider-white" />

      {/* ========== LOCATIONS ========== */}
      <section id="locations" className="zv-bleed zv-immersive-section zv-section-gradient zv-noise" aria-labelledby="home-locations-title">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end mb-14">
            <div className="lg:col-span-8">
              <ScrollReveal variant="fade-up">
                <span className="zv-tagline mb-4 block">Visit Us</span>
                <h2 id="home-locations-title">Find a Zivel Near You</h2>
                <span className="zv-gold-line-left mt-6" />
                <p className="mt-6 text-white/60 text-lg">
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

      <div className="zv-divider-gold" />

      {/* ========== ABOUT ZIVEL ========== */}
      <section id="about" className="zv-bleed zv-immersive-section zv-section-recessed" aria-labelledby="home-about-title">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            <ScrollReveal variant="fade-right">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent">
                <div className="absolute inset-0 border border-white/10 rounded-2xl z-10" />
                <span className="absolute inset-0 flex items-center justify-center text-white/30">About Media Placeholder</span>
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
                  Learn More
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <div className="zv-divider-white" />

      {/* ========== TESTIMONIALS — SCROLLING GALLERY ========== */}
      <section id="reviews" className="zv-bleed zv-immersive-section zv-section-warm zv-noise" aria-labelledby="home-social-proof-title">
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
                className="flex-shrink-0 w-[400px] rounded-2xl border border-white/8 bg-white/[0.03] p-8 backdrop-blur-sm"
              >
                <span className="zv-quote-mark block mb-2">&ldquo;</span>
                <blockquote className="text-base text-white/80 italic leading-relaxed font-[var(--font-playfair)]">
                  {testimonial.quote}
                </blockquote>
                <figcaption className="mt-6 flex items-center gap-3">
                  <span className="block h-px w-8 bg-[var(--zivel-gold)]/40" />
                  <div>
                    <span className="font-semibold text-white text-sm">{testimonial.name}</span>
                    <span className="text-white/40 text-sm ml-2">{testimonial.city}</span>
                  </div>
                </figcaption>
              </figure>
            ))}
          </HorizontalScroller>
        </ScrollReveal>
      </section>

      <div className="zv-divider-gold" />

      {/* ========== SCIENCE HUB PREVIEW ========== */}
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
                  <div className="aspect-[16/9] w-full bg-gradient-to-br from-white/[0.03] to-transparent flex items-center justify-center text-white/30 text-sm">
                    Article Thumbnail
                  </div>
                  <div className="p-6">
                    <h3 className="text-lg mb-3 group-hover:text-[var(--zivel-gold)] transition-colors duration-500">
                      {article.title}
                    </h3>
                    <p className="text-sm text-white/60 line-clamp-2 mb-4">
                      {article.description}
                    </p>
                    <span className="text-sm font-medium text-[var(--zivel-gold)] flex items-center gap-2">
                      Read More
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="transition-transform duration-300 group-hover:translate-x-1">
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

      {/* ========== FINAL CTA ========== */}
      <section className="zv-bleed zv-immersive-section zv-glow-gold" aria-labelledby="home-final-cta-title">
        <div className="mx-auto max-w-4xl px-6 text-center">
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
