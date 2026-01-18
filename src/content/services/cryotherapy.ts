import type { Service } from "@/types/service";

export const cryotherapy: Service = {
  slug: "cryotherapy",
  name: "Cryotherapy",
  accent: {
    name: "cryo-blue",
    hex: "#4ECDC4",
  },

  // SECTION 1 — HERO
  hero: {
    media: {
      type: "image",
      src: "/images/services/cryotherapy/hero.svg",
      alt: "Cryotherapy session at Zivel",
    },
    subheadline:
      "A fast, controlled cold exposure experience designed to support recovery, reduce soreness, and boost mental clarity.",
    primaryCTA: {
      label: "Book Now",
      href: "#book",
    },
    secondaryCTA: {
      label: "View Locations",
      href: "/locations",
    },
  },

  // SECTION 2 — INTRO / WHAT IT IS
  intro: {
    headline: "What is Cryotherapy?",
    paragraphs: [
      "Cryotherapy uses short-duration, controlled cold exposure to trigger natural physiological responses that may support recovery, circulation, and overall resilience.",
      "At Zivel, sessions are quick, supported by staff, and designed to fit seamlessly into a consistent wellness routine—whether your goal is recovery, performance, or feeling better day-to-day.",
      "Results can vary by individual and goal, but consistency and smart programming tend to produce the best outcomes.",
    ],
    bullets: [
      "Quick sessions (typically a few minutes)",
      "Staff-supported, structured experience",
      "Often used in recovery and performance routines",
    ],
    media: {
      type: "image",
      src: "/images/services/cryotherapy/intro.svg",
      alt: "Client preparing for cryotherapy at Zivel",
    },
  },

  // SECTION 3 — BENEFITS GRID (WITH CITATION NUMBERS)
  benefits: {
    headline: "Key Benefits",
    items: [
      {
        title: "Supports muscle recovery and soreness reduction",
        description:
          "Cold exposure may help reduce perceived soreness and support recovery routines—especially when used consistently.",
        citations: ["cryo-001"],
      },
      {
        title: "May support inflammation response management",
        description:
          "Cold exposure can influence inflammatory signaling and circulation dynamics used in post-training recovery strategies.",
        citations: ["cryo-002"],
      },
      {
        title: "Boosts alertness and mental resilience",
        description:
          "Many clients report feeling refreshed and focused after sessions due to cold-driven arousal responses.",
        citations: ["cryo-003"],
      },
      {
        title: "May support circulation and recovery cadence",
        description:
          "Used as part of a routine, cryotherapy may complement other recovery modalities and training schedules.",
        citations: ["cryo-004"],
      },
      {
        title: "Time-efficient wellness tool",
        description:
          "Short sessions make it easy to maintain consistency within a weekly routine.",
        citations: ["cryo-005"],
      },
      {
        title: "Pairs well with complementary modalities",
        description:
          "Often combined with red light therapy, infrared sauna, compression, and dry float for a complete recovery stack.",
        citations: ["cryo-006"],
      },
    ],
    viewResearchCTA: {
      label: "View Research →",
      href: "/research/cryotherapy",
    },
  },

  // SECTION 4 — HOW IT WORKS / WHAT TO EXPECT
  howItWorks: {
    headline: "What to Expect",
    steps: [
      {
        title: "Arrival & Intake",
        description:
          "Check in, review any contraindications, and get guided instructions from the Zivel team.",
      },
      {
        title: "Session Experience",
        description:
          "A brief, controlled cold exposure session. Your team monitors comfort and supports you throughout.",
      },
      {
        title: "Aftercare",
        description:
          "Warm up naturally, hydrate, and optionally stack another service (red light, compression).",
      },
      {
        title: "Recommended Frequency",
        description:
          "Many clients start 2–3x/week and adjust based on training load, recovery needs, and wellness goals.",
      },
    ],
  },

  // SECTION 5 — THE SCIENCE BEHIND IT
  science: {
    headline: "The Science Behind Cryotherapy",
    body: [
      "Cold exposure can initiate thermoregulatory responses and temporary changes in circulation, which may influence perceived soreness, recovery, and alertness.",
      "Research varies by protocol and population, so Zivel focuses on consistent, staff-supported sessions and recovery stacks tailored to real-world routines.",
    ],
    media: {
      type: "image",
      src: "/images/services/cryotherapy/science.svg",
      alt: "Illustration representing cold exposure physiology",
    },
    cta: {
      label: "Learn More in the Science Hub",
      href: "/research/cryotherapy",
    },
  },

  // SECTION 6 — SAFETY & CONTRAINDICATIONS
  safety: {
    headline: "Is Cryotherapy Safe?",
    body: [
      "Cryotherapy is generally safe when performed under professional staff support and when clients are screened for contraindications.",
      "Your studio team will review your health history and help determine whether cryotherapy is appropriate for you.",
    ],
    contraindications: [
      "Pregnancy",
      "Severe uncontrolled hypertension",
      "Recent heart attack or serious cardiac conditions",
      "Cold hypersensitivity conditions (e.g., Raynaud's) — discuss with staff",
      "Severe neuropathy or impaired sensation",
      "Any condition where cold exposure is contraindicated by your clinician",
    ],
    disclaimer:
      "This information is for educational purposes only and is not medical advice. Always consult a qualified healthcare professional regarding contraindications or medical concerns.",
  },

  // SECTION 8 — TESTIMONIALS
  testimonials: {
    headline: "What People Are Saying",
    items: [
      {
        name: "Client Name",
        location: "City, State",
        quote:
          "Placeholder testimonial about feeling better, recovering faster, or improved consistency.",
      },
      {
        name: "Client Name",
        location: "City, State",
        quote:
          "Placeholder testimonial about soreness reduction, energy, and overall wellness routine.",
      },
      {
        name: "Client Name",
        location: "City, State",
        quote:
          "Placeholder testimonial about stacking services and the Zivel experience.",
      },
    ],
  },

  // SECTION 9 — PRICING PREVIEW
  pricingPreview: {
    headline: "Pricing Options",
    cards: [
      {
        title: "Single Session",
        priceLine: "From $XX",
        details: [
          "Great for first-time clients",
          "Flexible scheduling",
          "Upgrade to a package anytime",
        ],
      },
      {
        title: "Member Rate",
        priceLine: "Save with Membership",
        details: [
          "Best value per session",
          "Monthly benefits and discounts",
          "Ideal for consistent routines",
        ],
        cta: {
          label: "View Memberships",
          href: "/memberships",
        },
      },
      {
        title: "Packages",
        priceLine: "Bundle & Save",
        details: [
          "Multi-session packages",
          "Better value than single sessions",
          "Perfect for goal-based programs",
        ],
      },
    ],
  },

  // SECTION 10 — BOOKING WIDGET
  booking: {
    headline: "Book Your Cryotherapy Session",
    subheadline: "Choose a time below. You can also open the scheduler directly if needed.",
    locationIdDefault: 11417,
    badges: ["Secure", "Fast", "No membership required"],
  },

  // SECTION 11 — FAQ
  faqs: {
    headline: "FAQs",
    items: [
      {
        question: "How long is a cryotherapy session?",
        answer:
          "Most sessions last about 2–3 minutes. Your team will guide you and adjust based on comfort and experience.",
      },
      {
        question: "What should I wear?",
        answer:
          "You'll typically wear minimal clothing with protective items provided (such as gloves and footwear). Your studio team will confirm exact requirements.",
      },
      {
        question: "How often should I do cryotherapy?",
        answer:
          "Many clients start with 2–3 sessions per week and adjust based on goals (recovery, performance, wellness routine). Consistency matters.",
      },
      {
        question: "Is cryotherapy safe?",
        answer:
          "Cryotherapy is generally safe when supported by staff and performed properly. Your studio team will review contraindications and ensure you're a good candidate.",
      },
      {
        question: "Can I stack cryotherapy with other services?",
        answer:
          "Yes. Many clients pair cryotherapy with red light therapy, compression, infrared sauna, or dry float based on goals and availability.",
      },
      {
        question: "Will I feel sore afterward?",
        answer:
          "Most clients feel refreshed. Some may feel temporarily cold or energized. Individual responses vary.",
      },
    ],
  },

  // SECTION 12 — RELATED SERVICES
  relatedServices: {
    headline: "Related Services",
    slugs: ["red-light-therapy", "infrared-sauna", "compression-therapy"],
  },

  // SECTION 13 — FINAL CTA STRIP
  finalCTA: {
    headline: "Ready to Feel Better?",
    primaryCTA: {
      label: "Book Now",
      href: "#book",
    },
    secondaryCTA: {
      label: "View Memberships",
      href: "/memberships",
    },
  },

  // SEO
  seo: {
    title: "Cryotherapy | Recovery, Performance & Wellness",
    description:
      "Explore cryotherapy at Zivel—short, controlled cold exposure designed to support recovery, soreness reduction, and mental clarity. Book your session today.",
    canonical: "/services/cryotherapy",
  },
};
