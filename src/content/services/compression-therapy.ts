import type { Service } from "@/types/service";

export const compressionTherapy: Service = {
  slug: "compression-therapy",
  name: "Compression Therapy",
  accent: { name: "silver", hex: "#A1A1AA" },

  seo: {
    title: "Compression Therapy | Recovery & Circulation Support | Zivel",
    description:
      "Compression Therapy at Zivel supports recovery, circulation, and reduced muscle soreness using guided pneumatic compression. Learn what to expect and book a session.",
    canonical: "/services/compression-therapy",
  },

  hero: {
    subheadline:
      "A recovery-focused session using rhythmic pneumatic compression to support circulation and post-workout recovery routines.",
    media: {
      type: "image",
      src: "/images/services/compression-therapy/hero.jpg",
      alt: "Compression therapy session at Zivel (placeholder)",
    },
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Locations", href: "/locations" },
  },

  intro: {
    headline: "What is Compression Therapy?",
    paragraphs: [
      "Compression Therapy uses controlled, sequential pressure to support circulation and recovery routines. Many clients use it after training, travel, or long days on their feet.",
      "Sessions are comfortable and hands-free—just relax while the system cycles pressure through the legs (or other applicable areas) to support movement of fluid and circulation.",
      "At Zivel, compression is commonly stacked with services like cryotherapy, red light therapy, infrared sauna, and dry float for a complete recovery session.",
    ],
    bullets: [
      "Comfortable, hands-free recovery",
      "Popular after workouts, travel, and long shifts",
      "Stacks well with other modalities",
    ],
    media: {
      type: "image",
      src: "/images/services/compression-therapy/intro.jpg",
      alt: "Compression boots in a recovery lounge (placeholder)",
    },
  },

  benefits: {
    headline: "Key Benefits",
    viewResearchCTA: { label: "View the Science →", href: "/science/recovery-modalities-float-compression" },
    items: [
      {
        title: "Supports circulation and recovery routines",
        description:
          "Sequential pressure can support blood flow and post-exercise recovery habits.",
        citations: ["comp-1"],
      },
      {
        title: "May help reduce the feeling of soreness",
        description:
          "Often used after training days to support a lighter, less heavy-legged feeling.",
        citations: ["comp-2"],
      },
      {
        title: "Supports swelling and fluid movement routines",
        description:
          "Commonly used after travel or long periods of standing.",
        citations: ["comp-3"],
      },
      {
        title: "Relaxing, passive session",
        description:
          "A comfortable option when you want recovery without more effort.",
        citations: ["comp-4"],
      },
      {
        title: "Great for performance-minded clients",
        description:
          "Often added between training sessions for faster turnaround.",
        citations: ["comp-5"],
      },
      {
        title: "Easy to combine with other services",
        description:
          "Pairs well with cryotherapy, red light therapy, sauna, and dry float.",
        citations: ["comp-6"],
      },
    ],
  },

  howItWorks: {
    headline: "What to Expect",
    steps: [
      {
        title: "Arrival & Fit",
        description:
          "Check in and get fitted into compression sleeves/boots comfortably.",
      },
      {
        title: "Compression Cycles",
        description:
          "Relax while sequential pressure cycles through chambers in a guided pattern.",
      },
      {
        title: "Post-Session",
        description:
          "Many clients feel lighter and more recovered. Return to normal activity immediately.",
      },
      {
        title: "Recommended Frequency",
        description:
          "Commonly used 1–4x per week depending on training, travel, and recovery needs.",
      },
    ],
  },

  science: {
    headline: "The Science Behind Pneumatic Compression",
    body: [
      "Pneumatic compression is used in recovery and wellness routines to support circulation and movement of fluid through the limbs.",
      "Zivel's compression sessions are designed to be comfortable, consistent, and easy to stack with other recovery modalities.",
    ],
    media: {
      type: "image",
      src: "/images/services/compression-therapy/science.jpg",
      alt: "Compression and circulation concept visual (placeholder)",
    },
    cta: { label: "Learn More in the Science Hub", href: "/science" },
  },

  safety: {
    headline: "Is Compression Therapy Safe?",
    body: [
      "Compression therapy is generally well tolerated for most people when properly fitted and used at appropriate settings.",
      "If you have vascular conditions, history of blood clots, or any medical concerns, consult your healthcare provider before use and inform your Zivel team.",
    ],
    contraindications: [
      "Known or suspected blood clots / DVT",
      "Severe peripheral vascular disease",
      "Uncontrolled heart failure (consult clinician)",
      "Severe pain or active injury where compression is not advised",
      "Any condition your clinician advises against compression therapy",
    ],
    disclaimer:
      "This information is for educational purposes only and is not medical advice. Always consult a qualified healthcare professional with questions about your health.",
  },

  testimonials: {
    headline: "What Clients Say",
    items: [
      {
        name: "Jordan M.",
        location: "Zivel Client",
        quote:
          "Compression is my go-to after leg day. I feel lighter and recover faster.",
      },
      {
        name: "Taylor R.",
        location: "Zivel Client",
        quote:
          "Great after traveling. My legs don't feel as heavy afterward.",
      },
      {
        name: "Alex P.",
        location: "Zivel Client",
        quote:
          "Easy, relaxing, and it stacks perfectly with red light and sauna.",
      },
    ],
  },

  pricingPreview: {
    headline: "Pricing & Membership Options",
    cards: [
      {
        title: "Single Session",
        priceLine: "From $X",
        details: ["Great for recovery days", "No commitment required"],
      },
      {
        title: "Member Rate",
        priceLine: "Save with Membership",
        details: ["Best per-session value", "Designed for consistency"],
        cta: { label: "View Memberships", href: "/memberships" },
      },
      {
        title: "Packages",
        priceLine: "Bundle & Save",
        details: ["Multi-session savings", "Use on your schedule"],
        cta: { label: "View Packages", href: "/memberships" },
      },
    ],
  },

  booking: {
    headline: "Book Your Compression Therapy Session",
    subheadline:
      "Choose a location and time that works for you. Relax, recover, and get back to your day.",
    badges: ["Secure", "Fast", "No membership required"],
    locationIdDefault: 11417,
  },

  faqs: {
    headline: "Compression Therapy FAQs",
    items: [
      {
        question: "How long is a session?",
        answer:
          "Session lengths vary by location and protocol. Your studio will confirm timing at booking.",
      },
      {
        question: "Does it hurt?",
        answer:
          "Most clients find it comfortable. Pressure is adjustable and should not be painful—tell your provider if anything feels too tight.",
      },
      {
        question: "When should I use compression—before or after workouts?",
        answer:
          "Most clients use it after workouts or on rest days as part of a recovery routine.",
      },
      {
        question: "How often should I do compression therapy?",
        answer:
          "It depends on your activity and recovery needs. Many clients use it 1–4 times per week.",
      },
      {
        question: "Can I stack it with other services?",
        answer:
          "Yes. Compression stacks well with cryotherapy, red light therapy, infrared sauna, and dry float.",
      },
      {
        question: "Who should avoid compression therapy?",
        answer:
          "If you have a history of blood clots, severe vascular issues, or clinician restrictions, consult your healthcare provider before use.",
      },
    ],
  },

  relatedServices: {
    headline: "Related Services",
    slugs: ["dry-float", "red-light-therapy", "infrared-sauna"],
  },

  finalCTA: {
    headline: "Ready to Feel Better?",
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Memberships", href: "/memberships" },
  },
};
