import type { Location } from "@/types/location";

export const zivel_murfreesboro_location: Location = {
  name: "Zivel Murfreesboro",
  slug: "murfreesboro",
  state: "TN",
  stateSlug: "tennessee",
  citySlug: "murfreesboro",

  seo: {
    title: "Zivel Murfreesboro | Zivel",
    description: "Zivel Murfreesboro offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/tennessee/murfreesboro",
  },

  contact: {
    address: "1144 Fortress Blvd ste e, Murfreesboro, TN 37128",
    phone: "(629) 239-1986",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "9am – 7pm",
    tuesday: "9am – 7pm",
    wednesday: "9am – 7pm",
    thursday: "9am – 7pm",
    friday: "9am – 7pm",
    saturday: "9am – 7pm",
    sunday: "1pm – 4:30pm",
  },

  booking: {
    locationId: 11430,
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
    "name": "Scott",
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
      { name: "Infrared Sauna", price: "$35", note: "Single session" },
      { name: "Dry Float", price: "$65", note: "Single session" },
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

export default zivel_murfreesboro_location;
