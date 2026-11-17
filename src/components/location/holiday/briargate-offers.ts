import { getLocationServiceImage } from "@/lib/data/location-service-images";
import type { HolidayOffer } from "./holiday-offers";

// Stage the approved presentation without inventing Briargate's prices or links.
export const BRIARGATE_HOLIDAY_OFFERS: readonly HolidayOffer[] = [
  {
    id: "briargate-recovery-special",
    title: "Recovery Special",
    image: getLocationServiceImage("briargate", "red-light-therapy"),
    imageAlt: "Red light therapy at Zivel Briargate",
    action: "Buy Now",
  },
  {
    id: "briargate-facial-special",
    title: "CryoFacial Special",
    image: getLocationServiceImage("briargate", "cryo-lift-facial"),
    imageAlt: "CryoFacial treatment at Zivel Briargate",
    action: "Buy Now",
  },
  {
    id: "briargate-gift-cards",
    title: "Gift Cards & More",
    description: "Give the Gift of Feeling Better",
    image: getLocationServiceImage("highlands-ranch", "infrared-sauna"),
    imageAlt: "Two people relaxing together in an infrared sauna",
    imagePosition: "right 40%",
    imageZoom: 1.3,
    purchaseUrl: "/locations/colorado/briargate/pricing",
    action: "Gift Cards & More",
  },
];

export const BRIARGATE_HOLIDAY_PRICING_OFFERS: readonly HolidayOffer[] = [
  ...["infrared-sauna", "compression-therapy", "cryo-slimming"].map((service, index): HolidayOffer => ({
    id: `briargate-gift-card-${index + 1}`,
    title: "Gift Card",
    price: `$${[50, 100, 200][index]}`,
    purchaseUrl: `https://app.clubready.com/JoinUs/15196/${[657241, 657242, 657243][index]}`,
    image: getLocationServiceImage("briargate", service),
    imageAlt: `${["Infrared sauna", "Compression therapy", "Cryo slimming treatment"][index]} at Zivel Briargate`,
    action: "Buy Now",
  })),
  BRIARGATE_HOLIDAY_OFFERS[0],
  BRIARGATE_HOLIDAY_OFFERS[1],
  {
    id: "briargate-additional-special",
    title: "Recovery Special",
    image: getLocationServiceImage("briargate", "cryotherapy"),
    imageAlt: "Cryotherapy at Zivel Briargate",
    action: "Buy Now",
  },
];
