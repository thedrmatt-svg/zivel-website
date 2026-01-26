import type { Location } from "@/types/location";

export const zivel_fieldhouse_location: Location = {
  name: "Zivel Fieldhouse",
  slug: "fieldhouse",
  state: "MS",
  stateSlug: "mississippi",
  citySlug: "fieldhouse",

  seo: {
    title: "Zivel Fieldhouse | Zivel",
    description: "Zivel Fieldhouse offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/mississippi/fieldhouse",
  },

  contact: {
    address: "1582 Green T Rd E, Hernando, MS 38632",
    phone: "(662) 879-9900",
    parking: "Free parking or street available",
    notes: "Inside Fieldhouse near Hernando, MS",
  },

  booking: {
    locationId: null,
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
    "name": "Jay",
    "title": "Local Operator",
    "bio": "This location is independently operated. Local leadership supports the studio experience, community partnerships, and day-to-day service quality."
  }
],

  partners: [],
};

export default zivel_fieldhouse_location;
