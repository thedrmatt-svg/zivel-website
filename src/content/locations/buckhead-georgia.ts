import type { Location } from "@/types/location";

export const zivel_buckhead_location: Location = {
  name: "Zivel Buckhead",
  slug: "buckhead",
  state: "GA",
  stateSlug: "georgia",
  citySlug: "buckhead",
  openedYear: 2026,

  seo: {
    title: "Zivel Buckhead | Zivel",
    description: "Zivel Buckhead offers cryotherapy, red light therapy, infrared sauna, dry float, and recovery services in Buckhead, Atlanta, GA. Book today.",
    canonical: "https://www.zivel.com/locations/georgia/buckhead",
  },

  contact: {
    address: "2221 Peachtree Rd NE Suite F, Atlanta, GA 30309",
    phone: "(404) 309-5954",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "8am – 7pm",
    tuesday: "8am – 8pm",
    wednesday: "8am – 7pm",
    thursday: "8am – 8pm",
    friday: "8am – 5pm",
    saturday: "8am – 5pm",
    sunday: "Closed",
  },

  booking: {
    locationId: 11537,
  },

  services: [
  {
    "name": "Cryotherapy",
    "slug": "cryotherapy"
  },
  {
    "name": "Red Light Therapy",
    "slug": "red-light-therapy"
  },
  {
    "name": "Infrared Sauna",
    "slug": "infrared-sauna"
  },
  {
    "name": "Cryo Slimming",
    "slug": "cryo-slimming"
  },
  {
    "name": "Cryo Toning",
    "slug": "cryo-toning"
  },
  {
    "name": "CryoLift Facial",
    "slug": "cryo-lift-facial"
  },
  {
    "name": "Compression Therapy",
    "slug": "compression-therapy"
  }
],

  owners: [
  {
    "name": "Tia",
    "title": "Local Operator",
    "bio": "This location is independently operated. Local leadership supports the studio experience, community partnerships, and day-to-day service quality."
  }
],

  google: {
    placeId: "",
    mapEmbedUrl: "",
  },

  pricing: {
    membershipTiers: [
      {
        name: "Essential",
        price: "$99",
        cadence: "/mo",
        description: "A great entry point for regular recovery.",
        features: ["6 Recovery Sessions/Month", "Good for Beginners"],
        mostPopular: false,
      },
      {
        name: "Elite",
        price: "$129",
        cadence: "/mo",
        description: "More sessions, more value.",
        features: ["8 Recovery Sessions/Month", "Premium Service Discounts"],
        mostPopular: true,
      },
    ],
    standardPrices: [
      { name: "Cryotherapy", price: "$45", note: "Single session" },
      { name: "Red Light Therapy", price: "$30", note: "Single session" },
      { name: "Infrared Sauna", price: "$35", note: "Single session" },
      { name: "Compression Therapy", price: "$30", note: "Single session" },
      { name: "Oxygen Bar", price: "$30", note: "Single session" },
      { name: "Cryo Slimming", price: "$350", note: "Single session" },
      { name: "Cryo Toning", price: "$350", note: "Single session" },
      { name: "CryoLift Facial", price: "$150", note: "Single session" },
      { name: "Cryo Soothe", price: "$30", note: "Single session" },
    ],
  },

  partners: [
    {
      name: "Partner Name",
      type: "Chiropractic / Gym / etc",
      description: "2-3 sentences placeholder about the partnership.",
      website: "https://example.com",
      logo: "/images/partners/example.png",
    },
  ],

  jobs: [
    {
      title: "Wellness Specialist",
      type: "Part-time",
      locationNote: "On-site",
      description: "Placeholder role summary.",
      applyUrl: "https://example.com/apply",
    },
  ],

  store: [
    {
      name: "Product Name",
      description: "Placeholder product description.",
      image: "/images/store/placeholder.png",
      price: "$X",
      url: "https://example.com/shop",
    },
  ],
};

export default zivel_buckhead_location;
