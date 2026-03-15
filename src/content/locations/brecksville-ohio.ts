import type { Location } from "@/types/location";

export const zivel_brecksville_location: Location = {
  name: "Zivel Brecksville",
  slug: "brecksville",
  state: "OH",
  stateSlug: "ohio",
  citySlug: "brecksville",

  seo: {
    title: "Zivel Brecksville | Zivel",
    description: "Zivel Brecksville offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/ohio/brecksville",
  },

  contact: {
    address: "8215 Chippewa Rd, Brecksville, OH 44141",
    phone: "(440) 875-7629",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "8am – 6pm",
    tuesday: "8am – 6pm",
    wednesday: "8am – 6pm",
    thursday: "8am – 6pm",
    friday: "8am – 5pm",
    saturday: "9am – 2pm",
    sunday: "Closed",
  },

  booking: {
    locationId: 11438,
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
    "name": "Mark",
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
      { name: "Cryotherapy", price: "$X", note: "Single session" },
      { name: "Infrared Sauna", price: "$X", note: "Single session" },
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

export default zivel_brecksville_location;
