import { getLocationServiceImage } from "@/lib/data/location-service-images";
import type { HolidayOffer } from "./holiday-offers";

// Presentation-only staging; Metairie's offer details and checkout links
// must come from the owner, never from another studio.
export const METAIRIE_HOLIDAY_OFFERS: readonly HolidayOffer[] = [
  {
    id: "metairie-recovery-special",
    title: "Day Pass",
    description: "3 Recovery Sessions",
    price: "$59",
    purchaseUrl: "https://app.clubready.com/JoinUs/14831/640981",
    image: getLocationServiceImage("metairie", "red-light-therapy"),
    imageAlt: "Red light therapy at Zivel Metairie",
    action: "Buy Now",
  },
  {
    id: "metairie-facial-special",
    title: "CryoFacial Special",
    image: getLocationServiceImage("metairie", "cryo-lift-facial"),
    imageAlt: "CryoFacial treatment at Zivel Metairie",
    action: "Buy Now",
  },
  {
    id: "metairie-gift-cards",
    title: "Gift Cards & More",
    description: "Give the Gift of Feeling Better",
    image: getLocationServiceImage("highlands-ranch", "infrared-sauna"),
    imageAlt: "Two people relaxing together in an infrared sauna",
    imagePosition: "right 40%",
    imageZoom: 1.3,
    purchaseUrl: "/locations/louisiana/metairie/pricing",
    action: "Gift Cards & More",
  },
];

export const METAIRIE_HOLIDAY_PRICING_OFFERS: readonly HolidayOffer[] = [
  ...["infrared-sauna", "dry-float", "cryo-slimming"].map((service, index): HolidayOffer => ({
    id: `metairie-gift-card-${index + 1}`,
    title: "Gift Card",
    description: `Spend $${[50, 100, 200][index]} & get $${[25, 50, 100][index]} Promotional Holiday In-Store Credit`,
    ...(index === 0 ? {
      price: "$50",
      purchaseUrl: "https://app.clubready.com/JoinUs/14831/657205",
    } : index === 1 ? {
      price: "$100",
      purchaseUrl: "https://app.clubready.com/JoinUs/14831/657526",
    } : {
      price: "$200",
      purchaseUrl: "https://app.clubready.com/JoinUs/14831/657527",
    }),
    image: getLocationServiceImage("metairie", service),
    imageAlt: `${["Infrared sauna", "Dry float recovery", "Cryo slimming treatment"][index]} at Zivel Metairie`,
    action: "Buy Now",
  })),
  METAIRIE_HOLIDAY_OFFERS[0],
  METAIRIE_HOLIDAY_OFFERS[1],
  {
    id: "metairie-additional-special",
    title: "Recovery Special",
    image: getLocationServiceImage("metairie", "cryotherapy"),
    imageAlt: "Cryotherapy at Zivel Metairie",
    action: "Buy Now",
  },
];
