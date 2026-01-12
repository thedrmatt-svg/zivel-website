import type { Service } from "@/types/service";

export const cryoLiftFacial: Service = {
  slug: "cryo-lift-facial",
  name: "CryoLift Facial",
  accent: { name: "rose", hex: "#FB7185" },

  seo: {
    title: "CryoLift Facial | Skin Tightening & Glow | Zivel",
    description:
      "CryoLift Facial at Zivel is a non-invasive facial experience designed to support firmer-looking skin, reduced puffiness, and a refreshed glow. Book a session today.",
    canonical: "/services/cryo-lift-facial",
  },

  hero: {
    subheadline:
      "A cold-based facial experience designed to support firmer-looking skin, reduced puffiness, and a refreshed glow.",
    media: {
      type: "image",
      src: "/images/services/cryo-lift-facial/hero.svg",
      alt: "CryoLift facial session at Zivel (placeholder)",
    },
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Locations", href: "/locations" },
  },

  intro: {
    headline: "What is a CryoLift Facial?",
    paragraphs: [
      "CryoLift Facial is a non-invasive facial service that uses controlled cold exposure and targeted technique to support skin appearance and a refreshed look.",
      "Clients commonly choose it for a visible glow, temporary reduction in puffiness, and a firmer-looking feel—often before events or as part of a consistent skin routine.",
      "At Zivel, CryoLift can be done as a stand-alone session or stacked with complementary services like red light therapy.",
    ],
    bullets: [
      "Non-invasive facial with no downtime",
      "Designed to support firmness and glow",
      "Popular pre-event or routine maintenance option",
    ],
    media: {
      type: "image",
      src: "/images/services/cryo-lift-facial/intro.svg",
      alt: "Cryo facial tools and treatment room (placeholder)",
    },
  },

  benefits: {
    headline: "Key Benefits",
    viewResearchCTA: { label: "View Research →", href: "/research/cryo-lift-facial" },
    items: [
      {
        title: "Supports a refreshed, glowing look",
        description:
          "Often chosen for a visible post-session glow and refreshed appearance.",
        citations: ["clf-1"],
      },
      {
        title: "Helps reduce the look of puffiness",
        description:
          "Cold exposure is commonly used to support a de-puffed, sculpted appearance.",
        citations: ["clf-2"],
      },
      {
        title: "Supports firmer-looking skin",
        description:
          "Designed to support skin appearance and temporary tightening effects.",
        citations: ["clf-3"],
      },
      {
        title: "Comfortable, quick service",
        description:
          "Typically easy to fit into a schedule with no required downtime.",
        citations: ["clf-4"],
      },
      {
        title: "Pairs well with skin-focused stacks",
        description:
          "Often combined with red light therapy for a skin-forward routine.",
        citations: ["clf-5"],
      },
      {
        title: "Great for events and special occasions",
        description:
          "Many clients book before weddings, photos, travel, or nights out.",
        citations: ["clf-6"],
      },
    ],
  },

  howItWorks: {
    headline: "What to Expect",
    steps: [
      {
        title: "Consultation & Prep",
        description:
          "Review goals, discuss any sensitivities, and prepare for the session.",
      },
      {
        title: "CryoLift Facial Session",
        description:
          "Your provider performs a targeted cold-based facial technique designed to support skin appearance.",
      },
      {
        title: "Post-Session Glow",
        description:
          "Most clients leave looking refreshed. No downtime—apply makeup and continue your day if desired.",
      },
      {
        title: "Recommended Frequency",
        description:
          "Many clients use it monthly for maintenance, or more frequently around special events.",
      },
    ],
  },

  science: {
    headline: "The Science Behind Cold-Based Facial Techniques",
    body: [
      "Cold exposure is commonly used in wellness and cosmetic routines to support circulation and the appearance of reduced puffiness.",
      "Zivel protocols emphasize comfort, safe temperatures, and consistent technique. Results and experience vary by individual.",
    ],
    media: {
      type: "image",
      src: "/images/services/cryo-lift-facial/science.svg",
      alt: "Skin and circulation concept visual (placeholder)",
    },
    cta: { label: "Learn More in the Science Hub", href: "/science" },
  },

  safety: {
    headline: "Is CryoLift Facial Safe?",
    body: [
      "CryoLift Facial is generally well tolerated when performed by trained staff using safe protocols.",
      "If you have cold sensitivity, skin conditions, or any medical concerns, consult your clinician and inform your provider before treatment.",
    ],
    contraindications: [
      "Cold sensitivity or cold-related conditions",
      "Active skin irritation, infection, or open wounds in the treatment area",
      "Recent cosmetic procedures (follow clinician guidance)",
      "Pregnancy (consult your clinician)",
      "Any condition your clinician advises against cold-based therapies",
    ],
    disclaimer:
      "This information is for educational purposes only and is not medical advice. Results vary by individual.",
  },

  beforeAfter: {
    headline: "Before & After (Optional)",
    items: [
      {
        beforeSrc: "/images/services/cryo-lift-facial/before-1.jpg",
        afterSrc: "/images/services/cryo-lift-facial/after-1.jpg",
        alt: "CryoLift Facial before and after (placeholder)",
      },
      {
        beforeSrc: "/images/services/cryo-lift-facial/before-2.jpg",
        afterSrc: "/images/services/cryo-lift-facial/after-2.jpg",
        alt: "CryoLift Facial results example (placeholder)",
      },
    ],
    disclaimer:
      "Results vary by individual. Images are for illustrative purposes only.",
  },

  testimonials: {
    headline: "What Clients Say",
    items: [
      {
        name: "Samantha J.",
        location: "Zivel Client",
        quote:
          "My face looked less puffy and more refreshed right after. Perfect before an event.",
      },
      {
        name: "Alyssa M.",
        location: "Zivel Client",
        quote:
          "Quick, comfortable, and I loved the glow afterward.",
      },
      {
        name: "Rachel K.",
        location: "Zivel Client",
        quote:
          "I stack it with red light and it's become my favorite skin routine.",
      },
    ],
  },

  pricingPreview: {
    headline: "Pricing & Membership Options",
    cards: [
      {
        title: "Single Session",
        priceLine: "From $X",
        details: ["Great for events", "No downtime"],
      },
      {
        title: "Packages",
        priceLine: "Save with Packages",
        details: ["Multi-session savings", "Great for maintenance routines"],
        cta: { label: "View Packages", href: "/memberships" },
      },
      {
        title: "Member Rate",
        priceLine: "Member Pricing",
        details: ["Best per-session value", "Priority booking"],
        cta: { label: "View Memberships", href: "/memberships" },
      },
    ],
  },

  booking: {
    headline: "Book Your CryoLift Facial",
    subheadline:
      "Choose a location and time that fits your schedule. Most clients return to normal activity immediately.",
    badges: ["Secure", "Fast", "No membership required"],
    locationIdDefault: 11417,
  },

  faqs: {
    headline: "CryoLift Facial FAQs",
    items: [
      {
        question: "How long is the session?",
        answer:
          "Session lengths vary by location and protocol. Your studio will confirm the timing during booking.",
      },
      {
        question: "Is there downtime?",
        answer:
          "No. Most clients return to normal activities immediately after the session.",
      },
      {
        question: "Is it painful?",
        answer:
          "Most clients find it comfortable. Cold sensations are temporary and monitored by your provider.",
      },
      {
        question: "When should I book before an event?",
        answer:
          "Many clients book 1–3 days before an event, depending on their preference and schedule.",
      },
      {
        question: "How often should I do it?",
        answer:
          "Many clients use it monthly for maintenance, or more frequently around events and travel.",
      },
      {
        question: "Can I combine it with other services?",
        answer:
          "Yes. CryoLift Facial pairs well with red light therapy and other recovery services depending on your goals.",
      },
    ],
  },

  relatedServices: {
    headline: "Related Services",
    slugs: ["red-light-therapy", "cryo-slimming", "cryo-toning"],
  },

  finalCTA: {
    headline: "Ready to Feel Better?",
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Memberships", href: "/memberships" },
  },
};
