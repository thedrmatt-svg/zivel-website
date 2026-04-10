import type { Location } from "@/types/location";

export const zivel_hollywood_location: Location = {
  name: "Zivel Hollywood",
  slug: "hollywood",
  state: "FL",
  stateSlug: "florida",
  citySlug: "hollywood",

  seo: {
    title: "Zivel Hollywood | Zivel",
    description: "Zivel Hollywood offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/florida/hollywood",
  },

  contact: {
    address: "3361 Sheridan St, Hollywood, FL 33021",
    phone: "(754) 217-8177",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "9am – 7pm",
    tuesday: "9am – 7pm",
    wednesday: "9am – 7pm",
    thursday: "9am – 7pm",
    friday: "9am – 5pm",
    saturday: "9am – 4pm",
    sunday: "9am – 1pm",
  },

  booking: {
    locationId: 11433,
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
    "name": "Peter & Michelle",
    "title": "Local Operator",
    "bio": "This location is independently operated. Local leadership supports the studio experience, community partnerships, and day-to-day service quality."
  }
],

  google: {
    placeId: "",
    mapEmbedUrl: "",
  },

  pricing: {
    specialDealsPosition: "top",
    specialDeals: [
      {
        name: "Essential Membership — 1st Anniversary Special",
        price: "$79 1st month",
        savings: "Then $99/mo from month 2",
        benefits: ["8 Recovery Sessions/Month", "Good for Beginners"],
        bookingUrl: "https://zivel.myperformanceiq.com/book-appointment?set_location=11433",
      },
      {
        name: "Elite Membership — 1st Anniversary Special",
        price: "$99 1st month",
        savings: "Then $129/mo from month 2",
        benefits: ["12 Recovery Sessions/Month", "Premium Service Discounts"],
        bookingUrl: "https://zivel.myperformanceiq.com/book-appointment?set_location=11433",
        featured: true,
      },
      {
        name: "5 Cryo Facials",
        price: "$500",
        bookingUrl: "https://zivel.myperformanceiq.com/book-appointment?set_location=11433",
      },
      {
        name: "5 Cryo Slimmings",
        price: "$1,000",
        bookingUrl: "https://zivel.myperformanceiq.com/book-appointment?set_location=11433",
      },
      {
        name: "10 Cryo Slimmings",
        price: "$1,500",
        bookingUrl: "https://zivel.myperformanceiq.com/book-appointment?set_location=11433",
      },
    ],
    membershipTiers: [
      {
        name: "Essential",
        price: "$99",
        cadence: "/mo",
        description: "A great entry point for regular recovery.",
        features: ["8 Recovery Sessions/Month", "Good for Beginners"],
        mostPopular: false,
      },
      {
        name: "Elite",
        price: "$129",
        cadence: "/mo",
        description: "More sessions, more value.",
        features: ["12 Recovery Sessions/Month", "Premium Service Discounts"],
        mostPopular: true,
      },
    ],
    standardPrices: [
      { name: "Cryotherapy", price: "$45", note: "Single session" },
      { name: "Red Light Therapy", price: "$45", note: "Single session" },
      { name: "Infrared Sauna", price: "$45", note: "Single session" },
      { name: "Dry Float", price: "$60", note: "Single session" },
      { name: "Compression Therapy", price: "$45", note: "Single session" },
      { name: "Oxygen Bar", price: "$30", note: "Single session" },
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

export default zivel_hollywood_location;
