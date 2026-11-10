import { getLocationServiceImage } from "@/lib/data/location-service-images";

export type HolidayOffer = {
  id: string;
  title: string;
  price: string;
  description?: string;
  image: string;
  imageAlt: string;
  purchaseUrl: string;
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
];

export const HOLIDAY_OFFER_DISCLAIMER =
  "All services must be started and completed before 2/28/27. All sales are final and all services must be used at the location where they were purchased.";

export function getHolidayOffers(stateSlug: string, citySlug: string): readonly HolidayOffer[] {
  return stateSlug === "georgia" && citySlug === "buckhead" ? BUCKHEAD_HOLIDAY_OFFERS : [];
}
