import type { LocationPage } from "@/types/location";

export const newportKy: LocationPage = {
  slug: "newport-ky",
  name: "Newport",
  state: "KY",
  city: "Newport",
  stateSlug: "kentucky",
  citySlug: "newport",

  phone: "(000) 000-0000",
  phoneHref: "tel:+10000000000",

  address: {
    line1: "123 Example St",
    line2: "",
    city: "Newport",
    state: "KY",
    postalCode: "41071",
    country: "US",
  },

  geo: {
    lat: 39.0914,
    lng: -84.4958,
  },

  hours: [
    { label: "Mon", value: "9:00 AM – 7:00 PM" },
    { label: "Tue", value: "9:00 AM – 7:00 PM" },
    { label: "Wed", value: "9:00 AM – 7:00 PM" },
    { label: "Thu", value: "9:00 AM – 7:00 PM" },
    { label: "Fri", value: "9:00 AM – 7:00 PM" },
    { label: "Sat", value: "9:00 AM – 5:00 PM" },
    { label: "Sun", value: "Closed" },
  ],

  hero: {
    headline: "Zivel Newport, KY",
    subheadline:
      "Science-backed wellness for recovery, performance, and longevity—right here in Newport.",
    media: {
      src: "/images/locations/newport-ky/hero.svg",
      alt: "Zivel Newport, KY studio",
    },
    trustBadges: ["Professional staff", "Premium recovery tech", "Fast booking"],
    primaryCTA: { label: "Book Now", href: "#book" },
    secondaryCTAs: [
      { label: "Call", href: "tel:+10000000000" },
      { label: "Directions", href: "#directions" },
    ],
  },

  about: {
    headline: "A premium wellness studio for Newport",
    paragraphs: [
      "This is a placeholder introduction for the Newport, KY studio page. We'll replace this with final local copy optimized for SEO + AI discovery.",
      "Add neighborhood references, nearby landmarks, and a short 'why we're here' story that feels local and trustworthy.",
    ],
    bullets: [
      "Recovery, performance, and longevity services in one studio",
      "Membership options + packs",
      "Easy booking and consistent experience",
    ],
  },

  servicesAtLocation: {
    headline: "Services available at this location",
    items: [
      { slug: "cryotherapy" },
      { slug: "red-light-therapy" },
      { slug: "infrared-sauna" },
      { slug: "dry-float" },
      { slug: "compression-therapy" },
      { slug: "cryo-slimming" },
      { slug: "cryo-toning" },
      { slug: "cryo-lift-facial" },
    ],
  },

  booking: {
    locationId: 14833,
    bookingUrl: "https://zivel.myperformanceiq.com/book-appointment?set_location=14833",
  },

  map: {
    headline: "Directions & parking",
    parkingNotes: [
      "Placeholder parking note #1",
      "Placeholder parking note #2",
    ],
    nearbyLandmarks: [
      "Newport on the Levee",
      "Downtown Cincinnati (across the river)",
    ],
  },

  seo: {
    title: "Zivel Newport, KY | Cryotherapy, Red Light, Infrared Sauna & Recovery",
    description:
      "Visit Zivel Newport, KY for premium wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, and more. Book your session today.",
    canonical: "/locations/kentucky/newport",
  },
};
