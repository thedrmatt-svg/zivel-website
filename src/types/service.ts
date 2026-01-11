export type AccentName =
  | "neutral"
  | "cryo-blue"
  | "red"
  | "amber"
  | "green"
  | "purple"
  | "gold";

export type Accent = {
  name: AccentName;
  hex: string;
};

export type Media = {
  type: "image" | "video";
  src: string; // in /public (e.g., "/images/services/cryotherapy/hero.jpg")
  alt?: string; // required for images, optional for videos
  poster?: string; // for video poster image
};

export type CTA = {
  label: string;
  href: string; // "#book", "/locations", etc.
};

export type BenefitItem = {
  title: string;
  description?: string;
  icon?: string; // optional: icon name or path
  /**
   * Citation IDs that link to the Science/Research system.
   * Example: ["cryo-001", "cryo-003"]
   */
  citations?: string[];
};

export type HowItWorksStep = {
  title: string;
  description: string;
  icon?: string;
};

export type ScienceSection = {
  headline: string;
  body: string[]; // paragraphs
  media?: Media; // diagram or photo
  cta?: CTA; // "Learn More in the Science Hub"
};

export type SafetySection = {
  headline: string; // "Is it safe?"
  body: string[]; // paragraphs
  contraindications: string[]; // list
  disclaimer: string;
};

export type BeforeAfterItem = {
  beforeSrc: string;
  afterSrc: string;
  alt: string;
};

export type TestimonialItem = {
  name: string;
  location?: string; // city or studio
  quote: string;
  headshotSrc?: string; // optional
};

export type PricingCard = {
  title: string; // "Single Session", "Member Rate", "Packages"
  priceLine: string; // "$XX" or "From $XX"
  details: string[]; // bullet lines
  cta?: CTA; // "View Memberships"
};

export type FAQItem = {
  question: string;
  answer: string;
};

export type ServiceSEO = {
  title: string;
  description: string;
  canonical?: string;
};

export type Service = {
  // Identity
  slug: string; // URL slug
  name: string; // H1
  accent: Accent;

  // SECTION 1 — HERO
  hero: {
    media?: Media; // image/video background
    subheadline: string;
    primaryCTA: CTA; // Book Now (#book)
    secondaryCTA: CTA; // View Locations
  };

  // SECTION 2 — INTRO / WHAT IT IS
  intro: {
    headline: string;
    paragraphs: string[]; // 2–3 paragraphs
    bullets?: string[];
    media?: Media; // side image/video
  };

  // SECTION 3 — BENEFITS GRID
  benefits: {
    headline: string;
    items: BenefitItem[];
    viewResearchCTA?: CTA; // link to /research/[slug] or /research
  };

  // SECTION 4 — HOW IT WORKS / WHAT TO EXPECT
  howItWorks: {
    headline: string;
    steps: HowItWorksStep[]; // 3–4 steps
  };

  // SECTION 5 — THE SCIENCE BEHIND IT
  science: ScienceSection;

  // SECTION 6 — SAFETY & CONTRAINDICATIONS
  safety: SafetySection;

  // SECTION 7 — BEFORE & AFTER (OPTIONAL)
  beforeAfter?: {
    headline: string;
    items: BeforeAfterItem[];
    disclaimer: string;
  };

  // SECTION 8 — TESTIMONIALS
  testimonials: {
    headline: string;
    items: TestimonialItem[];
  };

  // SECTION 9 — PRICING PREVIEW
  pricingPreview: {
    headline: string;
    cards: PricingCard[];
  };

  // SECTION 10 — BOOKING WIDGET
  booking: {
    headline: string; // "Book Your Cryotherapy Session"
    subheadline?: string;
    locationIdDefault: number; // fallback default
    badges?: string[]; // "Secure • Fast • No membership required"
  };

  // SECTION 11 — FAQ
  faqs: {
    headline: string;
    items: FAQItem[];
  };

  // SECTION 12 — RELATED SERVICES
  relatedServices: {
    headline: string;
    slugs: string[]; // 3 slugs, exclude current service
  };

  // SECTION 13 — FINAL CTA STRIP
  finalCTA: {
    headline: string;
    primaryCTA: CTA;
    secondaryCTA: CTA;
  };

  // SEO
  seo: ServiceSEO;
};
