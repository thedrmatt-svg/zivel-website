import { getLocationServiceImage } from "@/lib/data/location-service-images";
import type { HolidayOffer } from "./holiday-offers";

const city = "highlands-ranch";
const saunaPhoto = {
  image: "/images/locations/highlands-ranch/sauna-card.jpg",
  imageAlt: "Woman relaxing in the infrared sauna at Zivel Highlands Ranch",
};

// Stage the layout without setting unconfirmed prices or checkout destinations.
export const HIGHLANDS_RANCH_HOLIDAY_OFFERS: readonly HolidayOffer[] = [
  {
    id: "highlands-ranch-recovery-special",
    title: "Recovery Special",
    image: getLocationServiceImage(city, "cryotherapy"),
    imageAlt: "Person stepping into a cryotherapy chamber at Zivel Highlands Ranch",
    action: "Buy Now",
  },
  {
    id: "highlands-ranch-facial-special",
    title: "CryoFacial Special",
    image: "/images/locations/highlands-ranch/facial-card.jpg",
    imageAlt: "Close-up of a CryoLift Facial treatment at Zivel Highlands Ranch",
    action: "Buy Now",
  },
  {
    id: "highlands-ranch-gift-cards",
    title: "GIFTS & EXCLUSIVE DEALS",
    description: "Gift Cards • Premium Packages • Holiday Offers",
    ...saunaPhoto,
    purchaseUrl: "/locations/colorado/highlands-ranch/pricing",
    action: "Explore Holiday Gifts",
  },
];

export const HIGHLANDS_RANCH_HOLIDAY_PRICING_OFFERS: readonly HolidayOffer[] = [
  ...[
    saunaPhoto,
    { image: getLocationServiceImage(city, "compression-therapy"), imageAlt: "Compression therapy session" },
    { image: getLocationServiceImage(city, "cryo-soothe"), imageAlt: "Cryo Soothe treatment" },
  ].map((photo, index): HolidayOffer => ({
    id: `highlands-ranch-gift-card-${index + 1}`,
    title: "Gift Card",
    ...photo,
    action: "Buy Now",
  })),
  ...HIGHLANDS_RANCH_HOLIDAY_OFFERS.slice(0, 2),
  {
    id: "highlands-ranch-additional-special",
    title: "Service Special",
    image: getLocationServiceImage(city, "cryo-slimming"),
    imageAlt: "Cryo slimming treatment",
    action: "Buy Now",
  },
];
