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
    title: "Gift Cards & More",
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

// Same approved offers, but never reuse another studio's checkout destinations.
// Coral Gables purchase links will be supplied separately by the owner.
export const CORAL_GABLES_HOLIDAY_OFFERS: readonly HolidayOffer[] =
  BUCKHEAD_HOLIDAY_OFFERS.map((offer, index): HolidayOffer => ({
    ...offer,
    id: offer.id.replace("buckhead", "coral-gables"),
    image: index === 0
      ? getLocationServiceImage("coral-gables", "red-light-therapy")
      : index === 1
        ? getLocationServiceImage("coral-gables", "cryo-lift-facial")
        : offer.image,
    imageAlt: offer.imageAlt.replace("Zivel Buckhead", "Zivel Coral Gables"),
    imagePosition: index === 0 ? "center top" : offer.imagePosition,
    purchaseUrl: index === 2 ? "/locations/florida/coral-gables/pricing"
      : index === 1 ? "https://app.clubready.com/JoinUs/14828/656920"
      : "https://app.clubready.com/JoinUs/14828/656921",
  }));

export function getHolidayOffers(stateSlug: string, citySlug: string): readonly HolidayOffer[] {
  if (stateSlug === "colorado" && citySlug === "parker") return PARKER_HOLIDAY_OFFERS;
  if (stateSlug === "florida" && citySlug === "coral-gables") return CORAL_GABLES_HOLIDAY_OFFERS;
  return stateSlug === "georgia" && citySlug === "buckhead" ? BUCKHEAD_HOLIDAY_OFFERS : [];
}

// Parker-specific offer details and owner-supplied checkout destinations.
export const PARKER_HOLIDAY_OFFERS: readonly HolidayOffer[] =
  BUCKHEAD_HOLIDAY_OFFERS.map((offer, index): HolidayOffer => ({
    ...offer,
    id: offer.id.replace("buckhead", "parker"),
    ...(index === 0 ? {
      title: "BOGO DAY PASS",
      description: "3 Recovery Services/Day Pass",
      price: "$59",
    } : index === 1 ? { price: "$179" } : {}),
    image: index === 0 ? getLocationServiceImage("parker", "red-light-therapy")
      : index === 1 ? getLocationServiceImage("parker", "cryo-lift-facial")
      : offer.image,
    imageAlt: offer.imageAlt.replace("Zivel Buckhead", "Zivel Parker"),
    purchaseUrl: index === 2 ? "/locations/colorado/parker/pricing"
      : index === 1 ? "https://app.clubready.com/JoinUs/15044/656922"
      : "https://app.clubready.com/JoinUs/15044/656923",
  }));

export function getHolidayPricingOffers(stateSlug: string, citySlug: string): readonly HolidayOffer[] {
  const isCoralGables = stateSlug === "florida" && citySlug === "coral-gables";
  const isParker = stateSlug === "colorado" && citySlug === "parker";
  if (!isCoralGables && !isParker && (stateSlug !== "georgia" || citySlug !== "buckhead")) return [];
  const giftCardServices = ["infrared-sauna", "dry-float", "cryo-slimming"];
  const giftCardAlts = ["Infrared sauna", "Dry float recovery", "Cryo slimming treatment"];
  const buckheadOffers: readonly HolidayOffer[] = [
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
  if (isParker) return [...buckheadOffers.map((offer, index): HolidayOffer => ({
    ...offer,
    ...(index === 3 ? PARKER_HOLIDAY_OFFERS[0] : {}),
    ...(index === 4 ? PARKER_HOLIDAY_OFFERS[1] : {}),
    ...(index === 5 ? {
      title: "BOGO Cryo Slimming/Toning",
      price: "$350",
      description: "Buy One Get/Give One",
    } : {}),
    id: offer.id.replace("buckhead", "parker"),
    image: index < 3 ? getLocationServiceImage("parker", giftCardServices[index])
      : index === 3 ? PARKER_HOLIDAY_OFFERS[0].image
      : index === 4 ? PARKER_HOLIDAY_OFFERS[1].image
      : getLocationServiceImage("parker", "cryo-slimming"),
    imageAlt: index === 5 ? "Cryo slimming treatment at Zivel Parker"
      : offer.imageAlt.replace("Zivel Buckhead", "Zivel Parker"),
    purchaseUrl: index === 0 ? "https://app.clubready.com/JoinUs/15044/656874"
      : index === 1 ? "https://app.clubready.com/JoinUs/15044/656917"
      : index === 2 ? "https://app.clubready.com/JoinUs/15044/656918"
      : index === 3 ? PARKER_HOLIDAY_OFFERS[0].purchaseUrl
      : index === 4 ? PARKER_HOLIDAY_OFFERS[1].purchaseUrl
      : "https://app.clubready.com/JoinUs/15044/656924",
  })), {
    id: "parker-bogo-soothe",
    title: "BOGO SOOTHE",
    price: "$50",
    description: "Buy One Get/Give One",
    image: getLocationServiceImage("parker", "cryo-soothe"),
    imageAlt: "Cryo Soothe treatment at Zivel Parker",
    purchaseUrl: "https://app.clubready.com/JoinUs/15044/656928",
    action: "Buy Now",
  }, {
    id: "parker-all-access",
    title: "All Access",
    price: "$179",
    description: "Unlimited Recovery Membership",
    image: getLocationServiceImage("parker", "cryotherapy"),
    imageAlt: "Cryotherapy recovery service at Zivel Parker",
    purchaseUrl: "https://app.clubready.com/JoinUs/15044/656932",
    action: "Buy Now",
  }];
  if (!isCoralGables) return buckheadOffers;
  return buckheadOffers.map((offer, index): HolidayOffer => ({
    ...offer,
    ...(index === 3 ? CORAL_GABLES_HOLIDAY_OFFERS[0] : {}),
    ...(index === 4 ? CORAL_GABLES_HOLIDAY_OFFERS[1] : {}),
    id: offer.id.replace("buckhead", "coral-gables"),
    image: index < 3 ? getLocationServiceImage("coral-gables", giftCardServices[index])
      : index === 3 ? CORAL_GABLES_HOLIDAY_OFFERS[0].image
      : index === 4 ? CORAL_GABLES_HOLIDAY_OFFERS[1].image
      : getLocationServiceImage("coral-gables", "cryotherapy"),
    imageAlt: offer.imageAlt.replace("Zivel Buckhead", "Zivel Coral Gables"),
    purchaseUrl: index === 0 ? "https://app.clubready.com/JoinUs/14828/644802"
      : index === 1 ? "https://app.clubready.com/JoinUs/14828/644803"
      : index === 2 ? "https://app.clubready.com/JoinUs/14828/644804"
      : index === 3 ? CORAL_GABLES_HOLIDAY_OFFERS[0].purchaseUrl
      : index === 4 ? CORAL_GABLES_HOLIDAY_OFFERS[1].purchaseUrl
      : index === 5 ? "https://app.clubready.com/JoinUs/14828/656919" : undefined,
  }));
}
