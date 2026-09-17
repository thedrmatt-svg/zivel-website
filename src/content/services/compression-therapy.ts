import type { Service } from "@/types/service";

export const compressionTherapy: Service = {
  slug: "compression-therapy",
  name: "Compression Therapy",
  accent: { name: "silver", hex: "#A1A1AA" },

  seo: {
    title: "Compression Therapy | Recovery & Circulation Support | Zivel",
    description:
      "Compression Therapy at Zivel uses Hyperice/Normatec sequential pneumatic compression to support circulation, fluid movement, and post-activity recovery.",
    canonical: "/services/compression-therapy",
  },

  hero: {
    subheadline:
      "A recovery-focused session using sequential pneumatic compression to support circulation, fluid movement, and that lighter-legged feeling after training, travel, or long days on your feet.",
    media: {
      type: "image",
      src: "/images/services/compression-therapy/hero.jpg",
      alt: "Compression therapy pneumatic boots in recovery lounge at Zivel",
    },
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Locations", href: "/locations" },
  },

  intro: {
    headline: "What is Compression Therapy?",
    paragraphs: [
      "Compression Therapy uses Hyperice/Normatec attachments on the legs, hips, or arms. The system applies a sequential pulse pattern through pulsing, gradients, and distal release.",
      "Sessions typically last 20–30 minutes. You remain fully clothed and relax while the system works, making this a passive addition to a recovery routine.",
      "At Zivel, compression is easy to stack with cryotherapy, red light therapy, infrared sauna, dry float, or an Oxygen Bar session.",
    ],
    bullets: [
      "Comfortable, hands-free recovery",
      "Popular after workouts, travel, and long shifts",
      "Stacks well with other modalities",
    ],
    media: {
      type: "image",
      src: "/images/services/compression-therapy/intro.jpg",
      alt: "Client relaxing with compression boots in a Zivel recovery lounge",
    },
  },

  benefits: {
    headline: "Key Benefits",
    viewResearchCTA: { label: "View the Science →", href: "/science/recovery-modalities-float-compression" },
    items: [
      {
        title: "Supports circulation routines",
        description:
          "Sequential pressure can support blood flow and post-exercise recovery habits.",
        citations: ["comp-1"],
      },
      {
        title: "May ease the heavy-legged feeling",
        description:
          "Often used after training days to support a lighter, less heavy-legged feeling.",
        citations: ["comp-2"],
      },
      {
        title: "Supports comfort after travel",
        description:
          "Commonly used after travel or long periods of standing.",
        citations: ["comp-3"],
      },
      {
        title: "Passive recovery",
        description:
          "A comfortable option when you want recovery without more effort.",
        citations: ["comp-4"],
      },
      {
        title: "Performance-minded routine tool",
        description:
          "Often added between training sessions for faster turnaround.",
        citations: ["comp-5"],
      },
      {
        title: "Easy to stack with other services",
        description:
          "Pairs well with cryotherapy, red light therapy, sauna, dry float, and Oxygen Bar.",
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
        title: "After the Session",
        description:
          "Many clients feel lighter and more recovered. Return to normal activity immediately.",
      },
      {
        title: "Frequency",
        description:
          "Many clients use compression 2–3 times per week when training or traveling.",
      },
    ],
  },

  science: {
    headline: "The Science Behind Pneumatic Compression",
    body: [
      "Sequential pneumatic compression provides mechanical support for venous return and lymphatic fluid movement through the limbs.",
      "Evidence is stronger for perceived recovery and comfort than for consistent performance-lab outcomes. Zivel positions compression as a non-medical wellness and recovery tool.",
    ],
    media: {
      type: "image",
      src: "/images/services/compression-therapy/science.jpg",
      alt: "Pneumatic compression and circulation science concept at Zivel",
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
      "Severe peripheral arterial disease",
      "Uncontrolled congestive heart failure",
      "Acute infection or open wounds in the treatment area",
      "Recent surgery not cleared for compression",
      "Severe neuropathy or impaired sensation",
      "Pregnancy, according to studio protocol and clinical guidance",
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
    headline: "Pricing Options",
    cards: [
      {
        title: "Single Session",
        priceLine: "From $XX",
        details: [
          "Great for first-time clients",
          "Flexible scheduling",
          "Upgrade to membership anytime",
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
      },
      {
        title: "Packages",
        priceLine: "Bundle & Save",
        details: [
          "Multi-session packages",
          "Better value than single sessions",
          "Flexible use over time",
        ],
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
          "Sessions typically last 20–30 minutes. Your local studio will confirm the protocol and timing.",
      },
      {
        question: "Does it hurt?",
        answer:
          "Most clients find it comfortable. Pressure is adjustable and should not be painful—tell your provider if anything feels too tight.",
      },
      {
        question: "When should I use compression therapy?",
        answer:
          "Many clients use it after training, after travel, or on recovery days. It can also be used before activity as part of a warm-up routine.",
      },
      {
        question: "Can I use the leg and arm attachments in the same visit?",
        answer:
          "Availability and session protocols vary by studio. Ask your local Zivel team whether multiple areas can be included in one visit.",
      },
      {
        question: "Should I use compression before or after cryotherapy?",
        answer:
          "Either order may fit a recovery routine. Your local team can recommend an order based on your goals and the services in your visit.",
      },
      {
        question: "How is this different from compression socks?",
        answer:
          "Compression socks provide steady wearable pressure. Normatec systems use powered, sequential pneumatic cycles with adjustable pressure during a dedicated session.",
      },
    ],
  },

  relatedServices: {
    headline: "Related Services",
    slugs: ["cryotherapy", "red-light-therapy", "infrared-sauna", "dry-float", "oxygen-bar"],
  },

  finalCTA: {
    headline: "Ready to Feel Better?",
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Memberships", href: "/memberships" },
  },
};
