import { getLocationServiceImage } from "@/lib/data/location-service-images";

export type HolidayOffer = {
  id: string;
  title: string;
  price?: string;
  description?: string;
  image: string;
  imageAlt: string;
  imagePosition?: string;
  imageZoom?: number;
  purchaseUrl?: string;
  action: string;
};

export const BUCKHEAD_HOLIDAY_OFFERS: readonly HolidayOffer[] = [
  {
    id: "buckhead-6-pack-recovery",
    title: "6 Pack Recovery",
    price: "$99",
    description: "6 Recovery Services in 1 Month",
    image: getLocationServiceImage("buckhead", "red-light-therapy"),
    imageAlt: "Red light therapy at Zivel Buckhead",
    purchaseUrl: "https://app.clubready.com/JoinUs/14900/656882",
    action: "Buy Now",
  },
  {
    id: "buckhead-bogo-facials",
    title: "BOGO Cryo Facial/Double Chin",
    price: "$150",
    description: "Buy One Get/Give One",
    image: getLocationServiceImage("buckhead", "cryo-lift-facial"),
    imageAlt: "Cryo lift facial treatment at Zivel Buckhead",
    purchaseUrl: "https://app.clubready.com/JoinUs/14900/656883",
    action: "Buy Now",
  },
  {
    id: "buckhead-gift-cards",
    title: "Gift Cards",
    price: "$50+",
    description: "Give the Gift of Feeling Better",
    image: getLocationServiceImage("highlands-ranch", "infrared-sauna"),
    imageAlt: "Two people relaxing together in an infrared sauna",
    imagePosition: "right 40%",
    imageZoom: 1.3,
    purchaseUrl: "/locations/georgia/buckhead/pricing",
    action: "Gift Cards & More",
  },
];

export const HOLIDAY_OFFER_DISCLAIMER =
  "All services must be started and completed before 2/28/27. All sales are final and all services must be used at the location where they were purchased.";

export function getHolidayOffers(stateSlug: string, citySlug: string): readonly HolidayOffer[] {
  return stateSlug === "georgia" && citySlug === "buckhead" ? BUCKHEAD_HOLIDAY_OFFERS : [];
}

export function getHolidayPricingOffers(stateSlug: string, citySlug: string): readonly HolidayOffer[] {
  if (stateSlug !== "georgia" || citySlug !== "buckhead") return [];
  const giftCardServices = ["infrared-sauna", "dry-float", "compression-therapy"];
  const giftCardAlts = ["Infrared sauna", "Dry float recovery", "Compression therapy"];
  return [
    ...[50, 100, 200].map((amount, index): HolidayOffer => ({
      id: `buckhead-gift-card-${amount}`,
      title: "Gift Card",
      price: `$${amount}`,
      description: "Give the Gift of Feeling Better",
      image: getLocationServiceImage("buckhead", giftCardServices[index]),
      imageAlt: giftCardAlts[index],
      purchaseUrl: amount === 50 ? "https://app.clubready.com/JoinUs/14900/656879"
        : amount === 100 ? "https://app.clubready.com/JoinUs/14900/656885"
        : amount === 200 ? "https://app.clubready.com/JoinUs/14900/656886" : undefined,
      action: "Buy Now",
    })),
    BUCKHEAD_HOLIDAY_OFFERS[0],
    BUCKHEAD_HOLIDAY_OFFERS[1],
    {
      id: "buckhead-bogo-recovery",
      title: "BOGO Recovery",
      price: "$50",
      image: getLocationServiceImage("buckhead", "cryotherapy"),
      imageAlt: "Cryotherapy recovery service",
      purchaseUrl: "https://app.clubready.com/JoinUs/14900/656887",
      action: "Buy Now",
    },
  ];
}
