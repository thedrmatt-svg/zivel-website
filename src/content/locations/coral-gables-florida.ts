import type { Location } from "@/types/location";

export const zivel_coral_gables_location: Location = {
  name: "Zivel Coral Gables",
  slug: "coral-gables",
  state: "FL",
  stateSlug: "florida",
  citySlug: "coral-gables",

  seo: {
    title: "Zivel Coral Gables | Zivel",
    description: "Zivel Coral Gables offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/florida/coral-gables",
  },

  contact: {
    address: "348 Minorca Ave, Coral Gables, FL 33134",
    phone: "(786) 527-0842",
    parking: "Free parking or street available",
    notes: "",
  },

  booking: {
    locationId: 11432,
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
    "name": "Mike",
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

export default zivel_coral_gables_location;
