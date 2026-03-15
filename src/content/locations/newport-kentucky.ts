import type { Location } from "@/types/location";

export const zivel_newport_location: Location = {
  name: "Zivel Newport",
  slug: "newport",
  state: "KY",
  stateSlug: "kentucky",
  citySlug: "newport",

  seo: {
    title: "Zivel Newport | Zivel",
    description: "Zivel Newport offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/kentucky/newport",
  },

  contact: {
    address: "91A Carothers Rd, Newport, KY 41071",
    phone: "(859) 250-0852",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "8am – 7pm",
    tuesday: "8am – 7pm",
    wednesday: "8am – 7pm",
    thursday: "8am – 7pm",
    friday: "8am – 5pm",
    saturday: "9am – 4pm",
    sunday: "10am – 3pm",
  },

  booking: {
    locationId: 11437,
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
    "name": "Gina",
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
        name: "Base",
        price: "$X",
        cadence: "/mo",
        description: "Placeholder",
        features: ["Placeholder", "Placeholder"],
        mostPopular: false,
      },
      {
        name: "Plus",
        price: "$X",
        cadence: "/mo",
        description: "Placeholder",
        features: ["Placeholder", "Placeholder"],
        mostPopular: true,
      },
    ],
    standardPrices: [
      { name: "Cryotherapy", price: "$40", note: "Single session" },
      { name: "Red Light Therapy", price: "$40", note: "Single session" },
      { name: "Infrared Sauna", price: "$40", note: "Single session" },
      { name: "Dry Float", price: "$40", note: "Single session" },
      { name: "Compression Therapy", price: "$40", note: "Single session" },
      { name: "Oxygen Bar", price: "$40", note: "Single session" },
      { name: "Cryo Slimming", price: "$350", note: "Single session" },
      { name: "Cryo Toning", price: "$350", note: "Single session" },
      { name: "CryoLift Facial", price: "$150", note: "Single session" },
      { name: "Cryo Soothe", price: "$40", note: "Single session" },
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

export default zivel_newport_location;
