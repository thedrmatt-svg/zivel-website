import { getLocationServiceImage } from "@/lib/data/location-service-images";
import type { HolidayOffer } from "./holiday-offers";

// The recovery checkout destination and facial price await owner input.
export const WINDERMERE_HOLIDAY_OFFERS: readonly HolidayOffer[] = [
  {
    id: "windermere-recovery-special",
    title: "6 Recovery Services",
    price: "$99",
    image: getLocationServiceImage("windermere", "red-light-therapy"),
    imageAlt: "Red light therapy at Zivel Windermere",
    action: "Buy Now",
  },
  {
    id: "windermere-facial-special",
    title: "BOGO Cryo Ultra-Lift & Firming Facials & Chin",
    purchaseUrl: "https://app.clubready.com/JoinUs/14944/657222",
    image: getLocationServiceImage("windermere", "cryo-lift-facial"),
    imageAlt: "Cryo facial treatment at Zivel Windermere",
    action: "Buy Now",
  },
  {
    id: "windermere-gift-cards",
    title: "Gift Cards & More",
    price: "$50+",
    description: "Give the Gift of Feeling Better",
    image: getLocationServiceImage("highlands-ranch", "infrared-sauna"),
    imageAlt: "Two people relaxing together in an infrared sauna",
    imagePosition: "right 40%",
    imageZoom: 1.3,
    purchaseUrl: "/locations/georgia/windermere/pricing",
    action: "Gift Cards & More",
  },
];

export const WINDERMERE_HOLIDAY_PRICING_OFFERS: readonly HolidayOffer[] = [
  ...["infrared-sauna", "dry-float", "cryo-slimming"].map((service, index): HolidayOffer => ({
    id: `windermere-gift-card-${index + 1}`,
    title: "Gift Card",
    price: `$${[50, 100, 200][index]}`,
    purchaseUrl: `https://app.clubready.com/JoinUs/14944/${[644563, 644566, 644567][index]}`,
    image: getLocationServiceImage("windermere", service),
    imageAlt: `${["Infrared sauna", "Dry float recovery", "Cryo slimming treatment"][index]} at Zivel Windermere`,
    action: "Buy Now",
  })),
  WINDERMERE_HOLIDAY_OFFERS[0],
  WINDERMERE_HOLIDAY_OFFERS[1],
];
