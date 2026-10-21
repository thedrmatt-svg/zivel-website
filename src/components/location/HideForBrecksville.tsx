"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { isBrecksvilleLocationPath } from "@/lib/location-availability";

export default function HideForBrecksville({ children }: { children: ReactNode }) {
  return isBrecksvilleLocationPath(usePathname()) ? null : <>{children}</>;
}
