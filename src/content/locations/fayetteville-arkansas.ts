import type { Location } from "@/types/location";

export const zivel_fayetteville_location: Location = {
  name: "Zivel Fayetteville",
  slug: "fayetteville",
  state: "AR",
  stateSlug: "arkansas",
  citySlug: "fayetteville",

  seo: {
    title: "Zivel Fayetteville | Zivel",
    description: "Zivel Fayetteville offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/arkansas/fayetteville",
  },

  contact: {
    address: "3484 W Wedington Dr Suite 5, Fayetteville, AR 72704",
    phone: "(479) 800-4443",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "9am – 7pm",
    tuesday: "9am – 7pm",
    wednesday: "9am – 7pm",
    thursday: "9am – 7pm",
    friday: "9am – 5pm",
    saturday: "9am – 3pm",
    sunday: "11am – 3pm",
  },

  booking: {
    locationId: 11616,
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
    "name": "Patrick & Allison",
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
        price: "$49",
        cadence: "/mo",
        description: "A great entry point for regular recovery.",
        features: ["4 Recovery Sessions/Month", "Good for Beginners"],
        mostPopular: false,
      },
      {
        name: "Elite",
        price: "$99",
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
      { name: "Compression Therapy", price: "$40", note: "Single session" },
      { name: "Oxygen Bar", price: "$40", note: "Single session" },
      { name: "Cryo Slimming", price: "$350", note: "Single session" },
      { name: "Cryo Toning", price: "$350", note: "Single session" },
      { name: "CryoLift Facial", price: "$150", note: "Single session" },
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

export default zivel_fayetteville_location;
