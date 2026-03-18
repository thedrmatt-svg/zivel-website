import type { Location } from "@/types/location";

export const zivel_belmont_location: Location = {
  name: "Zivel Belmont",
  slug: "belmont",
  state: "NC",
  stateSlug: "north-carolina",
  citySlug: "belmont",

  seo: {
    title: "Zivel Belmont | Zivel",
    description: "Zivel Belmont offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/north-carolina/belmont",
  },

  contact: {
    address: "202 S Main St Suite E, Belmont, NC 28012",
    phone: "(704) 858-5552",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "8am – 7pm",
    tuesday: "8am – 7pm",
    wednesday: "8am – 7pm",
    thursday: "8am – 7pm",
    friday: "8am – 5pm",
    saturday: "10am – 3pm",
    sunday: "10am – 3pm",
  },

  booking: {
    locationId: 11472,
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
    "name": "Burt",
    "title": "Local Operator",
    "bio": "This location is independently operated. Local leadership supports the studio experience, community partnerships, and day-to-day service quality."
  }
],

  google: {
    placeId: "ChIJjaywtH29VogRFXe1l_SIid0",
    mapEmbedUrl: "",
  },

  pricing: {
    membershipTiers: [
      {
        name: "Bronze",
        price: "$99",
        cadence: "/month",
        description: "A great entry point for regular recovery.",
        features: ["4 Sessions per month", "Premium Service Discount"],
        mostPopular: false,
        bookingUrl: "https://www.clubready.com/JoinUs/14875/635456",
      },
      {
        name: "Silver",
        price: "$129",
        cadence: "/month",
        description: "More sessions, more value.",
        features: ["6 Sessions per month", "Premium Service Discounts"],
        mostPopular: false,
        bookingUrl: "https://www.clubready.com/JoinUs/14875/635455",
      },
      {
        name: "Gold",
        price: "$149",
        cadence: "/month",
        description: "The complete Zivel experience.",
        features: ["Unlimited Services", "Premium Service Discounts"],
        mostPopular: true,
        bookingUrl: "https://www.clubready.com/JoinUs/14875/635453",
      },
    ],
    specialDeals: [
      {
        name: "Buy 1 Cryo Slimming/Toning and get 2 Red Light Sessions Free",
        price: "$350",
        savings: "$100",
        bookingUrl: "https://app.clubready.com/JoinUs/14875/645548",
      },
      {
        name: "Buy 2 Recovery Sessions and get 1 Free",
        price: "$100",
        savings: "$50",
        bookingUrl: "https://app.clubready.com/JoinUs/14875/643787",
      },
      {
        name: "Buy 1 Cryo Slimming/Toning and Cryo Facial Combo",
        price: "$474",
        savings: "$51",
        bookingUrl: "https://app.clubready.com/JoinUs/14875/645543",
      },
    ],
    standardPrices: [
      { name: "Cryotherapy", price: "$50", note: "Single session" },
      { name: "Red Light Therapy", price: "$50", note: "Single session" },
      { name: "Infrared Sauna", price: "$50", note: "Single session" },
      { name: "Dry Float", price: "$50", note: "Single session" },
      { name: "Compression Therapy", price: "$50", note: "Single session" },
      { name: "Oxygen Bar", price: "$50", note: "Single session" },
      { name: "Cryo Slimming", price: "$350", note: "Single session" },
      { name: "Cryo Toning", price: "$350", note: "Single session" },
      { name: "CryoLift Facial", price: "$175", note: "Single session" },
      { name: "Cryo Soothe", price: "$50", note: "Single session" },
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

export default zivel_belmont_location;
