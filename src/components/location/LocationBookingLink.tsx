import type { ComponentProps } from "react";
import { isBrecksvilleLocation } from "@/lib/location-availability";

export default function LocationBookingLink({
  state,
  city,
  ...props
}: ComponentProps<"a"> & { state: string; city: string }) {
  if (isBrecksvilleLocation(state, city)) return null;
  return <a {...props} />;
}
