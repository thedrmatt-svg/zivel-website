import type { Location } from "@/types/location";

export const zivel_metairie_location: Location = {
  name: "Zivel Metairie",
  slug: "metairie",
  state: "LA",
  stateSlug: "louisiana",
  citySlug: "metairie",

  seo: {
    title: "Zivel Metairie | Zivel",
    description: "Zivel Metairie offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/louisiana/metairie",
  },

  contact: {
    address: "701 Metairie Rd suite 1b 201, Metairie, LA 70005",
    phone: "(504) 519-7154",
    parking: "Free parking or street available",
    notes: "",
  },

  booking: {
    locationId: 11435,
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
    "name": "Chris, Trey & Josh",
    "title": "Local Operator",
    "bio": "This location is independently operated. Local leadership supports the studio experience, community partnerships, and day-to-day service quality."
  }
],

  partners: [],
};

export default zivel_metairie_location;
