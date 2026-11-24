import { getLocationServiceImage } from "@/lib/data/location-service-images";
import type { HolidayOffer } from "./holiday-offers";

const city = "highlands-ranch";
const saunaPhoto = {
  image: "/images/locations/highlands-ranch/sauna-card.jpg",
  imageAlt: "Woman relaxing in the infrared sauna at Zivel Highlands Ranch",
};

// Leave checkout disabled for offers that do not yet have an approved link.
export const HIGHLANDS_RANCH_HOLIDAY_OFFERS: readonly HolidayOffer[] = [
  {
    id: "highlands-ranch-recovery-special",
    title: "Recovery",
    description: "6 Recovery Sessions",
    price: "$99",
    image: getLocationServiceImage(city, "red-light-therapy"),
    imageAlt: "Person lying in a red light therapy bed",
    purchaseUrl: "https://app.clubready.com/JoinUs/14827/657911",
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
  {
    ...HIGHLANDS_RANCH_HOLIDAY_OFFERS[0],
    image: getLocationServiceImage(city, "cryotherapy"),
    imageAlt: "Person stepping into a cryotherapy chamber at Zivel Highlands Ranch",
  },
  HIGHLANDS_RANCH_HOLIDAY_OFFERS[1],
  {
    id: "highlands-ranch-red-light-five-pack",
    title: "Red Light Therapy",
    description: "5 Red Light Sessions",
    price: "$145",
    image: getLocationServiceImage(city, "red-light-therapy"),
    imageAlt: "Person lying in a red light therapy bed",
    action: "Buy Now",
  },
  {
    id: "highlands-ranch-cryo-soothe-two-pack",
    title: "BOGO CryoSoothe",
    description: "Buy One Get/Give One.",
    price: "$69",
    image: getLocationServiceImage(city, "cryo-soothe"),
    imageAlt: "Cryo Soothe treatment",
    purchaseUrl: "https://app.clubready.com/JoinUs/14827/657913",
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
    price: "$350",
    image: getLocationServiceImage(city, "cryo-slimming"),
    imageAlt: "Cryo slimming treatment",
    purchaseUrl: "https://app.clubready.com/JoinUs/14827/657912",
    action: "Buy Now",
  },
];
