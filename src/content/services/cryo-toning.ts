import type { Service } from "@/types/service";

export const cryoToning: Service = {
  slug: "cryo-toning",
  name: "Cryo Toning",
  accent: { name: "cool-blue", hex: "#3B82F6" },

  seo: {
    title: "Cryo Toning | Muscle Toning & Firming | Zivel",
    description:
      "Cryo Toning at Zivel is a non-invasive firming and toning service designed to support muscle definition and skin appearance. Learn what to expect and book a session.",
    canonical: "/services/cryo-toning",
  },

  hero: {
    subheadline:
      "A non-invasive toning experience designed to support firmer-looking skin and improved muscle definition goals.",
    media: {
      type: "image",
      src: "/images/services/cryo-toning/hero.avif",
      alt: "Cryo toning treatment at Zivel (placeholder)",
    },
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Locations", href: "/locations" },
  },

  intro: {
    headline: "What is Cryo Toning?",
    paragraphs: [
      "Cryo Toning is a non-invasive service designed to support muscle toning and a firmer appearance in targeted areas.",
      "Protocols often combine controlled cold exposure and complementary techniques used in aesthetic wellness routines to support tissue appearance and definition.",
      "At Zivel, Cryo Toning is typically done as a series, with consistency and supportive lifestyle habits playing a key role in outcomes.",
    ],
    bullets: [
      "Non-invasive and no downtime",
      "Designed to support firmness and definition",
      "Often done in a structured series for best results",
    ],
    media: {
      type: "image",
      src: "/images/services/cryo-toning/intro.avif",
      alt: "Cryo toning device and session (placeholder)",
    },
  },

  benefits: {
    headline: "Key Benefits",
    viewResearchCTA: { label: "View the Science →", href: "/science/cold-exposure" },
    items: [
      {
        title: "Supports firmer-looking skin",
        description:
          "Designed to support skin appearance and firmness in treatment areas.",
        citations: ["ct-1"],
      },
      {
        title: "Toning and definition support",
        description:
          "Often used to support a more toned look when paired with consistency.",
        citations: ["ct-2"],
      },
      {
        title: "Non-invasive aesthetic service",
        description:
          "No needles, no surgery, and no required downtime after sessions.",
        citations: ["ct-3"],
      },
      {
        title: "Targeted treatment areas",
        description:
          "Common areas include abdomen, glutes, thighs, arms, and flanks.",
        citations: ["ct-4"],
      },
      {
        title: "Comfortable, guided session",
        description:
          "Sessions are designed to be tolerable and performed by trained staff.",
        citations: ["ct-5"],
      },
      {
        title: "Pairs well with complementary services",
        description:
          "Often stacked with red light therapy, compression, and sauna routines.",
        citations: ["ct-6"],
      },
    ],
  },

  howItWorks: {
    headline: "What to Expect",
    steps: [
      {
        title: "Consultation & Planning",
        description:
          "Discuss goals and map treatment areas. We'll outline a recommended series.",
      },
      {
        title: "Cryo Toning Session",
        description:
          "Your specialist applies the protocol to targeted areas using controlled cold exposure techniques.",
      },
      {
        title: "Post-Session",
        description:
          "No downtime—most clients resume normal activity immediately.",
      },
      {
        title: "Series & Progress",
        description:
          "Best outcomes typically come from multiple sessions over several weeks.",
      },
    ],
  },

  science: {
    headline: "The Science Behind Cryo Toning",
    body: [
      "Aesthetic wellness protocols often focus on supporting tissue appearance through controlled temperature exposure and targeted treatment methods.",
      "Zivel's approach emphasizes safe protocols, proper session spacing, and realistic expectations—results vary by individual and consistency.",
    ],
    media: {
      type: "image",
      src: "/images/services/cryo-toning/science.avif",
      alt: "Cryo toning science concept visual (placeholder)",
    },
    cta: { label: "Learn More in the Science Hub", href: "/science" },
  },

  safety: {
    headline: "Is Cryo Toning Safe?",
    body: [
      "Cryo Toning is generally well tolerated when performed by trained professionals following established protocols.",
      "If you have medical conditions, are pregnant, or have cold sensitivity, consult your healthcare provider before treatment.",
    ],
    contraindications: [
      "Cold sensitivity or cold-related conditions",
      "Pregnancy",
      "Active skin conditions in treatment area",
      "Circulatory disorders",
      "Any condition your clinician advises against cold-based therapies",
    ],
    disclaimer:
      "This information is for educational purposes only and is not medical advice. Results vary by individual.",
  },

  beforeAfter: {
    headline: "Before & After Results",
    items: [
      {
        src: "/images/services/cryo-toning/result-1.avif",
        objectPosition: "center center",
        alt: "Cryo Toning before and after results",
      },
      {
        src: "/images/services/cryo-toning/result-2.avif",
        objectPosition: "center center",
        alt: "Cryo Toning before and after results",
      },
    ],
    disclaimer:
      "Results vary by individual. Images are for illustrative purposes only.",
  },

  testimonials: {
    headline: "What Clients Say",
    items: [
      {
        name: "Danielle P.",
        location: "Zivel Client",
        quote:
          "I felt more confident as I stayed consistent. The process was easy and professional.",
      },
      {
        name: "Ryan K.",
        location: "Zivel Client",
        quote:
          "No downtime and straightforward. The team explained what to expect clearly.",
      },
      {
        name: "Melissa W.",
        location: "Zivel Client",
        quote:
          "I liked how structured the plan was. It helped me stay on track.",
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
          "Members save more",
          "Priority Booking",
          "Maximize Outcomes",
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
    headline: "Book Your Cryo Toning Session",
    subheadline:
      "Choose a location and time that fits your goals and schedule.",
    badges: ["Secure", "Fast", "No membership required"],
    locationIdDefault: 11417,
  },

  faqs: {
    headline: "Cryo Toning FAQs",
    items: [
      {
        question: "How many sessions will I need?",
        answer:
          "Most clients see best outcomes after a series of sessions over several weeks. Your provider will recommend a plan.",
      },
      {
        question: "Is there downtime?",
        answer:
          "No. Most clients return to normal activities immediately.",
      },
      {
        question: "Does it hurt?",
        answer:
          "Most clients describe the sensation as tolerable and temporary. Your provider will monitor comfort throughout.",
      },
      {
        question: "When will I see results?",
        answer:
          "Results vary and typically develop over time with consistency and proper session spacing.",
      },
      {
        question: "Who is a good candidate?",
        answer:
          "Cryo Toning is intended for clients looking to improve firmness and definition in targeted areas.",
      },
      {
        question: "Can I stack this with other services?",
        answer:
          "Yes. Many clients pair it with red light therapy, compression, or sauna routines.",
      },
    ],
  },

  relatedServices: {
    headline: "Related Services",
    slugs: ["cryo-slimming", "red-light-therapy", "compression-therapy"],
  },

  finalCTA: {
    headline: "Ready to Feel Better?",
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Memberships", href: "/memberships" },
  },
};
