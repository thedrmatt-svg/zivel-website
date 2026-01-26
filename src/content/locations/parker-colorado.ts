import type { Location } from "@/types/location";

export const zivel_parker_location: Location = {
  name: "Zivel Parker",
  slug: "parker",
  state: "CO",
  stateSlug: "colorado",
  citySlug: "parker",

  seo: {
    title: "Zivel Parker | Zivel",
    description: "Zivel Parker offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/colorado/parker",
  },

  contact: {
    address: "17021 Lincoln Ave ste c, Parker, CO 80134",
    phone: "(720) 366-3622",
    parking: "Free parking or street available",
    notes: "",
  },

  booking: {
    locationId: 11680,
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
    "name": "Carla",
    "title": "Local Operator",
    "bio": "This location is independently operated. Local leadership supports the studio experience, community partnerships, and day-to-day service quality."
  }
],

  partners: [],
};

export default zivel_parker_location;
