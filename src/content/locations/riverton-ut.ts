import type { Location } from "@/types/location";

export const rivertonUt: Location = {
  name: "Zivel Riverton",
  slug: "riverton",
  state: "UT",
  stateSlug: "utah",
  city: "Riverton",
  citySlug: "riverton",

  seo: {
    title: "Cryotherapy, Red Light & Recovery in Riverton, UT | Zivel",
    description:
      "Zivel Riverton offers modern recovery and wellness services including cryotherapy, red light therapy, and more in Riverton, Utah. Book your session today.",
    canonical: "/locations/utah/riverton",
  },

  hero: {
    headline: "Modern Wellness & Recovery in Riverton, Utah",
    subheadline:
      "Science-backed therapies designed to help you recover faster, feel better, and perform at your best.",
    image: "/images/locations/riverton-ut/hero.jpg",
  },

  about: {
    headline: "Your Local Recovery Studio in Riverton",
    body: [
      "Zivel Riverton brings modern wellness technology and recovery services to the Riverton community.",
      "Replace this copy with local details (nearby neighborhoods, landmarks, and who we serve) for maximum GEO performance.",
    ],
    image: "/images/locations/riverton-ut/interior.jpg",
  },

  services: [
    { slug: "cryotherapy", name: "Cryotherapy", description: "Cold exposure for recovery and resilience." },
    { slug: "red-light-therapy", name: "Red Light Therapy", description: "Light-based support for recovery and skin health." },
    { slug: "infrared-sauna", name: "Infrared Sauna", description: "Heat-based relaxation and recovery support." },
    { slug: "dry-float", name: "Dry Float", description: "Deep relaxation without getting wet." },
    { slug: "compression-therapy", name: "Compression Therapy", description: "Circulation support and recovery." },
    { slug: "cryo-slimming", name: "Cryo Slimming", description: "Non-invasive body contouring support." },
    { slug: "cryo-toning", name: "Cryo Toning", description: "Targeted cooling for toning goals." },
    { slug: "cryo-lift-facial", name: "CryoLift Facial", description: "Cooling facial experience for glow and refresh." },
  ],

  owners: [
    {
      name: "Owner Name (Placeholder)",
      bio: "Add a short owner bio here (local connection + mission + credibility). Keep it human and specific to Riverton.",
    },
  ],

  partners: [
    { name: "Partner Name (Placeholder)", type: "Fitness / Wellness" },
    { name: "Partner Name (Placeholder)", type: "Healthcare / Recovery" },
  ],

  booking: {
    locationId: 11445,
  },

  faqs: [
    {
      q: "Do I need a membership to book?",
      a: "No. You can book a single session or explore memberships for better value.",
    },
    {
      q: "What should I wear?",
      a: "Wear comfortable clothing. Your team will guide you based on the service you choose.",
    },
    {
      q: "How soon will I feel results?",
      a: "Many people feel benefits quickly, but consistency and a personalized plan matter most.",
    },
  ],

  finalCTA: {
    headline: "Ready to feel better?",
  },
};

export default rivertonUt;
