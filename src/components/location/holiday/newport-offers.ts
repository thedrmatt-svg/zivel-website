import { getLocationServiceImage } from "@/lib/data/location-service-images";
import type { HolidayOffer } from "./holiday-offers";

// Restore Newport's approved staging independently of later Riverton edits.
const serviceOffer = (
  id: string, title: string, service: string, imageLabel: string,
  details: Partial<HolidayOffer> = {},
): HolidayOffer => ({
  id: `newport-${id}`,
  title,
  image: getLocationServiceImage("newport", service),
  imageAlt: `${imageLabel} at Zivel Newport`,
  action: "Buy Now",
  ...details,
});

const eightServiceRecoveryOffer = serviceOffer("eight-service-recovery", "Recovery Special", "dry-float", "Dry float recovery", {
  price: "$199",
  description: "8 Services",
  purchaseUrl: "https://app.clubready.com/JoinUs/14833/657759",
});

const fiveServiceRecoveryOffer = serviceOffer("five-service-recovery", "Recovery Special", "infrared-sauna", "Infrared sauna", {
  price: "$149",
  description: "5 Services",
  purchaseUrl: "https://app.clubready.com/JoinUs/14833/657707",
});

export const NEWPORT_HOLIDAY_OFFERS: readonly HolidayOffer[] = [
  serviceOffer("6-pack-recovery", "Recovery Special", "red-light-therapy", "Red light therapy", {
    price: "$99",
    description: "3 Recovery Services",
    purchaseUrl: "https://app.clubready.com/JoinUs/14833/657705",
  }),
  eightServiceRecoveryOffer,
  {
    id: "newport-gift-cards",
    title: "Gift Cards & More",
    price: "$50+",
    description: "Give the Gift of Feeling Better",
    image: getLocationServiceImage("highlands-ranch", "infrared-sauna"),
    imageAlt: "Two people relaxing together in an infrared sauna",
    imagePosition: "right 40%",
    imageZoom: 1.3,
    purchaseUrl: "/locations/kentucky/newport/pricing",
    action: "Gift Cards & More",
  },
];

export const NEWPORT_HOLIDAY_PRICING_OFFERS: readonly HolidayOffer[] = [
  ...[
    { price: "$50", checkout: "657057", service: "infrared-sauna", label: "Infrared sauna" },
    { price: "$100", checkout: "656490", service: "dry-float", label: "Dry float recovery" },
    { price: "$200", checkout: "657058", service: "cryo-slimming", label: "Cryo slimming treatment" },
  ].map(({ price, checkout, service, label }, index) =>
    serviceOffer(`gift-card-${index + 1}`, "Gift Card", service, label, {
      price,
      purchaseUrl: `https://app.clubready.com/JoinUs/14833/${checkout}`,
    })),
  NEWPORT_HOLIDAY_OFFERS[0],
  fiveServiceRecoveryOffer,
  eightServiceRecoveryOffer,
  ...[
    { sessions: 3, price: "$324", checkout: "657029" },
    { sessions: 6, price: "$576", checkout: "657030" },
    { sessions: 10, price: "$792", checkout: "657031" },
  ].map(({ sessions, price, checkout }) =>
    serviceOffer(`cryofacial-${sessions}-sessions`, `CryoFacial — ${sessions} Sessions`, "cryo-lift-facial", "CryoFacial treatment", {
      price,
      purchaseUrl: `https://app.clubready.com/JoinUs/14833/${checkout}`,
    })),
  ...[1, 2, 3].map(number =>
    serviceOffer(`slimming-special-${number}`, "Slimming Special", "cryo-slimming", "Cryo slimming treatment", {
      description: "Details coming soon",
    })),
];
