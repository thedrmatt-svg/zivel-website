import type { Location } from "@/types/location";

export const zivel_highlands_ranch_location: Location = {
  name: "Zivel Highlands Ranch",
  slug: "highlands-ranch",
  state: "CO",
  stateSlug: "colorado",
  citySlug: "highlands-ranch",
  openedYear: 2024,

  seo: {
    title: "Zivel Highlands Ranch | Zivel",
    description: "Zivel Highlands Ranch offers cryotherapy, red light therapy, infrared sauna, dry float, and recovery services in Highlands Ranch, CO. Book today.",
    canonical: "https://www.zivel.com/locations/colorado/highlands-ranch",
  },

  contact: {
    address: "9325 Dorchester St ste f-121, Highlands Ranch, CO 80129",
    phone: "(720) 827-6311",
    parking: "Free parking or street available",
    notes: "",
  },

  hours: {
    monday: "9am – 7pm",
    tuesday: "9am – 7pm",
    wednesday: "9am – 7pm",
    thursday: "9am – 7pm",
    friday: "9am – 6pm",
    saturday: "9am – 4pm",
    sunday: "10am – 3pm",
  },

  hero: {
    subheadline: "South Denver's leader in recovery and regenerative aesthetics. Advanced cryotherapy, infrared sauna with red light therapy, and non-invasive body contouring in Highlands Ranch.",
  },

  booking: {
    locationId: 11431,
  },

  services: [
  {
    "name": "Cryotherapy",
    "slug": "cryotherapy",
    "imageAlt": "Person stepping into a cryotherapy chamber at Zivel Highlands Ranch"
  },
  {
    "name": "Infrared Sauna w/ Red Light",
    "slug": "infrared-sauna",
    "imageAlt": "Woman relaxing in an infrared sauna with red light at Zivel Highlands Ranch"
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
    "slug": "cryo-lift-facial",
    "imageAlt": "CryoLift Facial treatment close-up at Zivel Highlands Ranch"
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
        name: "Essential",
        price: "$99",
        cadence: "/mo",
        description: "A great entry point for regular recovery.",
        features: ["4 Recovery Sessions/Month", "Good for Beginners"],
        mostPopular: false,
      },
      {
        name: "Elite",
        price: "$149",
        cadence: "/mo",
        description: "More sessions, more value.",
        features: ["8 Recovery Sessions/Month", "Premium Service Discounts"],
        mostPopular: true,
      },
    ],
    standardPrices: [
      { name: "Cryotherapy", price: "$45", note: "Single session" },
      { name: "Infrared Sauna w/ Red Light", price: "$50", note: "Single session" },
      { name: "Dry Float", price: "$50", note: "Single session" },
      { name: "Compression Therapy", price: "$30", note: "Single session" },
      { name: "Oxygen Bar", price: "$20", note: "Single session" },
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

  localBlog: {
    href: "/locations/colorado/highlands-ranch/blog",
    heading: "Highlands Ranch Wellness Insights",
    description:
      "Stay up to date with the latest recovery tips, local wellness news, client stories, and expert advice from the Zivel Highlands Ranch team. Discover how cryotherapy, red light therapy, infrared sauna, and more are helping people in Highlands Ranch and the South Denver area feel and perform their best.",
    ctaLabel: "Read the Highlands Ranch Blog",
  },
};

export default zivel_highlands_ranch_location;
