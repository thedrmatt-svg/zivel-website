import type { Location } from "@/types/location";

export const zivel_cumming_windermere_location: Location = {
  name: "Zivel Cumming-Windermere",
  slug: "windermere",
  state: "GA",
  stateSlug: "georgia",
  citySlug: "windermere",

  seo: {
    title: "Zivel Cumming-Windermere | Zivel",
    description: "Zivel Cumming-Windermere offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/georgia/windermere",
  },

  contact: {
    address: "3775 Windermere Pkwy suite l, Cumming, GA 30041",
    phone: "(470) 539-1126",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "9am – 7pm",
    tuesday: "9am – 7pm",
    wednesday: "9am – 7pm",
    thursday: "9am – 7pm",
    friday: "9am – 5pm",
    saturday: "9am – 5pm",
    sunday: "Closed",
  },

  booking: {
    locationId: 11617,
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
    "name": "Janis",
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
        bookingUrl: "https://app.clubready.com/JoinUs/14944/630695",
      },
      {
        name: "Elite",
        price: "$129",
        cadence: "/mo",
        description: "More sessions, more value.",
        features: ["8 Recovery Sessions/Month", "Premium Service Discounts"],
        mostPopular: true,
        bookingUrl: "https://app.clubready.com/JoinUs/14944/630696",
      },
    ],
    specialDealsBottom: [
      {
        name: "Day Pass — 3 Recovery Sessions",
        price: "$49",
        savings: "Completed in 1 day",
        benefits: ["First Time Clients Only", "Single use"],
        bookingUrl: "https://app.clubready.com/JoinUs/14944/641756",
      },
      {
        name: "Individual All Access Plan",
        price: "$99 1st month",
        savings: "Then $179/mo from month 2",
        bookingUrl: "https://app.clubready.com/JoinUs/14944/637624",
        featured: true,
      },
      {
        name: "Family Unlimited",
        price: "$189/mo",
        savings: "Then $299/mo from month 2",
        benefits: [
          "Unlimited Recovery Services for up to 4 family members",
          "Discounts on Premium Services",
        ],
        bookingUrl: "https://app.clubready.com/JoinUs/14944/637626",
      },
      {
        name: "5 Cryo Facials",
        price: "$500",
        bookingUrl: "https://app.clubready.com/JoinUs/14944/648827",
      },
      {
        name: "5 Cryo Slimmings",
        price: "$1,000",
        bookingUrl: "https://app.clubready.com/JoinUs/14944/648827",
      },
      {
        name: "10 Cryo Slimmings",
        price: "$1,500",
        bookingUrl: "https://app.clubready.com/JoinUs/14944/648829",
      },
    ],
    standardPrices: [
      { name: "Cryotherapy", price: "$40", note: "Single session" },
      { name: "Red Light Therapy", price: "$30", note: "Single session" },
      { name: "Infrared Sauna", price: "$40", note: "Single session" },
      { name: "Dry Float", price: "$65", note: "Single session" },
      { name: "Compression Therapy", price: "$30", note: "Single session" },
      { name: "Oxygen Bar", price: "$30", note: "Single session" },
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

export default zivel_cumming_windermere_location;
