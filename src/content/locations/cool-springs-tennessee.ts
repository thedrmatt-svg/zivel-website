import type { Location } from "@/types/location";

export const zivel_franklin_cool_springs_location: Location = {
  name: "Zivel Franklin-Cool Springs",
  slug: "cool-springs",
  state: "TN",
  stateSlug: "tennessee",
  citySlug: "cool-springs",
  city: "Franklin",

  seo: {
    title: "Zivel Franklin-Cool Springs | Zivel",
    description: "Zivel Franklin-Cool Springs offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/tennessee/cool-springs",
  },

  contact: {
    address: "790 Jordan Rd #107, Franklin, TN 37067",
    phone: "(615) 997-4159",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "8am – 6pm",
    tuesday: "8am – 4pm",
    wednesday: "8am – 6pm",
    thursday: "8am – 6pm",
    friday: "8am – 5pm",
    saturday: "9am – 5pm",
    sunday: "11am – 3pm",
  },

  booking: {
    locationId: 11436,
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
    "name": "Dry Float",
    "slug": "dry-float"
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

  owners: [],

  google: {
    placeId: "",
    mapEmbedUrl: "",
  },

  pricing: {
    membershipTiers: [
      {
        name: "Essential",
        price: "$129",
        cadence: "/mo",
        description: "A great entry point for regular recovery.",
        features: ["4 Recovery Sessions/Month", "Good for Beginners"],
        mostPopular: false,
      },
      {
        name: "Elite",
        price: "$179",
        cadence: "/mo",
        description: "More sessions, more value.",
        features: ["8 Recovery Sessions/Month", "Premium Service Discounts"],
        mostPopular: true,
      },
    ],
    standardPrices: [
      { name: "Cryotherapy", price: "$35", note: "Single session" },
      { name: "Red Light Therapy", price: "$45", note: "Single session" },
      { name: "Infrared Sauna", price: "$35", note: "Single session" },
      { name: "Dry Float", price: "$65", note: "Single session" },
      { name: "Compression Therapy", price: "$30", note: "Single session" },
      { name: "Oxygen Bar", price: "$30", note: "Single session" },
      { name: "Cryo Slimming", price: "$399", note: "Single session" },
      { name: "Cryo Toning", price: "$399", note: "Single session" },
      { name: "CryoLift Facial", price: "$150", note: "Single session" },
      { name: "Cryo Soothe", price: "$75", note: "Single session" },
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

export default zivel_franklin_cool_springs_location;
