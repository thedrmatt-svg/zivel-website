import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";
import { notFound } from "next/navigation";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { getLocationByPath } from "@/lib/data/locations";
import { getServiceBySlug } from "@/lib/data/services";
import type { Location } from "@/types/location";
import type { Service } from "@/types/service";
import rawPlacesCache from "@/data/places-cache.json";
import { LOCAL_SERVICE_COMBOS } from "@/lib/data/local-service-pages";

const SITE_URL = "https://www.zivel.com";

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
      "Whole body and localized cryotherapy at Zivel Riverton. Fast recovery, inflammation support, and performance. Serving Riverton & South Jordan.",
  },
  "utah/riverton/red-light-therapy": {
    title: "Red Light Therapy in Riverton, UT | Zivel Riverton",
    description:
      "Professional red light therapy at Zivel Riverton for recovery, skin health, and reduced inflammation. Serving Riverton, Herriman & South Jordan.",
  },
  "utah/riverton/infrared-sauna": {
    title: "Infrared Sauna in Riverton, UT | Zivel Riverton",
    description:
      "Therapeutic infrared sauna at Zivel Riverton for detoxification, relaxation, and recovery. Serving Riverton, Herriman & South Jordan.",
  },
  "utah/riverton/dry-float": {
    title: "Dry Float Therapy in Riverton, UT | Zivel Riverton",
    description:
      "Weightless dry float at Zivel Riverton for deep relaxation, stress relief, and nervous system reset — stay fully dry. Serving Riverton & South Jordan.",
  },
  "utah/riverton/cryo-lift-facial": {
    title: "CryoLift Facial in Riverton, UT | Zivel Riverton",
    description:
      "CryoLift Facial at Zivel Riverton for skin tightening, collagen boost, reduced puffiness, and glowing skin. Serving Riverton & South Jordan.",
  },
  "utah/riverton/compression-therapy": {
    title: "Compression Therapy in Riverton, UT | Zivel Riverton",
    description:
      "Compression Therapy at Zivel Riverton for recovery, circulation, and reduced soreness. Serving Riverton, Herriman & South Jordan.",
  },
  "utah/riverton/cryo-slimming": {
    title: "Cryo Slimming in Riverton, UT | Zivel Riverton",
    description:
      "Cryo Slimming at Zivel Riverton — non-invasive body contouring for fat reduction and skin tightening. Serving Riverton & South Jordan.",
  },
  "utah/riverton/cryo-toning": {
    title: "Cryo Toning in Riverton, UT | Zivel Riverton",
    description:
      "Cryo Toning at Zivel Riverton — non-invasive firming and toning for muscle definition and skin appearance. Serving Riverton & South Jordan.",
  },
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { state, city, service, locale } = await params;
  const location = getLocationByPath(state, city);
  const svc = getServiceBySlug(service);
  if (!location || !svc) return {};
  const key = `${state}/${city}/${service}`;
  const cityDisplay = city.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const fallbackDesc = `${svc.name} in ${cityDisplay}, ${location.state} at ${location.name}. ${svc.hero.subheadline}`;
  const meta = META_MAP[key] ?? {
    title: `${svc.name} in ${cityDisplay}, ${location.state} | ${location.name}`,
    description: fallbackDesc.length <= 155 ? fallbackDesc : fallbackDesc.slice(0, 152) + "…",
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

// ─────────────────────────────────────────────────────────────────────────────
// SMART TEMPLATE GENERATOR
// Used for any location/service page that doesn't have a LOCAL_CONTENT override.
// ─────────────────────────────────────────────────────────────────────────────

type CacheEntry = { rating: number; userRatingCount: number };

function getCacheEntry(placeId: string | undefined): CacheEntry | null {
  if (!placeId) return null;
  const entry = (rawPlacesCache as Record<string, unknown>)[placeId];
  if (entry && typeof entry === "object" && "rating" in entry && "userRatingCount" in entry) {
    return entry as CacheEntry;
  }
  return null;
}

function buildTrustBar(location: Location, cityDisplay: string): { stat: string; label: string }[] {
  const cached = getCacheEntry(location.google?.placeId);
  const yr = location.openedYear ?? 2023;
  if (cached && cached.userRatingCount > 0) {
    const n = cached.userRatingCount;
    const countLabel = n >= 200 ? "200+" : n >= 100 ? `${Math.floor(n / 10) * 10}+` : `${n}+`;
    const ratingLabel = cached.rating === 5 ? "5.0" : cached.rating.toFixed(1);
    return [
      { stat: countLabel, label: `${ratingLabel}-Star Reviews` },
      { stat: "1,000s", label: "Sessions Delivered" },
      { stat: `Since ${yr}`, label: `Serving ${cityDisplay}` },
    ];
  }
  return [
    { stat: "200+", label: "5.0-Star Reviews" },
    { stat: "1,000s", label: "Sessions Delivered" },
    { stat: `Since ${yr}`, label: `Serving ${cityDisplay}` },
  ];
}

function buildLocalExpectCards(location: Location, svc: Service, cityDisplay: string) {
  return [
    {
      title: "Friendly, Expert Staff",
      body: `Our ${cityDisplay} team guides you through every step — first visit or hundredth, you'll always feel supported and prepared.`,
    },
    {
      title: "Professional-Grade Equipment",
      body: `${location.name} uses clinical-grade ${svc.name} equipment maintained to exacting standards for consistent, effective results every session.`,
    },
    {
      title: location.contact?.parking ? "Easy Parking" : "Convenient Location",
      body: location.contact?.parking
        ? `${location.contact.parking}. Walk in and focus entirely on your wellness.`
        : `${location.name} is conveniently located. Check our map for directions and nearby parking.`,
    },
    {
      title: "Stack Your Session",
      body: `Many clients combine ${svc.name} with other services at ${location.name} for a complete recovery or wellness protocol in a single visit.`,
    },
  ];
}

function formatHoursAsText(hours: Location["hours"]): string {
  if (!hours) return "Please check our booking page for current hours.";
  const map: [keyof NonNullable<Location["hours"]>, string][] = [
    ["monday", "Mon"],
    ["tuesday", "Tue"],
    ["wednesday", "Wed"],
    ["thursday", "Thu"],
    ["friday", "Fri"],
    ["saturday", "Sat"],
    ["sunday", "Sun"],
  ];
  const parts = map.filter(([k]) => hours[k]).map(([k, label]) => `${label}: ${hours[k]}`);
  return parts.join("  ·  ") + ". Book ahead to secure your preferred time slot.";
}

function parseSchemaTime(t: string): string {
  const m = t.trim().match(/^(\d+)(am|pm)$/i);
  if (!m) return "00:00";
  let h = parseInt(m[1]);
  if (m[2].toLowerCase() === "pm" && h !== 12) h += 12;
  if (m[2].toLowerCase() === "am" && h === 12) h = 0;
  return `${h.toString().padStart(2, "0")}:00`;
}

function buildOpeningHoursSpec(hours: Location["hours"]) {
  if (!hours) return [];
  const map: [keyof NonNullable<Location["hours"]>, string][] = [
    ["monday", "Monday"], ["tuesday", "Tuesday"], ["wednesday", "Wednesday"],
    ["thursday", "Thursday"], ["friday", "Friday"], ["saturday", "Saturday"], ["sunday", "Sunday"],
  ];
  return map
    .filter(([k]) => hours[k])
    .map(([k, dayName]) => {
      const parts = (hours[k] as string).split(/\s*[–\-]\s*/);
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayName,
        opens: parts[0] ? parseSchemaTime(parts[0]) : "00:00",
        closes: parts[1] ? parseSchemaTime(parts[1]) : "00:00",
      };
    });
}

type LocalServiceContent = {
  h1: string;
  subtitle: string;
  servingLine: string;
  trustBar: { stat: string; label: string }[];
  bookingCtaLabel: string;
  heroImage: string;
  heroImageAlt: string;
  whatIsTagline: string;
  whatIsHeadline: string;
  whatIsParagraphs: string[];
  whatIsOverviewLabel: string;
  whatIsOverviewHref: string;
  whatIsImage: string;
  whatIsImageAlt: string;
  localExpect: { title: string; body: string }[];
  benefitsTagline: string;
  benefits: { title: string; body: string }[];
  benefitsScienceHref: string;
  servicesHeading: string;
  services: { name: string; desc: string; price: string }[];
  frequencyHeadline: string;
  frequency: { goal: string; rec: string }[];
  faqsHeadline: string;
  faqs: { q: string; a: string }[];
  pathways: { slug: string; name: string; tagline: string }[];
  testimonials: { name: string; location: string; quote: string }[];
  ctaHeadline: string;
  ctaBody: string;
};

function generateLocalContent(location: Location, svc: Service, state: string, city: string): LocalServiceContent {
  const cityDisplay = city.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");

  const trustBar = buildTrustBar(location, cityDisplay);

  const priceEntry = location.pricing?.standardPrices?.find(
    (p) => p.name.toLowerCase() === svc.name.toLowerCase()
  );

  const services = priceEntry
    ? [{ name: svc.name, desc: svc.intro.paragraphs[0] ?? svc.hero.subheadline, price: `${priceEntry.price}${priceEntry.note ? ` / ${priceEntry.note}` : " / session"}` }]
    : [{ name: svc.name, desc: svc.intro.paragraphs[0] ?? svc.hero.subheadline, price: "Ask about pricing" }];

  const benefits = svc.benefits.items.slice(0, 6).map((b) => ({
    title: b.title,
    body: b.description ?? "",
  }));

  const locationFaqs = [
    {
      q: `Where is ${location.name} located?`,
      a: location.contact?.address
        ? `We're located at ${location.contact.address}${location.contact.parking ? `. ${location.contact.parking}.` : "."}`
        : `Visit us at ${location.name}. Check our location page for directions.`,
    },
    {
      q: `What are ${location.name}'s hours?`,
      a: formatHoursAsText(location.hours),
    },
    {
      q: `Do I need to book ${svc.name} in advance?`,
      a: `We recommend booking ahead to secure your preferred time, though walk-ins are welcome based on availability. Use our online booking system for the fastest experience.`,
    },
  ];
  const serviceFaqs = svc.faqs.items.slice(0, 6).map((f) => ({ q: f.question, a: f.answer }));
  const faqs = [...locationFaqs, ...serviceFaqs].slice(0, 9);

  const testimonials = svc.testimonials.items.slice(0, 3).map((t) => ({
    name: t.name,
    location: t.location ?? "Zivel Client",
    quote: t.quote,
  }));

  return {
    h1: `${svc.name} in ${cityDisplay}, ${location.state}`,
    subtitle: svc.hero.subheadline,
    servingLine: `Serving ${cityDisplay} and surrounding areas`,
    trustBar,
    bookingCtaLabel: `Book Your ${svc.name} Session`,
    heroImage: svc.hero.media?.src ?? `/images/services/${svc.slug}/hero.jpg`,
    heroImageAlt: svc.hero.media?.alt ?? `${svc.name} at ${location.name}`,
    whatIsTagline: "The Treatment",
    whatIsHeadline: svc.intro.headline,
    whatIsParagraphs: [
      ...svc.intro.paragraphs,
      `At ${location.name}, every ${svc.name.toLowerCase()} session is guided by knowledgeable staff and designed to fit seamlessly into your routine.`,
    ],
    whatIsOverviewLabel: `Full ${svc.name} Overview →`,
    whatIsOverviewHref: `/services/${svc.slug}`,
    whatIsImage: svc.intro.media?.src ?? `/images/services/${svc.slug}/intro.jpg`,
    whatIsImageAlt: svc.intro.media?.alt ?? `${svc.name} session at ${location.name}`,
    localExpect: buildLocalExpectCards(location, svc, cityDisplay),
    benefitsTagline: `Why ${svc.name}`,
    benefits,
    benefitsScienceHref: svc.benefits.viewResearchCTA?.href ?? "/science",
    servicesHeading: `${svc.name} Services at ${location.name}`,
    services,
    frequencyHeadline: `How Often Should You Do ${svc.name}?`,
    frequency: [
      { goal: "General Wellness", rec: `2–3 sessions per week is a great starting point for most clients. Consistency over time drives the best cumulative results with ${svc.name}.` },
      { goal: "Athletic Recovery & Training", rec: `3–5 sessions per week, especially around training days. Many athletes use ${svc.name} post-workout or on active recovery days.` },
      { goal: "Therapeutic / Targeted Goals", rec: `Higher frequency (daily or every other day) during focused phases, then settle into 2–3x per week for long-term maintenance.` },
      { goal: "First-Timer", rec: `Start with 2–3 sessions in your first week to experience how your body responds, then find your ideal cadence with guidance from our team.` },
    ],
    faqsHeadline: `${svc.name} FAQs — ${cityDisplay}`,
    faqs,
    pathways: [
      { slug: "recovery-pain-support", name: "Recovery & Pain Support", tagline: "A structured approach to reducing soreness, managing inflammation, and getting back to full capacity faster." },
      { slug: "performance-athletic-optimization", name: "Performance & Athletic Optimization", tagline: "Recovery and performance protocols designed for athletes and serious fitness enthusiasts." },
    ],
    testimonials,
    ctaHeadline: `Book Your ${svc.name} Session at ${location.name}`,
    ctaBody: `${svc.hero.subheadline} Join clients throughout ${cityDisplay} who have made ${svc.name} a regular part of their wellness routine at ${location.name}.`,
  };
}

// ─────────────────────────────────────────────────────────────────────────────

const LOCAL_CONTENT: Record<string, LocalServiceContent> = {
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
    bookingCtaLabel: "Book Your Cryotherapy Session",
    heroImage: "/images/services/cryotherapy/hero.jpg",
    heroImageAlt: "Cryotherapy at Zivel Riverton",
    whatIsTagline: "The Treatment",
    whatIsHeadline: "What is Cryotherapy?",
    whatIsParagraphs: [
      "Cryotherapy uses short-duration, controlled cold exposure to trigger natural physiological responses that may support recovery, circulation, and overall resilience.",
      "At Zivel Riverton, sessions are quick, supported by staff, and designed to fit seamlessly into a consistent wellness routine — whether your goal is recovery, performance, or simply feeling better day-to-day.",
      "Results can vary by individual and goal, but consistency and smart programming tend to produce the best outcomes.",
    ],
    whatIsOverviewLabel: "Full Cryotherapy Overview →",
    whatIsOverviewHref: "/services/cryotherapy",
    whatIsImage: "/images/services/cryotherapy/intro.jpg",
    whatIsImageAlt: "Client preparing for cryotherapy at Zivel Riverton",
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
    benefitsTagline: "Why Cryotherapy",
    benefits: [
      { title: "Supports Muscle Recovery", body: "Cold exposure may help reduce perceived soreness and support recovery routines — especially when used consistently." },
      { title: "Inflammation Response Support", body: "Cold exposure can influence inflammatory signaling and circulation dynamics used in post-training recovery strategies." },
      { title: "Boosts Alertness & Mental Clarity", body: "Many clients report feeling refreshed and focused after sessions due to cold-driven arousal responses." },
      { title: "Circulation & Recovery Cadence", body: "Used as part of a routine, cryotherapy may complement other recovery modalities and training schedules." },
      { title: "Time-Efficient", body: "Short sessions — just 2–3 minutes — make it easy to maintain consistency within a busy weekly routine." },
      { title: "Pairs with Other Modalities", body: "Often combined with red light therapy, infrared sauna, compression, and dry float for a complete recovery stack." },
    ],
    benefitsScienceHref: "/science/cold-exposure",
    servicesHeading: "Cryotherapy Services at Zivel Riverton",
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
    frequencyHeadline: "How Often Should You Do Cryotherapy?",
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
    faqsHeadline: "FAQs — Cryotherapy in Riverton",
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
    ctaHeadline: "Book Your Session at Zivel Riverton",
    ctaBody:
      "Three minutes of cold. Faster recovery. More energy. Join thousands of clients across Riverton, Herriman, Bluffdale, and South Jordan who have made cryotherapy part of their weekly routine.",
  },

  "utah/riverton/red-light-therapy": {
    h1: "Red Light Therapy in Riverton, UT",
    subtitle:
      "Advanced therapeutic red and near-infrared light therapy for faster recovery, better skin, and whole-body wellness at Zivel Riverton",
    servingLine: "Serving Riverton, Herriman, Bluffdale, and South Jordan",
    trustBar: [
      { stat: "200+", label: "5-Star Reviews" },
      { stat: "1,000s", label: "Sessions Delivered" },
      { stat: "Since 2023", label: "Serving Riverton" },
    ],
    bookingCtaLabel: "Book Your Red Light Session",
    heroImage: "/images/services/red-light-therapy/hero.jpg",
    heroImageAlt: "Red light therapy at Zivel Riverton",
    whatIsTagline: "The Treatment",
    whatIsHeadline: "What is Red Light Therapy?",
    whatIsParagraphs: [
      "Red Light Therapy (RLT), also known as photobiomodulation, uses specific wavelengths of red and near-infrared light to support the body's natural recovery and performance processes.",
      "Unlike UV light, these wavelengths are non-thermal and are used to help support cellular energy production, circulation, tissue recovery, and skin health — all in a comfortable, relaxing session.",
      "At Zivel Riverton, sessions are designed to be consistent and easy to stack with other services as part of a complete wellness routine.",
    ],
    whatIsOverviewLabel: "Full Red Light Therapy Overview →",
    whatIsOverviewHref: "/services/red-light-therapy",
    whatIsImage: "/images/services/red-light-therapy/intro.jpg",
    whatIsImageAlt: "Red light therapy equipment at Zivel Riverton",
    localExpect: [
      {
        title: "Friendly, Expert Staff",
        body: "Our Riverton team will position you correctly, answer your questions, and make sure every session is comfortable and effective.",
      },
      {
        title: "Clinical-Grade Equipment",
        body: "Zivel Riverton uses professional-grade red and near-infrared panels maintained to exacting standards for consistent, reliable results.",
      },
      {
        title: "Easy Parking",
        body: "Free parking right outside the studio. No stress, no circling — just walk in and get your session done.",
      },
      {
        title: "Stack Your Session",
        body: "Many clients pair red light therapy with cryotherapy, infrared sauna, or compression therapy on the same visit for a complete recovery protocol.",
      },
    ],
    benefitsTagline: "Why Red Light Therapy",
    benefits: [
      { title: "Supports Muscle Recovery", body: "Often used to support tissue recovery and post-exercise soreness by assisting normal inflammatory and circulation processes." },
      { title: "Promotes Healthy Skin", body: "Commonly used to support collagen-related outcomes and overall skin appearance — tone, texture, and clarity." },
      { title: "Supports Circulation", body: "May support local blood flow and circulation, which can assist recovery routines and overall cellular function." },
      { title: "Joint Comfort & Mobility", body: "Frequently used as part of wellness routines aimed at maintaining mobility and joint comfort over time." },
      { title: "Sleep & Daily Resilience", body: "Some clients incorporate RLT into their evening routines to support relaxation and overall daily wellness habits." },
      { title: "Easy to Stack", body: "Pairs naturally with cryotherapy, infrared sauna, compression, and dry float for a comprehensive recovery protocol." },
    ],
    benefitsScienceHref: "/science/red-light-mechanisms",
    servicesHeading: "Red Light Therapy Services at Zivel Riverton",
    services: [
      {
        name: "Full Body Red Light Therapy",
        desc: "Relax in our full-panel red and near-infrared light system for a 15–20 minute session targeting your whole body. Supports recovery, circulation, skin health, and cellular energy — all in a single, comfortable visit.",
        price: "$30 / session",
      },
      {
        name: "Targeted Red Light Therapy",
        desc: "Focused red and near-infrared light applied to a specific area — a joint, muscle group, or area of concern. Ideal for supplementing whole-body sessions or isolating a recovery target.",
        price: "$30 / session",
      },
    ],
    frequencyHeadline: "How Often Should You Do Red Light Therapy?",
    frequency: [
      {
        goal: "General Wellness & Skin Health",
        rec: "2–4x per week. Consistency is the key driver of visible results — especially for skin and cellular recovery outcomes.",
      },
      {
        goal: "Athletic Recovery & Performance",
        rec: "3–5x per week around training. Best used post-workout or on active recovery days to support tissue repair.",
      },
      {
        goal: "Joint Comfort & Mobility Support",
        rec: "Daily or every other day during flare-ups, then dial back to 2–3x per week for maintenance.",
      },
      {
        goal: "Introductory / First-Timer",
        rec: "Start with 3–4 sessions in your first two weeks to establish a baseline response, then build your ideal cadence.",
      },
    ],
    faqsHeadline: "FAQs — Red Light Therapy in Riverton",
    faqs: [
      {
        q: "Where is Zivel Riverton located?",
        a: "We're at 2722 W 12600 S #1, Riverton, UT 84065 — with free parking right outside. Easy access from Herriman, Bluffdale, and South Jordan.",
      },
      {
        q: "What red light therapy services does Zivel Riverton offer?",
        a: "We offer full body red light therapy and targeted red light sessions. Both use professional-grade panels delivering red and near-infrared wavelengths. Sessions can be booked individually or as part of a membership.",
      },
      {
        q: "How much does red light therapy cost at Zivel Riverton?",
        a: "Single sessions start at $30. Members receive discounted rates — memberships start at $99/month. Stacking multiple services in one visit is a popular way to get more value per trip.",
      },
      {
        q: "What are Zivel Riverton's hours?",
        a: "Mon & Wed 7am–8pm, Tue & Thu 10am–8pm, Fri 8am–8pm, Sat 9am–8pm, Sun 10am–2pm. Book in advance to secure your preferred time.",
      },
      {
        q: "How long is a red light therapy session?",
        a: "Most sessions run 15–20 minutes. Add a few minutes for check-in and setup. You can often complete a full session and be back in your day within 30 minutes.",
      },
      {
        q: "Does red light therapy hurt or feel uncomfortable?",
        a: "No — RLT is non-invasive and generally very comfortable. Most clients feel a mild warmth or nothing at all. There is no UV light involved, and sessions do not cause burns or skin damage.",
      },
      {
        q: "What should I wear to my red light therapy session?",
        a: "Wear minimal clothing or a swimsuit to maximize skin exposure to the light panels. We provide eye protection. Remove any metal jewelry or accessories before your session.",
      },
      {
        q: "Can I combine red light therapy with other services at Zivel Riverton?",
        a: "Absolutely. Our most popular stack is cryotherapy → red light therapy → compression therapy. You can book multiple services in a single visit. Our team can help you sequence them based on your goals.",
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
        name: "Ashley M.",
        location: "Riverton, UT",
        quote:
          "I started doing red light therapy twice a week and within a month my skin looked noticeably better. I sleep better too. It's become a non-negotiable part of my week.",
      },
      {
        name: "Jason K.",
        location: "South Jordan, UT",
        quote:
          "I stack red light with cryo after my long runs. My legs recover so much faster — I used to dread Monday runs after a hard weekend. Not anymore.",
      },
      {
        name: "Natalie R.",
        location: "Herriman, UT",
        quote:
          "The staff here are so knowledgeable. They helped me figure out the right frequency for my goals. I've been coming for six months and I won't stop.",
      },
    ],
    ctaHeadline: "Book Your Red Light Session at Zivel Riverton",
    ctaBody:
      "Recovery. Better skin. More energy. Join clients across Riverton, Herriman, Bluffdale, and South Jordan who have made red light therapy part of their weekly wellness routine.",
  },

  "utah/riverton/infrared-sauna": {
    h1: "Infrared Sauna in Riverton, UT",
    subtitle:
      "Deep-penetrating infrared heat therapy for detoxification, muscle recovery, stress relief, and improved circulation at Zivel Riverton",
    servingLine: "Serving Riverton, Herriman, Bluffdale, and South Jordan",
    trustBar: [
      { stat: "200+", label: "5-Star Reviews" },
      { stat: "1,000s", label: "Sessions Delivered" },
      { stat: "Since 2023", label: "Serving Riverton" },
    ],
    bookingCtaLabel: "Book Your Sauna Session",
    heroImage: "/images/services/infrared-sauna/hero.jpg",
    heroImageAlt: "Infrared sauna at Zivel Riverton",
    whatIsTagline: "The Treatment",
    whatIsHeadline: "What is Infrared Sauna?",
    whatIsParagraphs: [
      "Infrared saunas use light-based heat that penetrates more deeply than traditional hot-air saunas — warming your body from the inside out rather than just heating the surrounding air.",
      "Unlike conventional saunas that can feel stifling and humid, infrared heat is gentle and comfortable. Sessions at Zivel Riverton are private, relaxing, and easy to fit into your weekly routine.",
      "Whether your goal is muscle recovery, stress relief, better sleep, or simply a deep, cleansing sweat — infrared sauna delivers a restorative experience that clients come back to week after week.",
    ],
    whatIsOverviewLabel: "Full Infrared Sauna Overview →",
    whatIsOverviewHref: "/services/infrared-sauna",
    whatIsImage: "/images/services/infrared-sauna/intro.jpg",
    whatIsImageAlt: "Infrared sauna session at Zivel Riverton",
    localExpect: [
      {
        title: "Private Sessions",
        body: "Each infrared sauna session at Zivel Riverton takes place in your own private room — fully comfortable and designed for deep relaxation.",
      },
      {
        title: "Clean, Maintained Equipment",
        body: "Our sauna units are cleaned between every session and maintained to the highest standards for a safe, effective experience every time.",
      },
      {
        title: "Easy Parking",
        body: "Free parking right outside the studio. Walk in, unwind, and leave feeling like a new person — no hassle.",
      },
      {
        title: "Stack Your Session",
        body: "Pair infrared sauna with compression therapy, red light therapy, or dry float on the same visit for a complete recovery and wellness protocol.",
      },
    ],
    benefitsTagline: "Why Infrared Sauna",
    benefits: [
      { title: "Relaxation & Stress Support", body: "Heat-based sessions provide a deep, calming reset that helps lower tension and quiet a busy mind after a long day or hard week." },
      { title: "Supports Muscle Recovery", body: "Infrared heat increases circulation and may help relieve post-workout soreness — often used the day after intense training." },
      { title: "Circulation & Blood Flow", body: "Heat promotes vasodilation, supporting healthy blood flow throughout the body and contributing to overall cardiovascular wellness." },
      { title: "Sweat-Based Detox Support", body: "A deep, sustained sweat helps your body flush out impurities. Many clients describe feeling noticeably lighter and clearer after sessions." },
      { title: "Sleep Routine Support", body: "Used by many clients as part of an evening wind-down. The relaxation response from infrared heat can make it easier to fall and stay asleep." },
      { title: "Pairs with Other Modalities", body: "Stacks naturally with compression therapy, red light therapy, and dry float for a comprehensive recovery and wellness visit." },
    ],
    benefitsScienceHref: "/science/infrared-sauna",
    servicesHeading: "Infrared Sauna Services at Zivel Riverton",
    services: [
      {
        name: "Infrared Sauna Session",
        desc: "A 20–25 minute private infrared sauna session delivering comfortable, penetrating heat. Supports muscle recovery, circulation, stress relief, and detoxification. Great as a standalone session or as part of a recovery stack.",
        price: "$35 / session",
      },
      {
        name: "Extended Infrared Session",
        desc: "A longer 30–35 minute session for clients looking for a deeper, more immersive experience. Ideal for those working on chronic tension, enhanced detoxification goals, or a fuller relaxation reset.",
        price: "$35 / session",
      },
    ],
    frequencyHeadline: "How Often Should You Use Infrared Sauna?",
    frequency: [
      {
        goal: "General Wellness & Stress Relief",
        rec: "1–3x per week. A consistent routine is what builds the cumulative benefits — even once a week makes a meaningful difference.",
      },
      {
        goal: "Athletic Recovery & Post-Training",
        rec: "2–4x per week, typically on training days or the day after. Heat exposure supports circulation and muscle recovery when used regularly.",
      },
      {
        goal: "Detoxification & Cleansing Goals",
        rec: "3–5x per week during an active detox phase, then dial back to 1–2x per week for ongoing maintenance.",
      },
      {
        goal: "Sleep & Evening Wind-Down",
        rec: "2–3x per week in the evening. Many clients schedule sauna sessions 1–2 hours before bed to support their sleep routine.",
      },
    ],
    faqsHeadline: "FAQs — Infrared Sauna in Riverton",
    faqs: [
      {
        q: "Where is Zivel Riverton located?",
        a: "We're at 2722 W 12600 S #1, Riverton, UT 84065 — free parking right outside the studio. Easy access from Herriman, Bluffdale, and South Jordan.",
      },
      {
        q: "What infrared sauna services does Zivel Riverton offer?",
        a: "We offer private infrared sauna sessions in standard (20–25 min) and extended (30–35 min) formats. Sessions can be booked individually or as part of a membership.",
      },
      {
        q: "How much does infrared sauna cost at Zivel Riverton?",
        a: "Single sessions start at $35. Members receive discounted rates — memberships start at $99/month. Stacking sauna with other services is a popular way to maximize each visit.",
      },
      {
        q: "What are Zivel Riverton's hours?",
        a: "Mon & Wed 7am–8pm, Tue & Thu 10am–8pm, Fri 8am–8pm, Sat 9am–8pm, Sun 10am–2pm. Book in advance to secure your preferred time slot.",
      },
      {
        q: "How long is an infrared sauna session?",
        a: "Standard sessions are 20–25 minutes. Extended sessions run 30–35 minutes. Add a few minutes for check-in. Most clients are in and out within 45 minutes total.",
      },
      {
        q: "Is infrared sauna safe? Are there any restrictions?",
        a: "Infrared sauna is generally well-tolerated by healthy adults when properly hydrated and when session length is appropriate. We recommend consulting your healthcare provider if you are pregnant, have uncontrolled blood pressure, heat sensitivity, or are on medications that affect heat tolerance. Our team will review any relevant health considerations before your session.",
      },
      {
        q: "What should I wear to my infrared sauna session?",
        a: "Wear minimal clothing — a swimsuit or comfortable undergarments work best. Greater skin exposure maximizes the effectiveness of infrared heat. Each session is fully private.",
      },
      {
        q: "Can I combine infrared sauna with other services at Zivel Riverton?",
        a: "Absolutely. A popular recovery stack is infrared sauna → compression therapy → red light therapy. You can book multiple services in a single visit and our team can help you sequence them based on your goals.",
      },
    ],
    pathways: [
      {
        slug: "stress-sleep-reset",
        name: "Stress & Sleep Reset",
        tagline: "A structured approach to reducing chronic stress, improving sleep quality, and restoring your body's natural recovery rhythms.",
      },
      {
        slug: "recovery-pain-support",
        name: "Recovery & Pain Support",
        tagline: "A structured approach to reducing soreness, managing inflammation, and getting back to full capacity faster.",
      },
    ],
    testimonials: [
      {
        name: "Rachel P.",
        location: "Riverton, UT",
        quote:
          "I started doing infrared sauna twice a week and it has completely changed how I handle stress. I sleep better, I'm less tense, and I feel lighter. I wish I'd started sooner.",
      },
      {
        name: "Tyler B.",
        location: "Herriman, UT",
        quote:
          "I use the sauna the day after my long training runs. My legs recover so much faster now — it's become a non-negotiable part of my weekly routine.",
      },
      {
        name: "Sarah W.",
        location: "South Jordan, UT",
        quote:
          "The private rooms, the comfortable heat, the staff — everything about Zivel Riverton is a cut above. The sauna is my favorite way to end a hard week.",
      },
    ],
    ctaHeadline: "Book Your Sauna Session at Zivel Riverton",
    ctaBody:
      "Deep heat. Faster recovery. Real relaxation. Join clients across Riverton, Herriman, Bluffdale, and South Jordan who have made infrared sauna a cornerstone of their weekly wellness routine.",
  },

  "utah/riverton/cryo-slimming": {
    h1: "Cryo Slimming in Riverton, UT",
    subtitle:
      "Advanced cryo slimming and body contouring for targeted fat reduction and skin tightening at Zivel Riverton",
    servingLine: "Serving Riverton, Herriman, Bluffdale, and South Jordan",
    trustBar: [
      { stat: "200+", label: "5-Star Reviews" },
      { stat: "1,000s", label: "Sessions Delivered" },
      { stat: "Since 2023", label: "Serving Riverton" },
    ],
    bookingCtaLabel: "Book Your Cryo Slimming Session",
    heroImage: "/images/services/cryo-slimming/hero.jpg",
    heroImageAlt: "Cryo slimming body contouring at Zivel Riverton",
    whatIsTagline: "The Treatment",
    whatIsHeadline: "What is Cryo Slimming?",
    whatIsParagraphs: [
      "Cryo Slimming is a non-invasive body contouring service that uses controlled cold temperatures to target areas where clients want to reduce stubborn fat — without surgery, needles, or required downtime.",
      "At Zivel Riverton, sessions are private, comfortable, and guided by trained staff who take the time to understand your goals and set realistic expectations from day one.",
      "Most clients use Cryo Slimming as part of a broader wellness routine — often pairing it with red light therapy or compression for a more complete contouring and recovery visit.",
    ],
    whatIsOverviewLabel: "Full Cryo Slimming Overview →",
    whatIsOverviewHref: "/services/cryo-slimming",
    whatIsImage: "/images/services/cryo-slimming/science.avif",
    whatIsImageAlt: "Cryo slimming treatment at Zivel Riverton",
    localExpect: [
      {
        title: "Personalized Consultation",
        body: "Every cryo slimming visit at Zivel Riverton starts with a goal-setting conversation. Your specialist will walk you through the treatment, identify target areas, and tailor the session to your body composition goals.",
      },
      {
        title: "Private, Comfortable Sessions",
        body: "Sessions take place in a private room using professional-grade cooling applicators. Most clients find the experience comfortable and easy to work into a regular routine.",
      },
      {
        title: "Easy Parking",
        body: "Free parking right outside the studio. Walk in, get your session done, and head back to your day — no hassle, no downtime required.",
      },
      {
        title: "Stack Your Visit",
        body: "Many clients pair cryo slimming with red light therapy or compression on the same visit to support circulation and complement the body contouring effects.",
      },
    ],
    benefitsTagline: "Why Cryo Slimming",
    benefits: [
      { title: "Targets Stubborn Fat Areas", body: "Controlled cold is applied to specific zones — abdomen, thighs, arms, flanks — where diet and exercise alone often fall short." },
      { title: "Non-Invasive, No Downtime", body: "No needles, no surgery, and no recovery period. Most clients return to normal activities immediately after sessions." },
      { title: "Skin Tightening Support", body: "Cold-based contouring protocols are often paired with red light therapy to support skin firmness alongside fat reduction goals." },
      { title: "Comfortable Treatment Experience", body: "Most clients describe sessions as tolerable and relaxing. Many use the time to decompress between other wellness services." },
      { title: "Natural-Looking, Gradual Results", body: "Results develop progressively as the body processes treated areas over several weeks — delivering subtle, natural changes rather than dramatic overnight shifts." },
      { title: "Pairs with Wellness Routines", body: "Often stacked with red light therapy, compression, or cryotherapy for a complete wellness and body contouring visit at Zivel Riverton." },
    ],
    benefitsScienceHref: "/science/cold-exposure",
    servicesHeading: "Cryo Slimming Services at Zivel Riverton",
    services: [
      {
        name: "Cryo Slimming Session",
        desc: "A single-area cryo slimming session using cooling applicators to target stubborn fat in a specific zone — abdomen, thighs, flanks, or arms. Includes consultation to identify the right target area and session parameters for your goals.",
        price: "$75 / session",
      },
      {
        name: "Cryo Slimming Series",
        desc: "A multi-session series spaced over several weeks to build on cumulative results. Best suited for clients with specific contouring goals who want consistent progress over time. Series pricing provides better value than individual sessions.",
        price: "From $250 / series",
      },
    ],
    frequencyHeadline: "How Often Should You Do Cryo Slimming?",
    frequency: [
      {
        goal: "Initial Contouring Phase",
        rec: "1–2x per week for 4–6 weeks. Consistent spacing allows the body to process treated fat cells between sessions for optimal cumulative results.",
      },
      {
        goal: "Maintenance After Initial Series",
        rec: "Once or twice per month once target results are achieved. Regular maintenance sessions help sustain progress alongside diet and activity.",
      },
      {
        goal: "Skin Tightening Focus",
        rec: "Pair with red light therapy at each visit. The combination of cold contouring and light-based collagen stimulation supports both fat reduction and skin firmness goals.",
      },
      {
        goal: "Stacking with Other Services",
        rec: "Cryo slimming → red light therapy → compression is a popular same-visit sequence. The order supports circulation and maximizes the window of effect from each modality.",
      },
    ],
    faqsHeadline: "FAQs — Cryo Slimming in Riverton",
    faqs: [
      {
        q: "Where is Zivel Riverton located?",
        a: "We're at 2722 W 12600 S #1, Riverton, UT 84065 — free parking right outside the studio. Conveniently accessible from Herriman, Bluffdale, and South Jordan.",
      },
      {
        q: "What cryo slimming services does Zivel Riverton offer?",
        a: "We offer single-area cryo slimming sessions and multi-session series packages. Sessions can be booked individually or as part of a membership plan. Common target areas include abdomen, thighs, flanks, and arms.",
      },
      {
        q: "How much does cryo slimming cost at Zivel Riverton?",
        a: "Single sessions start at $75. Series packages start at $250 and offer better value for clients committing to a full contouring protocol. Members receive discounted rates — memberships start at $99/month.",
      },
      {
        q: "What are Zivel Riverton's hours?",
        a: "Mon & Wed 7am–8pm, Tue & Thu 10am–8pm, Fri 8am–8pm, Sat 9am–8pm, Sun 10am–2pm. Book in advance to secure your preferred appointment.",
      },
      {
        q: "How long is a cryo slimming session?",
        a: "Sessions typically run 30–45 minutes depending on the target area and protocol. Add a few minutes for check-in and consultation. Most clients are in and out within an hour.",
      },
      {
        q: "How many sessions will I need to see results?",
        a: "Most clients see visible changes after 3–6 sessions spaced consistently over several weeks. Results develop gradually as the body processes treated fat cells — a series of sessions typically delivers the best outcome.",
      },
      {
        q: "Is cryo slimming safe? Are there any restrictions?",
        a: "Cryo Slimming is generally well tolerated when administered by trained professionals. We recommend consulting your healthcare provider if you are pregnant, have cold sensitivity, circulatory disorders, or active skin conditions in the treatment area. Our team reviews your health history before every session.",
      },
      {
        q: "Can I combine cryo slimming with other services at Zivel Riverton?",
        a: "Yes — and we encourage it. A popular visit sequence is cryo slimming → red light therapy → compression. Red light supports skin tightening and collagen, while compression promotes circulation. Our team can help you plan a complete visit based on your goals.",
      },
    ],
    pathways: [
      {
        slug: "body-composition-metabolic-support",
        name: "Body Composition & Metabolic Support",
        tagline: "A structured wellness pathway designed to support body composition goals using non-invasive modalities as part of a broader health journey.",
      },
      {
        slug: "skin-health-regenerative-aesthetics",
        name: "Skin Health & Regenerative Aesthetics",
        tagline: "A structured approach to supporting skin health, firmness, and long-term appearance goals using non-invasive modalities and consistent protocols.",
      },
    ],
    testimonials: [
      {
        name: "Alicia M.",
        location: "Riverton, UT",
        quote:
          "I've been doing cryo slimming once a week for about six weeks and I can already see a noticeable difference in my midsection. The staff at Zivel Riverton made me feel comfortable from the very first session.",
      },
      {
        name: "Jason K.",
        location: "South Jordan, UT",
        quote:
          "I paired the cryo slimming sessions with red light therapy and the results have been great. No downtime, no discomfort — I fit it in on my lunch break and go right back to work.",
      },
      {
        name: "Natalie R.",
        location: "Herriman, UT",
        quote:
          "I was nervous to try something like this but the team walked me through everything. Three sessions in and my clothes are fitting noticeably better. I'm hooked.",
      },
    ],
    ctaHeadline: "Book Your Cryo Slimming Session at Zivel Riverton",
    ctaBody:
      "Non-invasive. No downtime. Real results. Join clients across Riverton, Herriman, Bluffdale, and South Jordan who are using cryo slimming to target stubborn areas and support their body composition goals.",
  },

  "utah/riverton/dry-float": {
    h1: "Dry Float Therapy in Riverton, UT",
    subtitle:
      "Zero-gravity dry float therapy for profound relaxation, recovery, and mental clarity at Zivel Riverton",
    servingLine: "Serving Riverton, Herriman, Bluffdale, and South Jordan",
    trustBar: [
      { stat: "200+", label: "5-Star Reviews" },
      { stat: "1,000s", label: "Sessions Delivered" },
      { stat: "Since 2023", label: "Serving Riverton" },
    ],
    bookingCtaLabel: "Book Your Dry Float Session",
    heroImage: "/images/services/dry-float/hero.jpg",
    heroImageAlt: "Dry float therapy session at Zivel Riverton",
    whatIsTagline: "The Treatment",
    whatIsHeadline: "What is Dry Float Therapy?",
    whatIsParagraphs: [
      "Dry Float therapy delivers many of the deep relaxation benefits of traditional floating — without water or Epsom salt. You lie on a soft membrane while warm water below creates a weightless, zero-gravity sensation that melts away tension and quiets the nervous system.",
      "Unlike traditional float tanks, you remain fully clothed and completely dry throughout the session. There's no prep, no showering, and no adjustment period — you simply lie back, relax, and let your body reset.",
      "At Zivel Riverton, every dry float session is guided by our team, designed to be easy and seamless whether you're using it for stress relief, post-workout recovery, or simply as a restorative break in your week.",
    ],
    whatIsOverviewLabel: "Full Dry Float Therapy Overview →",
    whatIsOverviewHref: "/services/dry-float",
    whatIsImage: "/images/services/dry-float/intro.jpg",
    whatIsImageAlt: "Client relaxing on dry float bed at Zivel Riverton",
    localExpect: [
      {
        title: "Friendly, Expert Staff",
        body: "Our Riverton team gets you set up, answers any questions, and ensures the session is as comfortable and restorative as possible — first visit or fiftieth.",
      },
      {
        title: "Clean, Peaceful Environment",
        body: "Zivel Riverton's dry float room is designed specifically for deep relaxation. Dim lighting, ambient sound, and a calm atmosphere help your nervous system fully unwind.",
      },
      {
        title: "Easy Parking",
        body: "Free parking right outside the studio. No stress, no circling — just walk in, float, and leave feeling reset.",
      },
      {
        title: "Stack Your Session",
        body: "Many clients pair dry float with red light therapy, infrared sauna, or compression therapy in a single visit for a complete relaxation and recovery experience.",
      },
    ],
    benefitsTagline: "Why Dry Float",
    benefits: [
      {
        title: "Deep Relaxation & Stress Reduction",
        body: "Many clients use dry float as a nervous system reset — quiet, calm, and restorative. A single session can shift your entire mood and stress state.",
      },
      {
        title: "Supports Recovery Days",
        body: "A weightless-feeling session reduces the physical load on muscles and joints, making it an excellent tool on rest days or after intense training blocks.",
      },
      {
        title: "May Support Sleep Routines",
        body: "Often used in evening routines or high-stress weeks to promote deep relaxation before bed, helping you wind down and fall asleep more easily.",
      },
      {
        title: "Mental Clarity & Mood Support",
        body: "Quiet time and reduced sensory input help many clients emerge from sessions feeling clear-headed, refreshed, and emotionally reset.",
      },
      {
        title: "Comfortable and Accessible",
        body: "You stay fully clothed and completely dry throughout. No prep, no shower required. It's one of the most accessible recovery and relaxation services we offer.",
      },
      {
        title: "Stacks Well with Other Modalities",
        body: "Dry float pairs naturally with red light therapy, infrared sauna, and compression — creating a full-body relaxation and recovery session in a single visit.",
      },
    ],
    benefitsScienceHref: "/science/recovery-modalities-float-compression",
    servicesHeading: "Dry Float Services at Zivel Riverton",
    services: [
      {
        name: "Dry Float Session",
        desc: "A single dry float session on our premium Starpool float bed. Warm water beneath the membrane creates a zero-gravity feel while you relax fully clothed. Most clients experience profound relaxation within the first few minutes. Sessions typically run 20–30 minutes.",
        price: "$65 / session",
      },
      {
        name: "Dry Float Membership",
        desc: "Unlock regular dry float sessions as part of a Zivel wellness membership. Members enjoy discounted per-session rates, priority booking, and the ability to stack dry float with other services on the same visit. Ask our Riverton team about current membership options.",
        price: "Members save — from $99/mo",
      },
    ],
    frequencyHeadline: "How Often Should You Do Dry Float Therapy?",
    frequency: [
      {
        goal: "Stress Relief & Nervous System Reset",
        rec: "1–2x per week for ongoing stress management. A single session can shift your entire stress state — consistent weekly sessions build a cumulative relaxation baseline.",
      },
      {
        goal: "Athletic Recovery & Rest Days",
        rec: "Once or twice per week on rest days or after hard training blocks. The zero-gravity environment reduces load on the body and supports active recovery without adding physical stress.",
      },
      {
        goal: "Sleep & Evening Routine Support",
        rec: "1–2x per week, ideally in the afternoon or evening. Many clients notice improved sleep quality after making dry float a regular part of their wind-down routine.",
      },
      {
        goal: "First-Timer",
        rec: "Start with 2–3 sessions in your first two weeks to experience how your body and mind respond. Many people find their ideal rhythm quickly — our Riverton team can help you plan.",
      },
    ],
    faqsHeadline: "FAQs — Dry Float Therapy in Riverton",
    faqs: [
      {
        q: "Where is Zivel Riverton located?",
        a: "We're at 2722 W 12600 S #1, Riverton, UT 84065 — free parking right outside the studio. Easily accessible from Herriman, Bluffdale, and South Jordan.",
      },
      {
        q: "How much does dry float therapy cost at Zivel Riverton?",
        a: "Single sessions are $65. Members receive discounted rates — memberships start at $99/month and include access to dry float alongside other services. Ask our team about current membership options when you visit.",
      },
      {
        q: "What are Zivel Riverton's hours?",
        a: "Mon & Wed 7am–8pm, Tue & Thu 10am–8pm, Fri 8am–8pm, Sat 9am–8pm, Sun 10am–2pm. We recommend booking ahead to secure your preferred time slot.",
      },
      {
        q: "Do I get wet during a dry float?",
        a: "No — you stay completely dry throughout the entire session. You lie on a soft membrane surface while warm water underneath creates the floating sensation. There's no water contact at all.",
      },
      {
        q: "What should I wear to a dry float session?",
        a: "Comfortable clothing works perfectly. Many clients choose athletic wear, joggers, or loungewear. You don't need to change and there's no showering before or after.",
      },
      {
        q: "How long is a dry float session at Zivel Riverton?",
        a: "Sessions typically run 20–30 minutes. Add a few minutes for check-in and getting settled. Most clients are in and out within 45 minutes total.",
      },
      {
        q: "How often should I do dry float therapy?",
        a: "Most clients benefit from 1–2 sessions per week. For stress management and sleep support, consistency matters more than frequency — even one session per week makes a meaningful difference over time.",
      },
      {
        q: "Can I combine dry float with other services at Zivel Riverton?",
        a: "Absolutely — and many clients do. Dry float pairs especially well with red light therapy, infrared sauna, and compression therapy. You can book multiple services in a single visit. Our staff can help you sequence them based on your goals.",
      },
    ],
    pathways: [
      {
        slug: "recovery-pain-support",
        name: "Recovery & Pain Support",
        tagline: "A structured approach to reducing soreness, managing inflammation, and getting back to full capacity faster.",
      },
      {
        slug: "stress-sleep-reset",
        name: "Stress & Sleep Reset",
        tagline: "A wellness pathway designed to reduce chronic stress, calm the nervous system, and restore healthy sleep patterns.",
      },
    ],
    testimonials: [
      {
        name: "Lauren P.",
        location: "Riverton, UT",
        quote:
          "I had no idea what to expect from dry float but I was completely sold after my first session. Twenty minutes in and I felt like I'd slept for eight hours. I use it every week now.",
      },
      {
        name: "Tyler M.",
        location: "South Jordan, UT",
        quote:
          "I started doing dry float on my rest days and it's made a huge difference in my recovery. No soreness the next day, better sleep, and I feel mentally sharper all week. It's become a non-negotiable.",
      },
      {
        name: "Stephanie A.",
        location: "Herriman, UT",
        quote:
          "I've been going through a stressful stretch at work and dry float has been a game changer. One session and I feel completely reset. The staff at Zivel Riverton are so welcoming and the environment is incredibly peaceful.",
      },
    ],
    ctaHeadline: "Book Your Dry Float Session at Zivel Riverton",
    ctaBody:
      "Weightless. Restorative. Completely dry. Join clients across Riverton, Herriman, Bluffdale, and South Jordan who have made dry float therapy a cornerstone of their weekly wellness and recovery routine.",
  },

  "utah/riverton/cryo-lift-facial": {
    h1: "CryoLift Facial in Riverton, UT",
    subtitle:
      "Cryogenic facial therapy for tighter, brighter, and rejuvenated skin at Zivel Riverton",
    servingLine: "Serving Riverton, Herriman, Bluffdale, and South Jordan",
    trustBar: [
      { stat: "200+", label: "5-Star Reviews" },
      { stat: "1,000s", label: "Sessions Delivered" },
      { stat: "Since 2023", label: "Serving Riverton" },
    ],
    bookingCtaLabel: "Book Your CryoLift Facial",
    heroImage: "/images/services/cryo-lift-facial/hero.avif",
    heroImageAlt: "CryoLift Facial session at Zivel Riverton",
    whatIsTagline: "The Treatment",
    whatIsHeadline: "What is a CryoLift Facial?",
    whatIsParagraphs: [
      "CryoLift Facial is a non-invasive facial service that uses controlled cold exposure and targeted technique to support skin appearance — firmer-looking skin, reduced puffiness, and a visible post-session glow, all without needles, surgery, or downtime.",
      "Unlike traditional facials, the CryoLift uses cold therapy to temporarily tighten the skin, support collagen-producing pathways, and de-puff the face — making it a popular choice both as a regular skin routine and ahead of events, weddings, and photoshoots.",
      "At Zivel Riverton, every CryoLift Facial is performed by trained staff using professional-grade cryo tools. Sessions are comfortable, quick, and easy to fit into your schedule — with results you can see and feel immediately.",
    ],
    whatIsOverviewLabel: "Full CryoLift Facial Overview →",
    whatIsOverviewHref: "/services/cryo-lift-facial",
    whatIsImage: "/images/services/cryo-lift-facial/science.avif",
    whatIsImageAlt: "CryoLift Facial treatment at Zivel Riverton",
    localExpect: [
      {
        title: "Trained Aesthetic Professionals",
        body: "Our Riverton team delivers every CryoLift Facial with precision and care — tailoring the technique to your skin's needs and ensuring a comfortable, effective session.",
      },
      {
        title: "Professional Cryo Equipment",
        body: "Zivel Riverton uses clinical-grade cryo facial tools maintained to the highest standards for consistent, reliable results session after session.",
      },
      {
        title: "Easy Parking",
        body: "Free parking right outside the studio. Walk in, get your facial, and leave glowing — no stress, no circling.",
      },
      {
        title: "Stack Your Session",
        body: "Many clients pair a CryoLift Facial with red light therapy for a complete skin-health protocol in a single visit. Our team can help you build the right sequence.",
      },
    ],
    benefitsTagline: "Why CryoLift Facial",
    benefits: [
      {
        title: "Supports a Refreshed, Glowing Look",
        body: "A visible post-session glow and refreshed appearance are among the most commonly reported results. Many clients use it specifically for this immediate effect.",
      },
      {
        title: "Helps Reduce the Look of Puffiness",
        body: "Cold exposure is highly effective at de-puffing — supporting a sculpted, more defined facial appearance without any invasive procedures.",
      },
      {
        title: "Supports Firmer-Looking Skin",
        body: "Targeted cryo technique is designed to support a tighter, firmer facial appearance — a popular alternative to more aggressive cosmetic procedures.",
      },
      {
        title: "Comfortable with Zero Downtime",
        body: "No recovery period, no redness, no swelling. Most clients return to their normal day — or their event — immediately after the session.",
      },
      {
        title: "Pairs Well with Red Light Therapy",
        body: "CryoLift Facial and red light therapy make a powerful skin-health stack. Cold supports tightening and de-puffing; red light supports collagen and cellular recovery.",
      },
      {
        title: "Ideal for Routine and Special Occasions",
        body: "Whether you book regularly as part of an ongoing skin routine or before weddings, photoshoots, and special events — CryoLift delivers a consistent, visible result.",
      },
    ],
    benefitsScienceHref: "/science/cold-exposure",
    servicesHeading: "CryoLift Facial Services at Zivel Riverton",
    services: [
      {
        name: "CryoLift Facial Session",
        desc: "A full CryoLift Facial performed by our trained Riverton team. Controlled cold exposure is applied to the face and neck using targeted technique to reduce puffiness, support skin tightening, and deliver a visible glow. Sessions run approximately 20–30 minutes with no downtime required.",
        price: "$150 / session",
      },
      {
        name: "CryoLift Facial Series",
        desc: "A foundation series of five sessions spaced approximately one week apart — designed to build cumulative results and establish a skin baseline. After the initial series, most clients move to maintenance sessions every 4–8 weeks. Series pricing provides better value than individual bookings.",
        price: "Ask about series pricing",
      },
    ],
    frequencyHeadline: "How Often Should You Get a CryoLift Facial?",
    frequency: [
      {
        goal: "Foundation Series (New Clients)",
        rec: "Begin with 5 sessions spaced about one week apart. This builds cumulative results and gives your skin time to respond to each session before the next.",
      },
      {
        goal: "Ongoing Maintenance",
        rec: "Every 4–8 weeks once your foundation series is complete. Regular maintenance sustains skin quality and keeps results consistent over time.",
      },
      {
        goal: "Special Occasion Prep",
        rec: "Book 1–3 days before your event for peak glow and de-puffing effect. Many clients combine this with their regular routine rather than relying on it as a one-off.",
      },
      {
        goal: "Skin-Stacking Protocol",
        rec: "Pair your CryoLift Facial with red light therapy at the same visit. The combination supports tightening, collagen stimulation, and lasting skin health together.",
      },
    ],
    faqsHeadline: "FAQs — CryoLift Facial in Riverton",
    faqs: [
      {
        q: "Where is Zivel Riverton located?",
        a: "We're at 2722 W 12600 S #1, Riverton, UT 84065 — free parking right outside the studio. Easily accessible from Herriman, Bluffdale, and South Jordan.",
      },
      {
        q: "How much does a CryoLift Facial cost at Zivel Riverton?",
        a: "Single sessions are $150. We also offer a foundation series of five sessions at a discounted rate — ask our team about current series and membership pricing when you visit.",
      },
      {
        q: "What are Zivel Riverton's hours?",
        a: "Mon & Wed 7am–8pm, Tue & Thu 10am–8pm, Fri 8am–8pm, Sat 9am–8pm, Sun 10am–2pm. We recommend booking in advance to secure your preferred appointment.",
      },
      {
        q: "Is there any downtime after a CryoLift Facial?",
        a: "No. Most clients return to their normal day immediately after the session. There's no redness, swelling, or recovery period — making it easy to book before work, events, or a night out.",
      },
      {
        q: "Is the CryoLift Facial painful?",
        a: "Most clients find it very comfortable. You'll feel cool sensations during the session, which are closely monitored by your provider. It's typically described as refreshing rather than uncomfortable.",
      },
      {
        q: "How long is a CryoLift Facial session at Zivel Riverton?",
        a: "Sessions typically run 20–30 minutes. Add a few minutes for check-in and consultation. Most clients are in and out within 45 minutes.",
      },
      {
        q: "How many sessions do I need to see results?",
        a: "Many clients notice a visible glow and reduced puffiness after their very first session. For longer-term skin tightening and texture improvements, a foundation series of five sessions spaced weekly is recommended, followed by regular maintenance every 4–8 weeks.",
      },
      {
        q: "Can I combine a CryoLift Facial with other services at Zivel Riverton?",
        a: "Absolutely. CryoLift Facial pairs especially well with red light therapy for a complete skin-health protocol in a single visit. Our Riverton team can help you build the right sequence based on your goals.",
      },
    ],
    pathways: [
      {
        slug: "skin-health-regenerative-aesthetics",
        name: "Skin Health & Regenerative Aesthetics",
        tagline: "A structured approach to supporting skin health, firmness, and long-term appearance goals using non-invasive modalities and consistent protocols.",
      },
      {
        slug: "longevity-healthy-aging",
        name: "Longevity & Healthy Aging",
        tagline: "A comprehensive wellness pathway focused on supporting long-term health, vitality, and graceful aging through science-backed modalities.",
      },
    ],
    testimonials: [
      {
        name: "Megan T.",
        location: "Riverton, UT",
        quote:
          "I booked a CryoLift Facial before my sister's wedding and I could not believe how my skin looked in photos. Instantly glowing, no puffiness, no downtime. I've made it part of my regular routine now.",
      },
      {
        name: "Rachel B.",
        location: "South Jordan, UT",
        quote:
          "I was skeptical about a cryo facial but the results genuinely surprised me. My skin felt tighter after the first session and the glow lasted for days. The staff at Zivel Riverton were incredible — professional, knowledgeable, and so welcoming.",
      },
      {
        name: "Cassandra W.",
        location: "Herriman, UT",
        quote:
          "I've done five sessions as part of the foundation series and the difference in my skin is real — less puffiness, tighter around my jawline, and just a consistent healthy glow. I pair it with red light therapy every time.",
      },
    ],
    ctaHeadline: "Book Your CryoLift Facial at Zivel Riverton",
    ctaBody:
      "Non-invasive. Zero downtime. Instantly glowing. Join clients across Riverton, Herriman, Bluffdale, and South Jordan who trust Zivel Riverton for professional cryo facial treatments that deliver visible results — every session.",
  },
};

export default async function LocalServicePage({ params }: Props) {
  const { state, city, service } = await params;
  const location = getLocationByPath(state, city);
  const svc = getServiceBySlug(service);
  if (!location || !svc) return notFound();

  const key = `${state}/${city}/${service}`;
  const local = LOCAL_CONTENT[key] ?? generateLocalContent(location, svc, state, city);

  const cityDisplay = city.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const stateDisplay = state.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
  const postalCode = location.contact?.address?.match(/\b\d{5}\b/)?.[0] ?? "";

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
      streetAddress: location.contact?.address?.split(",")[0]?.trim(),
      addressLocality: cityDisplay,
      addressRegion: location.state,
      postalCode,
      addressCountry: "US",
    },
    openingHoursSpecification: buildOpeningHoursSpec(location.hours),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: `${svc.name} Services`,
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
      { "@type": "ListItem", position: 3, name: stateDisplay, item: `${SITE_URL}/locations/${state}` },
      { "@type": "ListItem", position: 4, name: cityDisplay, item: `${SITE_URL}${locationPageUrl}` },
      { "@type": "ListItem", position: 5, name: svc.name, item: canonicalUrl },
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
    <main className="overflow-x-hidden">
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
        <ol className="mx-auto max-w-6xl flex flex-wrap items-center gap-1.5 text-xs text-white/60">
          <li><Link href="/" className="hover:text-white transition-colors">Home</Link></li>
          <li aria-hidden="true" className="text-white/30">/</li>
          <li><Link href="/locations" className="hover:text-white transition-colors">Locations</Link></li>
          <li aria-hidden="true" className="text-white/30">/</li>
          <li><Link href={`/locations/${state}`} className="hover:text-white transition-colors">{stateDisplay}</Link></li>
          <li aria-hidden="true" className="text-white/30">/</li>
          <li><Link href={locationPageUrl} className="hover:text-white transition-colors">{cityDisplay}</Link></li>
          <li aria-hidden="true" className="text-white/30">/</li>
          <li className="text-white/80">{svc.name}</li>
        </ol>
      </nav>

      {/* ========== HERO (DARK) ========== */}
      <section
        className="zv-bleed bg-black text-white"
        style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}
      >
        <div className="relative overflow-hidden" style={{ minHeight: 480 }}>
          <Image
            src={local.heroImage}
            alt={local.heroImageAlt}
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
                {local.bookingCtaLabel}
              </a>
              <Link href={servicePageUrl} className="zv-btn-luxury zv-btn-outline">
                View {svc.name} Overview
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
            {local.trustBar.map((t, i) => (
              <div key={t.label}>
                <div className="font-serif text-3xl md:text-4xl text-[var(--zivel-gold)] font-light">
                  {t.stat}
                </div>
                <div className="mt-1 text-sm text-white/55 uppercase tracking-widest">{t.label}</div>
                {i === 0 && state === "utah" && city === "riverton" && (
                  <div className="mt-3 flex justify-center">
                    <Image
                      src="/images/badges/best-of-slc.avif"
                      alt="Best of SLC Award — Zivel Riverton"
                      width={72}
                      height={72}
                      style={{ width: 72, height: "auto" }}
                      className="object-contain"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========== WHAT IS IT (DARK) ========== */}
      <section className="zv-bleed zv-immersive-section zv-section-elevated" style={{ position: "relative", width: "100vw", left: "50%", transform: "translateX(-50%)" }}>
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
            <ScrollReveal variant="fade-right">
              <p className="zv-tagline mb-4">{local.whatIsTagline}</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-6">
                {local.whatIsHeadline}
              </h2>
              <div className="space-y-4 text-white/70 text-lg leading-relaxed">
                {local.whatIsParagraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href={local.whatIsOverviewHref} className="text-[var(--zivel-gold)] text-sm hover:underline">
                  {local.whatIsOverviewLabel}
                </Link>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-left">
              <div className="rounded-2xl overflow-hidden">
                <Image
                  src={local.whatIsImage}
                  alt={local.whatIsImageAlt}
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
                  <p className="text-sm text-black/70 leading-relaxed">{item.body}</p>
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
            <p className="zv-tagline mb-4">{local.benefitsTagline}</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light tracking-tight mb-14">
              Key Benefits
            </h2>
          </ScrollReveal>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {local.benefits.map((b, idx) => (
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
            <Link href={local.benefitsScienceHref} className="text-[var(--zivel-gold)] text-sm hover:underline">
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
              {local.servicesHeading}
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
                      aria-label={`Book your ${s.name} session`}
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
              {local.frequencyHeadline}
            </h2>
            <p className="text-white/60 text-lg mb-14 max-w-2xl">
              The right frequency depends on your goals. Here&apos;s a general starting point — our {cityDisplay} team can help you dial in the ideal schedule.
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
                  <Link href={locationPageUrl} scroll={true} className="zv-btn-luxury zv-btn-gold">
                    View {cityDisplay} Location
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
              {local.faqsHeadline}
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
              What Clients in {cityDisplay} Say
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
                    <p className="text-white/60 text-xs mt-0.5">{t.location}</p>
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
              {local.ctaHeadline}
            </h2>
            <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-2xl mx-auto">
              {local.ctaBody}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="zv-btn-luxury zv-btn-gold"
              >
                {local.bookingCtaLabel}
              </a>
              <Link href={locationPageUrl} scroll={true} className="zv-btn-luxury zv-btn-outline">
                Back to {location.name}
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
