import type { Location } from "@/types/location";

export const zivel_palm_coast_location: Location = {
  name: "Zivel Palm Coast",
  slug: "palm-coast",
  state: "FL",
  stateSlug: "florida",
  citySlug: "palm-coast",

  seo: {
    title: "Zivel Palm Coast | Zivel",
    description: "Zivel Palm Coast offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/florida/palm-coast",
  },

  contact: {
    address: "5615 State Rte 100 Suite 118, Palm Coast, FL 32164",
    phone: "(386) 346-5126",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "Closed",
    tuesday: "10am – 7pm",
    wednesday: "10am – 7pm",
    thursday: "10am – 7pm",
    friday: "10am – 5pm",
    saturday: "10am – 5pm",
    sunday: "10am – 5pm",
  },

  booking: {
    locationId: 11434,
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

  owners: [
  {
    "name": "Kelly",
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
        price: "$129",
        cadence: "/mo",
        description: "A great entry point for regular recovery.",
        features: ["6 Recovery Sessions/Month", "Good for Beginners"],
        mostPopular: false,
      },
      {
        name: "Signature",
        price: "$199",
        cadence: "/mo",
        description: "More sessions, more value.",
        features: ["12 Recovery Sessions/Month", "Premium Service Discounts"],
        mostPopular: true,
      },
    ],
    standardPrices: [
      { name: "Cryotherapy", price: "$40", note: "Single session" },
      { name: "Red Light Therapy", price: "$40", note: "Single session" },
      { name: "Infrared Sauna", price: "$40", note: "Single session" },
      { name: "Dry Float", price: "$40", note: "Single session" },
      { name: "Compression Therapy", price: "$30", note: "Single session" },
      { name: "Oxygen Bar", price: "$20", note: "Single session" },
      { name: "Cryo Slimming", price: "$350", note: "Single session" },
      { name: "Cryo Toning", price: "$350", note: "Single session" },
      { name: "CryoLift Facial", price: "$225", note: "Single session" },
      { name: "Cryo Soothe", price: "$85", note: "Single session" },
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

export default zivel_palm_coast_location;
