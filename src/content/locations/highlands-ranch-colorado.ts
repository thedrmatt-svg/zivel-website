import type { Location } from "@/types/location";

export const zivel_highlands_ranch_location: Location = {
  name: "Zivel Highlands Ranch",
  slug: "highlands-ranch",
  state: "CO",
  stateSlug: "colorado",
  citySlug: "highlands-ranch",

  seo: {
    title: "Zivel Highlands Ranch | Zivel",
    description: "Zivel Highlands Ranch offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/colorado/highlands-ranch",
  },

  contact: {
    address: "9325 Dorchester St ste f-121, Highlands Ranch, CO 80129",
    phone: "(720) 827-6311",
    parking: "Free parking or street available",
    notes: "",
  },

  booking: {
    locationId: 11431,
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
    "name": "Deena & Tom",
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

export default zivel_highlands_ranch_location;
