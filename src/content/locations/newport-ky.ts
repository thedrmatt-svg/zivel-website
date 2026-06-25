import type { Location } from "@/types/location";

export const newportKY: Location = {
  name: "Zivel Newport",
  slug: "newport",
  state: "KY",
  stateSlug: "kentucky",
  city: "Newport",
  citySlug: "newport",

  seo: {
    title: "Cryotherapy, Red Light & Recovery in Newport, KY | Zivel",
    description:
      "Zivel Newport offers cryotherapy, red light therapy, dry float, infrared sauna, and recovery services in Newport, Kentucky.",
    canonical: "/locations/kentucky/newport",
  },

  hero: {
    headline: "Modern Wellness & Recovery in Newport, Kentucky",
    subheadline:
      "Science-backed therapies designed to help you recover faster, feel better, and perform at your best.",
    image: "/images/locations/studio-hero.jpg",
  },

  about: {
    headline: "Your Local Recovery Studio in Newport",
    body: [
      "Zivel Newport is your destination for advanced wellness and recovery services in Northern Kentucky.",
      "Our studio combines cutting-edge technology with personalized care to support recovery, performance, and longevity.",
    ],
    image: "/images/locations/studio-about.jpg",
  },

  services: [
    { slug: "cryotherapy", name: "Cryotherapy", description: "Whole-body cold therapy for recovery and performance." },
    { slug: "red-light-therapy", name: "Red Light Therapy", description: "Photobiomodulation for cellular health and skin rejuvenation." },
    { slug: "infrared-sauna", name: "Infrared Sauna", description: "Deep-penetrating heat for detox and relaxation." },
    { slug: "dry-float", name: "Dry Float", description: "Zero-gravity relaxation without getting wet." },
    { slug: "compression-therapy", name: "Compression Therapy", description: "Dynamic compression for faster muscle recovery." },
    { slug: "cryo-slimming", name: "Cryo Slimming", description: "Non-invasive body contouring with cold therapy." },
    { slug: "cryo-toning", name: "Cryo Toning", description: "Skin tightening and cellulite reduction." },
    { slug: "cryo-lift-facial", name: "Cryo Lift Facial", description: "Anti-aging facial treatment with cryotherapy." },
  ],

  owners: [
    {
      name: "Local Owner",
      bio: "Passionate wellness professional committed to serving the Newport community with advanced recovery and longevity services.",
    },
  ],

  partners: [
    { name: "Local Gym Partner", type: "Fitness" },
    { name: "Healthcare Partner", type: "Wellness" },
  ],

  pricing: {
    membershipTiers: [
      {
        name: "Essential",
        price: "$99",
        cadence: "/mo",
        description: "Great entry point for regular recovery.",
        features: [
          "Cryotherapy — $40/session",
          "Red Light Therapy — $40/session",
          "Infrared Sauna — $40/session",
          "Dry Float — $40/session",
          "Compression Therapy — $40/session",
          "Member priority scheduling",
        ],
      },
      {
        name: "Elite",
        price: "$129",
        cadence: "/mo",
        description: "More sessions, more value.",
        features: [
          "All Essential services — $40/session",
          "CryoLift Facial — $150/session",
          "Priority booking",
          "Maximize your outcomes",
        ],
      },
      {
        name: "Individual Unlimited",
        price: "$150",
        cadence: "/mo",
        description: "Unlimited recovery. Discounts on premium services.",
        features: [
          "Unlimited Recovery Services",
          "Discounts on Premium Services",
          "Priority booking",
          "Best value for frequent visitors",
        ],
        mostPopular: true,
      },
      {
        name: "Exclusive",
        price: "$169",
        cadence: "/mo",
        description: "The complete Zivel experience.",
        features: [
          "All Elite services — $40/session",
          "Cryo Slimming — $350/session",
          "Cryo Toning — $350/session",
          "Premium scheduling perks",
          "Members save more",
        ],
      },
    ],
  },

  booking: {
    locationId: 11437,
  },

  faqs: [
    { q: "What should I wear to my session?", a: "Comfortable clothing is recommended. We provide robes and towels for most services." },
    { q: "How do I book an appointment?", a: "Use the booking widget above or call us directly to schedule your session." },
    { q: "Do you offer memberships?", a: "Yes, we offer flexible membership options and session packs. Ask our team for details." },
  ],

  finalCTA: {
    headline: "Ready to Feel Your Best?",
  },
};

export default newportKY;
