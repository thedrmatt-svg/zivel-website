import type { Service } from "@/types/service";

export const infraredSauna: Service = {
  slug: "infrared-sauna",
  name: "Infrared Sauna",
  accent: { name: "amber", hex: "#F59E0B" },

  seo: {
    title: "Infrared Sauna | Zivel",
    description:
      "Unwind, sweat, and recover with infrared heat designed to support circulation, relaxation, and post-workout recovery.",
    canonical: "/services/infrared-sauna",
  },

  hero: {
    subheadline:
      "Infrared heat that helps you relax, recover, and feel lighter—without the humidity of traditional saunas.",
    media: {
      type: "image",
      src: "/images/services/infrared-sauna/hero.svg",
      alt: "Infrared sauna room at Zivel (placeholder)",
    },
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Locations", href: "/locations" },
  },

  intro: {
    headline: "What is Infrared Sauna?",
    paragraphs: [
      "Infrared saunas use light-based heat that penetrates more deeply than traditional hot-air saunas. Many clients use it to unwind, support recovery, and encourage a healthy sweat.",
      "At Zivel, sessions are designed to feel comfortable and restorative—whether you're looking to de-stress, support circulation, or add a recovery tool to your weekly routine.",
    ],
    bullets: [
      "Comfortable, even heat (no stifling humidity)",
      "Great add-on for recovery routines",
      "Commonly used for relaxation and stress support",
    ],
    media: {
      type: "image",
      src: "/images/services/infrared-sauna/intro.svg",
      alt: "Infrared sauna session (placeholder)",
    },
  },

  benefits: {
    headline: "Benefits clients commonly look for",
    viewResearchCTA: { label: "View Research →", href: "/research/infrared-sauna" },
    items: [
      { title: "Relaxation & stress support", description: "A calming, heat-based reset.", citations: ["ir-1"] },
      { title: "Circulation support", description: "Heat can promote vasodilation and blood flow.", citations: ["ir-2"] },
      { title: "Muscle recovery support", description: "Often used after training days.", citations: ["ir-3"] },
      { title: "Sweat-based detox support", description: "A deep sweat many clients enjoy.", citations: ["ir-4"] },
      { title: "Sleep routine support", description: "Used by many clients to wind down.", citations: ["ir-5"] },
      { title: "General wellness ritual", description: "A consistent practice for feeling better.", citations: ["ir-6"] },
    ],
  },

  howItWorks: {
    headline: "What to expect",
    steps: [
      { title: "Arrival & setup", description: "We'll get you checked in and comfortable." },
      { title: "Infrared session", description: "Relax while infrared heat warms you evenly." },
      { title: "Cool down", description: "Hydrate and allow your body to return to baseline." },
      { title: "Recommended cadence", description: "Many clients use it 1–3x per week." },
    ],
  },

  science: {
    headline: "The science behind infrared heat",
    body: [
      "Infrared energy can warm tissues more directly than hot air. This is one reason clients report a comfortable, restorative feel.",
      "We focus on a safe, controlled session experience and clear guidance so you can build consistency over time.",
    ],
    media: {
      type: "image",
      src: "/images/services/infrared-sauna/science.svg",
      alt: "Infrared heat concept illustration (placeholder)",
    },
    cta: { label: "Learn More in the Science Hub", href: "/science" },
  },

  safety: {
    headline: "Is infrared sauna safe?",
    body: [
      "Most healthy adults tolerate infrared sauna well when hydrated and using appropriate session length.",
      "If you have medical conditions, are pregnant, or have heat sensitivity, we recommend speaking with your clinician first.",
    ],
    contraindications: [
      "Pregnancy (check with clinician)",
      "Uncontrolled blood pressure",
      "Heat intolerance or fainting history",
      "Acute illness/fever",
      "Open wounds (as applicable)",
    ],
    disclaimer:
      "This information is for general education and is not medical advice. Always consult your clinician with health questions.",
  },

  testimonials: {
    headline: "What clients say",
    items: [
      { name: "Jordan M.", location: "Zivel Client", quote: "The best reset after a stressful week." },
      { name: "Casey R.", location: "Zivel Client", quote: "I feel relaxed and loose afterward—great add-on." },
      { name: "Taylor S.", location: "Zivel Client", quote: "The heat feels comfortable, not overwhelming." },
    ],
  },

  pricingPreview: {
    headline: "Pricing preview",
    cards: [
      {
        title: "Single Session",
        priceLine: "From $X",
        details: ["Great for trying it once", "Ideal add-on after a workout"],
      },
      {
        title: "Member Rate",
        priceLine: "From $X",
        details: ["Best value per session", "Priority booking (where available)"],
        cta: { label: "View Memberships", href: "/memberships" },
      },
      {
        title: "Packages",
        priceLine: "From $X",
        details: ["Multi-session savings", "Use on your schedule"],
        cta: { label: "View Packages", href: "/memberships" },
      },
    ],
  },

  booking: {
    headline: "Book Your Infrared Sauna Session",
    subheadline: "Choose a location and time that works for you.",
    badges: ["Secure", "Fast", "No membership required"],
    locationIdDefault: 11417,
  },

  faqs: {
    headline: "Infrared Sauna FAQs",
    items: [
      { question: "How long is a session?", answer: "Most sessions run around X minutes. We'll guide you based on comfort and goals." },
      { question: "What should I wear?", answer: "Wear comfortable clothing. Some clients prefer minimal layers depending on privacy and policy." },
      { question: "Should I hydrate?", answer: "Yes—hydration before and after is recommended." },
      { question: "How often should I do it?", answer: "Many clients use infrared sauna 1–3x per week as part of a routine." },
      { question: "Is it safe for beginners?", answer: "Most people do well starting with shorter sessions and building up gradually." },
      { question: "Can I combine it with other services?", answer: "Yes. Many clients pair sauna with compression, red light, or cryotherapy based on goals." },
    ],
  },

  relatedServices: {
    headline: "Related services",
    slugs: ["red-light-therapy", "compression-therapy", "dry-float"],
  },

  finalCTA: {
    headline: "Ready to feel better?",
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTA: { label: "View Memberships", href: "/memberships" },
  },
};
