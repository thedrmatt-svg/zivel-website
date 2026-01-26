import type { Location } from "@/types/location";

const bentonville_ar: Location = {
  name: "Zivel Bentonville",
  slug: "bentonville",
  state: "AR",
  stateSlug: "arkansas",
  city: "Bentonville",
  citySlug: "bentonville",

  seo: {
    title: "Cryotherapy, Red Light & Recovery in Bentonville, AR | Zivel",
    description:
      "Zivel Bentonville offers cryotherapy, red light therapy, dry float, infrared sauna, and recovery services in Bentonville, AR.",
    canonical: "/locations/arkansas/bentonville",
  },

  hero: {
    headline: "Modern Wellness & Recovery in Bentonville, AR",
    subheadline:
      "Science-backed therapies designed to help you recover faster, feel better, and perform at your best.",
    image: "/images/locations/bentonville-ar/hero.svg",
  },

  about: {
    headline: "Your Local Recovery Studio in Bentonville",
    body: [
      "Zivel Bentonville brings modern wellness technology and recovery services to the Bentonville community.",
      "Our studio combines cutting-edge technology with personalized care to support recovery, performance, and longevity.",
    ],
    image: "/images/locations/bentonville-ar/about.svg",
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
      bio: "Passionate wellness professional committed to serving the Bentonville community with advanced recovery and longevity services.",
    },
  ],

  partners: [
    { name: "Local Gym Partner", type: "Fitness" },
    { name: "Healthcare Partner", type: "Wellness" },
  ],

  booking: {
    locationId: 11443,
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

export default bentonville_ar;
