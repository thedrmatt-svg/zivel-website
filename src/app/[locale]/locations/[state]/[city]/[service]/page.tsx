import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getLocationByPath } from "@/lib/data/locations";
import { getServiceBySlug } from "@/lib/data/services";

const SITE_URL = "https://www.zivel.com";

const LOCAL_SERVICE_COMBOS = [
  { locale: "en", state: "utah", city: "riverton", service: "cryotherapy" },
  { locale: "es", state: "utah", city: "riverton", service: "cryotherapy" },
];

export function generateStaticParams() {
  return LOCAL_SERVICE_COMBOS;
}

type Props = {
  params: Promise<{ locale: string; state: string; city: string; service: string }>;
};

const META_MAP: Record<string, { title: string; description: string }> = {
  "utah/riverton/cryotherapy": {
    title: "Cryotherapy in Riverton, UT | Zivel Riverton",
    description:
      "Whole body and localized cryotherapy at Zivel Riverton. Fast recovery, inflammation support, and performance optimization. Serving Riverton, Herriman, Bluffdale & South Jordan.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city, service, locale } = await params;
  const location = getLocationByPath(state, city);
  const svc = getServiceBySlug(service);
  if (!location || !svc) return {};
  const key = `${state}/${city}/${service}`;
  const meta = META_MAP[key] ?? {
    title: `${svc.name} in ${location.name} | Zivel`,
    description: `${svc.name} at ${location.name}.`,
  };
  const basePath = `/locations/${state}/${city}/${service}`;
  const enUrl = `${SITE_URL}${basePath}`;
  const esUrl = `${SITE_URL}/es${basePath}`;
  const canonicalUrl = locale === "es" ? esUrl : enUrl;
  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: canonicalUrl,
      languages: { en: enUrl, es: esUrl, "x-default": enUrl },
    },
  };
}

const LOCAL_CONTENT: Record<
  string,
  {
    h1: string;
    subtitle: string;
    servingLine: string;
    trustBar: { stat: string; label: string }[];
    localExpect: { title: string; body: string }[];
    services: { name: string; desc: string; price: string }[];
    frequency: { goal: string; rec: string }[];
    faqs: { q: string; a: string }[];
    pathways: { slug: string; name: string; tagline: string }[];
    testimonials: { name: string; location: string; quote: string }[];
  }
> = {
  "utah/riverton/cryotherapy": {
    h1: "Cryotherapy in Riverton, UT",
    subtitle:
      "Advanced cold therapy for recovery, pain relief, and performance at Zivel Riverton",
    servingLine: "Serving Riverton, Herriman, Bluffdale, and South Jordan",
    trustBar: [
      { stat: "200+", label: "5-Star Reviews" },
      { stat: "1,000s", label: "Sessions Delivered" },
      { stat: "Since 2023", label: "Serving Riverton" },
    ],
    localExpect: [
      {
        title: "Friendly, Expert Staff",
        body: "Our Riverton team walks you through every step — first-timers and regulars both get the same attentive, guided experience.",
      },
      {
        title: "Clean, Purpose-Built Studio",
        body: "Zivel Riverton is designed around recovery. Equipment is maintained to the highest standards and sessions run on time.",
      },
      {
        title: "Easy Parking",
        body: "Free parking right outside the studio. No stress, no circling — just walk in and recover.",
      },
      {
        title: "Stack Your Session",
        body: "After cryo, many clients add red light therapy, compression, or a dry float to maximize the recovery window.",
      },
    ],
    services: [
      {
        name: "Whole Body Cryotherapy",
        desc: "Step into our cryotherapy chamber for a 2–3 minute session of controlled cold exposure. Your body responds by activating circulation, reducing inflammation signals, and releasing endorphins — leaving you feeling sharp and recovered.",
        price: "$45 / session",
      },
      {
        name: "Localized Cryotherapy",
        desc: "Targeted cold application to a specific area — a joint, muscle group, or area of soreness. Ideal for spot treatment between whole-body sessions or as a standalone recovery tool.",
        price: "$30 / session",
      },
    ],
    frequency: [
      {
        goal: "General Recovery & Wellness",
        rec: "2–3x per week. Enough to maintain benefits without over-stressing the system.",
      },
      {
        goal: "Athletic Performance & Training",
        rec: "3–5x per week during heavy training blocks. Often used post-workout or on recovery days.",
      },
      {
        goal: "Pain Management & Inflammation Support",
        rec: "Daily or every other day in acute phases. Dial back to maintenance frequency (2–3x/week) once symptoms improve.",
      },
      {
        goal: "Introductory / First-Timer",
        rec: "Start with 3 sessions in your first week to experience the compound effect, then settle into your ideal cadence.",
      },
    ],
    faqs: [
      {
        q: "Where is Zivel Riverton located?",
        a: "We're at 2722 W 12600 S #1, Riverton, UT 84065 — just off the main corridor with free parking right outside.",
      },
      {
        q: "What cryotherapy services does Zivel Riverton offer?",
        a: "We offer whole body cryotherapy, localized cryotherapy, and cryo-based facial treatments (CryoLift Facial). Sessions can be booked individually or as part of a membership.",
      },
      {
        q: "How much does cryotherapy cost at Zivel Riverton?",
        a: "Single whole body sessions start at $45. Localized cryo starts at $30. Members get discounted rates — memberships start at $99/month. Ask about package options when you visit.",
      },
      {
        q: "What are Zivel Riverton's hours?",
        a: "Mon & Wed 7am–8pm, Tue & Thu 10am–8pm, Fri 8am–8pm, Sat 9am–8pm, Sun 10am–2pm. Book in advance to secure your preferred time.",
      },
      {
        q: "How long is a cryotherapy session?",
        a: "The cold exposure itself is 2–3 minutes. Add a few minutes for check-in and a brief warm-up afterward. Plan for 15–20 minutes total.",
      },
      {
        q: "Is cryotherapy safe? Are there any restrictions?",
        a: "Cryotherapy is generally safe when administered by trained staff and when you're screened for contraindications. We review your health history before every session. Those who are pregnant, have uncontrolled hypertension, or certain cardiac conditions may not be candidates — our team will help you determine if it's right for you.",
      },
      {
        q: "What should I wear to my cryotherapy session?",
        a: "Wear minimal clothing — underwear or a swimsuit works well. We provide protective items like gloves and footwear. Leave jewelry and metal accessories at home or in your locker.",
      },
      {
        q: "Can I combine cryotherapy with other services at Zivel Riverton?",
        a: "Absolutely. Our most popular recovery stack is cryotherapy → red light therapy → compression. You can book multiple services in a single visit. Our staff can help you sequence them based on your goals.",
      },
    ],
    pathways: [
      {
        slug: "recovery-pain-support",
        name: "Recovery & Pain Support",
        tagline: "A structured approach to reducing soreness, managing inflammation, and getting back to full capacity faster.",
      },
      {
        slug: "performance-athletic-optimization",
        name: "Performance & Athletic Optimization",
        tagline: "Recovery and performance protocols designed for athletes, serious fitness enthusiasts, and anyone who trains hard.",
      },
    ],
    testimonials: [
      {
        name: "Marcus T.",
        location: "Riverton, UT",
        quote:
          "I was skeptical at first, but after my first session I was hooked. Recovery is noticeably faster and I feel sharper the rest of the day.",
      },
      {
        name: "Brianna H.",
        location: "South Jordan, UT",
        quote:
          "I do cryotherapy twice a week and it's made a real difference in how my body handles training. Less soreness, more energy. It's become non-negotiable for me.",
      },
      {
        name: "Derek S.",
        location: "Herriman, UT",
        quote:
          "The team walks you through everything so it doesn't feel intimidating. I stack it with compression and red light — three minutes of cold and I feel like a different person.",
      },
    ],
  },
};

export default async function LocalServicePage({ params }: Props) {
  const { state, city, service } = await params;
  const location = getLocationByPath(state, city);
  const svc = getServiceBySlug(service);
  if (!location || !svc) return notFound();

  const key = `${state}/${city}/${service}`;
  const local = LOCAL_CONTENT[key];
  if (!local) return notFound();

  const bookingUrl = `https://zivel.myperformanceiq.com/book-appointment?set_location=${location.booking?.locationId ?? 11417}`;
  const locationPageUrl = `/locations/${state}/${city}`;
  const servicePageUrl = `/services/${service}`;
  const canonicalUrl = `${SITE_URL}/locations/${state}/${city}/${service}`;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness"],
    name: location.name,
    url: `${SITE_URL}${locationPageUrl}`,
    telephone: location.contact?.phone,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.contact?.address?.split(",")[0],
      addressLocality: "Riverton",
      addressRegion: "UT",
      postalCode: "84065",
      addressCountry: "US",
    },
    openingHoursSpecification: [
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Monday", opens: "07:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Tuesday", opens: "10:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Wednesday", opens: "07:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Thursday", opens: "10:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Friday", opens: "08:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Saturday", opens: "09:00", closes: "20:00" },
      { "@type": "OpeningHoursSpecification", dayOfWeek: "Sunday", opens: "10:00", closes: "14:00" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Cryotherapy Services",
      itemListElement: local.services.map((s) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: s.name,
          description: s.desc,
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
      { "@type": "ListItem", position: 2, name: "Locations", item: `${SITE_URL}/locations` },
      { "@type": "ListItem", position: 3, name: "Utah", item: `${SITE_URL}/locations/utah` },
      { "@type": "ListItem", position: 4, name: "Riverton", item: `${SITE_URL}${locationPageUrl}` },
      { "@type": "ListItem", position: 5, name: "Cryotherapy", item: canonicalUrl },
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: local.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const hours = location.hours;

  return (
    <div className="overflow-x-hidden">
      <Script
        id="schema-local-business"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="schema-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="schema-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ========== BREADCRUMB ========== */}
      <nav
        aria-label="Breadcrumb"
        className="zv-bleed bg-black border-b border-white/10 px-6 py-3"
        style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}
      >
        <ol className="mx-auto max-w-6xl flex flex-wrap items-center gap-1.5 text-xs text-white/40">
          <li><Link href="/" className="hover:text-white/70 transition-colors">Home</Link></li>
          <li className="text-white/20">/</li>
          <li><Link href="/locations" className="hover:text-white/70 transition-colors">Locations</Link></li>
          <li className="text-white/20">/</li>
          <li><Link href="/locations/utah" className="hover:text-white/70 transition-colors">Utah</Link></li>
          <li className="text-white/20">/</li>
          <li><Link href={locationPageUrl} className="hover:text-white/70 transition-colors">Riverton</Link></li>
          <li className="text-white/20">/</li>
          <li className="text-white/60">Cryotherapy</li>
        </ol>
      </nav>

      {/* ========== HERO (DARK) ========== */}
      <section
        className="zv-bleed bg-black text-white"
        style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
          <Image
            src="/images/services/cryotherapy/hero.jpg"
            alt="Cryotherapy at Zivel Riverton"
            fill
            priority
            fetchPriority="high"
            quality={80}
            sizes="100vw"
            style={{ objectFit: "cover", objectPosition: "center" }}
          />
          <div className="absolute inset-0 bg-black/65" />
          <div className="relative z-10 mx-auto max-w-6xl px-6 py-28 md:py-36">
            <p className="zv-tagline mb-4 zv-hero-animate-1">{local.servingLine}</p>
            <h1 className="font-serif text-5xl md:text-7xl font-light tracking-tight max-w-4xl zv-hero-animate-2">
              {local.h1}
            </h1>
            <p className="mt-6 text-lg md:text-xl text-white/75 leading-relaxed max-w-3xl zv-hero-animate-3">
              {local.subtitle}
            </p>
            <div className="flex flex-wrap gap-4 mt-8 zv-hero-animate-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zv-btn-luxury zv-btn-gold"
              >
                Book Your Cryotherapy Session
              </a>
              <Link href={servicePageUrl} className="zv-btn-luxury zv-btn-outline">
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ========== TRUST BAR ========== */}
      <section
        className="zv-bleed bg-[#0a0a0a] border-b border-white/10"
        style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="mx-auto max-w-6xl px-6 py-8">
          <div className="grid grid-cols-3 gap-6 text-center">
            {local.trustBar.map((t) => (
              <div key={t.label}>
                <div className="font-serif text-3xl md:text-4xl text-[var(--zivel-gold)] font-light">
                  {t.stat}
                </div>
                <div className="mt-1 text-sm text-white/55 uppercase tracking-widest">{t.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT IS CRYOTHERAPY (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-elevated" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal variant="fade-right">
              <p className="zv-tagline mb-4">The Treatment</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-6">
                What is Cryotherapy?
              </h2>
              <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                <p>
                  Cryotherapy uses short-duration, controlled cold exposure to trigger natural
                  physiological responses that may support recovery, circulation, and overall resilience.
                </p>
                <p>
                  At Zivel Riverton, sessions are quick, supported by staff, and designed to fit
                  seamlessly into a consistent wellness routine — whether your goal is recovery,
                  performance, or simply feeling better day-to-day.
                </p>
                <p>
                  Results can vary by individual and goal, but consistency and smart programming
                  tend to produce the best outcomes.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={servicePageUrl} className="text-[var(--zivel-gold)] text-sm hover:underline">
                  Full Cryotherapy Overview →
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-left">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src="/images/services/cryotherapy/intro.jpg"
                  alt="Client preparing for cryotherapy at Zivel Riverton"
                  width={700}
                  height={500}
                  quality={80}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ width: "100%", height: "auto", display: "block" }}
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== WHAT TO EXPECT AT RIVERTON (LIGHT) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }} />
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">At Zivel Riverton</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-14">
              What to Expect at Your Local Studio
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {local.localExpect.map((item, idx) => (
              <ScrollReveal key={item.title} variant="fade-up" delay={idx * 80}>
                <div className="zv-luxury-card rounded-2xl p-6 h-full">
                  <div className="w-8 h-0.5 bg-[var(--zivel-gold)] mb-4" />
                  <h3 className="font-serif text-lg font-light mb-3">{item.title}</h3>
                  <p className="text-sm text-black/60 leading-relaxed">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== KEY BENEFITS (DARK) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%) scaleY(-1)" }} />
      <section className="zv-bleed zv-immersive-section" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">Why Cryotherapy</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-14">
              Key Benefits
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              { title: "Supports Muscle Recovery", body: "Cold exposure may help reduce perceived soreness and support recovery routines — especially when used consistently." },
              { title: "Inflammation Response Support", body: "Cold exposure can influence inflammatory signaling and circulation dynamics used in post-training recovery strategies." },
              { title: "Boosts Alertness & Mental Clarity", body: "Many clients report feeling refreshed and focused after sessions due to cold-driven arousal responses." },
              { title: "Circulation & Recovery Cadence", body: "Used as part of a routine, cryotherapy may complement other recovery modalities and training schedules." },
              { title: "Time-Efficient", body: "Short sessions — just 2–3 minutes — make it easy to maintain consistency within a busy weekly routine." },
              { title: "Pairs with Other Modalities", body: "Often combined with red light therapy, infrared sauna, compression, and dry float for a complete recovery stack." },
            ].map((b, idx) => (
              <ScrollReveal key={b.title} variant="fade-up" delay={idx * 60}>
                <div className="zv-card-glass rounded-2xl p-6 h-full">
                  <div className="w-6 h-0.5 bg-[var(--zivel-gold)] mb-4" />
                  <h3 className="font-serif text-lg font-light text-white mb-3">{b.title}</h3>
                  <p className="text-sm text-white/55 leading-relaxed">{b.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/science/cold-exposure" className="text-[var(--zivel-gold)] text-sm hover:underline">
              View the Science →
            </Link>
          </div>
        </div>
      </section>

      {/* ========== SERVICES AVAILABLE (LIGHT) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }} />
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">What We Offer</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-14">
              Cryotherapy Services at Zivel Riverton
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-8">
            {local.services.map((s, idx) => (
              <ScrollReveal key={s.name} variant="fade-up" delay={idx * 100}>
                <div className="zv-luxury-card rounded-2xl p-8 h-full flex flex-col">
                  <h3 className="font-serif text-2xl font-light mb-3">{s.name}</h3>
                  <p className="text-black/65 leading-relaxed flex-1">{s.desc}</p>
                  <div className="mt-6 flex items-center justify-between flex-wrap gap-4">
                    <span className="text-[var(--zivel-gold-dark)] font-semibold text-lg">{s.price}</span>
                    <a
                      href={bookingUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="zv-btn-luxury zv-btn-gold text-sm px-5 py-2"
                    >
                      Book Now
                    </a>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== HOW OFTEN (DARK) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%) scaleY(-1)" }} />
      <section className="zv-bleed zv-immersive-section zv-section-recessed" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">Frequency Guide</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-4">
              How Often Should You Do Cryotherapy?
            </h2>
            <p className="text-white/60 text-lg mb-14 max-w-2xl">
              The right frequency depends on your goals. Here&apos;s a general starting point — our Riverton team can help you dial in the ideal schedule.
            </p>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {local.frequency.map((f, idx) => (
              <ScrollReveal key={f.goal} variant="fade-up" delay={idx * 80}>
                <div className="zv-card-glass rounded-2xl p-6">
                  <p className="text-[var(--zivel-gold)] text-sm font-semibold uppercase tracking-widest mb-2">{f.goal}</p>
                  <p className="text-white/70 leading-relaxed">{f.rec}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
          <div className="mt-12 flex flex-wrap gap-4">
            <Link href="/pathways/recovery-pain-support" className="zv-btn-luxury zv-btn-outline text-sm">
              Recovery Pathways
            </Link>
            <Link href="/pathways/performance-athletic-optimization" className="zv-btn-luxury zv-btn-outline text-sm">
              Performance Pathways
            </Link>
          </div>
        </div>
      </section>

      {/* ========== LOCATION DETAILS (LIGHT) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }} />
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">Find Us</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-14">
              Location Details
            </h2>
          </ScrollReveal>
          <div className="grid md:grid-cols-2 gap-12">
            <ScrollReveal variant="fade-right">
              <div className="space-y-8">
                {location.contact?.address && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--zivel-gold-dark)] mb-2">Address</p>
                    <p className="text-black/80 text-lg">{location.contact.address}</p>
                    <a
                      href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(location.contact.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2 inline-block text-sm text-[var(--zivel-gold-dark)] hover:underline"
                    >
                      Get Directions →
                    </a>
                  </div>
                )}
                {location.contact?.phone && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--zivel-gold-dark)] mb-2">Phone</p>
                    <a href={`tel:${location.contact.phone.replace(/\D/g, "")}`} className="text-black/80 text-lg hover:text-[var(--zivel-gold-dark)] transition-colors">
                      {location.contact.phone}
                    </a>
                  </div>
                )}
                {location.contact?.parking && (
                  <div>
                    <p className="text-xs uppercase tracking-widest text-[var(--zivel-gold-dark)] mb-2">Parking</p>
                    <p className="text-black/80">{location.contact.parking}</p>
                  </div>
                )}
                <div className="pt-2">
                  <Link href="/locations/utah/riverton" scroll={true} className="zv-btn-luxury zv-btn-gold">
                    Full Location Page
                  </Link>
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-left">
              {hours && (
                <div>
                  <p className="text-xs uppercase tracking-widest text-[var(--zivel-gold-dark)] mb-4">Hours</p>
                  <div className="space-y-2">
                    {[
                      ["Monday", hours.monday],
                      ["Tuesday", hours.tuesday],
                      ["Wednesday", hours.wednesday],
                      ["Thursday", hours.thursday],
                      ["Friday", hours.friday],
                      ["Saturday", hours.saturday],
                      ["Sunday", hours.sunday],
                    ].map(([day, time]) =>
                      time ? (
                        <div key={day} className="flex justify-between border-b border-black/10 pb-2">
                          <span className="text-black/60 text-sm">{day}</span>
                          <span className="text-black/80 text-sm font-medium">{time}</span>
                        </div>
                      ) : null
                    )}
                  </div>
                </div>
              )}
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ========== LOCAL FAQs (DARK) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%) scaleY(-1)" }} />
      <section className="zv-bleed zv-immersive-section zv-section-elevated" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-4xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">Common Questions</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-14">
              FAQs — Cryotherapy in Riverton
            </h2>
          </ScrollReveal>
          <div className="space-y-3">
            {local.faqs.map((faq, idx) => (
              <ScrollReveal key={idx} variant="fade-up" delay={idx * 40}>
                <details className="group border border-white/10 rounded-xl overflow-hidden">
                  <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none select-none hover:bg-white/5 transition-colors">
                    <span className="font-serif text-lg font-light text-white/90">{faq.q}</span>
                    <span className="flex-shrink-0 w-5 h-5 text-[var(--zivel-gold)] transition-transform group-open:rotate-45">
                      <svg viewBox="0 0 20 20" fill="currentColor"><path d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"/></svg>
                    </span>
                  </summary>
                  <div className="px-6 pb-5 text-white/60 leading-relaxed border-t border-white/10 pt-4">
                    {faq.a}
                  </div>
                </details>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== RELATED PATHWAYS (LIGHT) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }} />
      <section className="zv-bleed zv-section-light zv-light zv-immersive-section" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">Go Further</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-14">
              Recovery Pathways
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 gap-6">
            {local.pathways.map((p, idx) => (
              <ScrollReveal key={p.slug} variant="fade-up" delay={idx * 100}>
                <Link
                  href={`/pathways/${p.slug}`}
                  className="zv-luxury-card block rounded-2xl p-8 h-full group transition-all hover:-translate-y-0.5"
                >
                  <div className="w-6 h-0.5 bg-[var(--zivel-gold-dark)] mb-4" />
                  <h3 className="font-serif text-xl font-light mb-3 group-hover:text-[var(--zivel-gold-dark)] transition-colors">
                    {p.name}
                  </h3>
                  <p className="text-sm text-black/55 leading-relaxed">{p.tagline}</p>
                  <p className="mt-4 text-xs text-[var(--zivel-gold-dark)] group-hover:underline">
                    Explore Pathway →
                  </p>
                </Link>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== TESTIMONIALS (DARK) ========== */}
      <div className="zv-bleed zv-divider-dark-to-light" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%) scaleY(-1)" }} />
      <section className="zv-bleed zv-immersive-section" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-4">Real Results</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-14">
              What Clients in Riverton Say
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-3 gap-6">
            {local.testimonials.map((t, idx) => (
              <ScrollReveal key={t.name} variant="fade-up" delay={idx * 100}>
                <div className="zv-card-glass rounded-2xl p-6 h-full flex flex-col">
                  <p className="zv-quote-mark text-4xl text-[var(--zivel-gold)] leading-none mb-3">&ldquo;</p>
                  <p className="text-white/75 leading-relaxed flex-1 italic">{t.quote}</p>
                  <div className="mt-6 pt-4 border-t border-white/10">
                    <p className="text-white font-medium text-sm">{t.name}</p>
                    <p className="text-white/40 text-xs mt-0.5">{t.location}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ========== FINAL CTA (DARK GRADIENT) ========== */}
      <section className="zv-bleed zv-cta-bg zv-immersive-section" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-4xl px-6 text-center">
          <ScrollReveal variant="fade-up">
            <p className="zv-tagline mb-6">Ready to Start</p>
            <h2 className="font-serif text-4xl md:text-6xl font-light tracking-tight mb-6">
              Book Your Session at Zivel Riverton
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              Three minutes of cold. Faster recovery. More energy. Join thousands of clients across
              Riverton, Herriman, Bluffdale, and South Jordan who have made cryotherapy part of their
              weekly routine.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zv-btn-luxury zv-btn-gold"
              >
                Book Your Cryotherapy Session
              </a>
              <Link href="/locations/utah/riverton" scroll={true} className="zv-btn-luxury zv-btn-outline">
                Zivel Riverton
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
