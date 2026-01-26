import type { Location } from "@/types/location";

export const zivel_briargate_location: Location = {
  name: "Zivel Briargate",
  slug: "briargate",
  state: "CO",
  stateSlug: "colorado",
  citySlug: "briargate",

  seo: {
    title: "Zivel Briargate | Zivel",
    description: "Zivel Briargate offers modern wellness and recovery services including cryotherapy, red light therapy, infrared sauna, dry float, compression therapy, and more. Book a session or explore memberships.",
    canonical: "https://www.zivel.com/locations/colorado/briargate",
  },

  contact: {
    address: "460 Chapel Hills Dr Ste 120, Colorado Springs, CO 80920",
    phone: "(719) 500-1638",
    parking: "Free parking or street available",
    notes: "",
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
    "name": "Gracie",
    "title": "Local Operator",
    "bio": "This location is independently operated. Local leadership supports the studio experience, community partnerships, and day-to-day service quality."
  }
],

  partners: [],
};

export default zivel_briargate_location;
