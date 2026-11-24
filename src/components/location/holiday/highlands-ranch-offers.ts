import { getLocationServiceImage } from "@/lib/data/location-service-images";
import type { HolidayOffer } from "./holiday-offers";

const city = "highlands-ranch";
const saunaPhoto = {
  image: "/images/locations/highlands-ranch/sauna-card.jpg",
  imageAlt: "Woman relaxing in the infrared sauna at Zivel Highlands Ranch",
};

// Prices and credits are confirmed; checkout links are still pending.
export const HIGHLANDS_RANCH_HOLIDAY_OFFERS: readonly HolidayOffer[] = [
  {
    id: "highlands-ranch-recovery-special",
    title: "Recovery",
    description: "6 Recovery Sessions",
    price: "$99",
    image: getLocationServiceImage(city, "red-light-therapy"),
    imageAlt: "Person lying in a red light therapy bed",
    action: "Buy Now",
  },
  {
    id: "highlands-ranch-facial-special",
    title: "BOGO CryoFacial",
    description: "Buy One, Get/Give One",
    price: "$199",
    image: "/images/locations/highlands-ranch/facial-card.jpg",
    imageAlt: "Close-up of a CryoLift Facial treatment at Zivel Highlands Ranch",
    action: "Buy Now",
  },
  {
    id: "highlands-ranch-gift-cards",
    title: "GIFTS & EXCLUSIVE DEALS",
    description: "Gift Cards • Premium Packages • Holiday Offers",
    price: "$50+",
    ...saunaPhoto,
    purchaseUrl: "/locations/colorado/highlands-ranch/pricing",
    action: "Explore Holiday Gifts",
  },
];

export const HIGHLANDS_RANCH_HOLIDAY_PRICING_OFFERS: readonly HolidayOffer[] = [
  ...[
    { ...saunaPhoto, price: "$50" },
    {
      image: getLocationServiceImage(city, "compression-therapy"),
      imageAlt: "Compression therapy session",
      price: "$100",
      description: "Spend $100, receive $25 in credit",
    },
    {
      image: getLocationServiceImage(city, "cryo-soothe"),
      imageAlt: "Cryo Soothe treatment",
      price: "$200",
      description: "Spend $200, receive $50 in credit",
    },
  ].map((card, index): HolidayOffer => ({
    id: `highlands-ranch-gift-card-${index + 1}`,
    title: "Gift Card",
    ...card,
    action: "Buy Now",
  })),
  ...HIGHLANDS_RANCH_HOLIDAY_OFFERS.slice(0, 2),
  {
    id: "highlands-ranch-cryo-soothe-two-pack",
    title: "CryoSoothe",
    description: "2 CryoSoothe Sessions",
    price: "$69",
    image: getLocationServiceImage(city, "cryo-soothe"),
    imageAlt: "Cryo Soothe treatment",
    action: "Buy Now",
  },
  {
    id: "highlands-ranch-advanced-skin-services",
    title: "Advanced Skin Services",
    description: "BOGO ½ OFF",
    additionalDescription: "Microneedling • Dermaplane • HydoDiamon • Circadia Switch • Prodigy Peel • CryoFacial",
    image: "/images/locations/highlands-ranch/facial-card.jpg",
    imageAlt: "Close-up of a CryoLift Facial treatment at Zivel Highlands Ranch",
    action: "Buy Now",
  },
  {
    id: "highlands-ranch-body-contouring-bogo",
    title: "BOGO Body Contouring",
    description: "CryoSlimming • CryoToning • CryoShape",
    image: getLocationServiceImage(city, "cryo-slimming"),
    imageAlt: "Cryo slimming treatment",
    action: "Buy Now",
  },
];
