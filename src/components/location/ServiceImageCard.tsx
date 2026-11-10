"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { getLocationServiceImage, getLocationServiceImagePosition, getNationalServiceImage } from "@/lib/data/location-service-images";

type ServiceImageCardProps = {
  slug: string;
  name: string;
  description?: string;
  citySlug: string;
  cityName: string;
  variant: "light" | "dark";
  localHref?: string;
  imageAlt?: string;
  comingSoon?: boolean;
};

export default function ServiceImageCard({
  slug,
  name,
  description,
  citySlug,
  cityName,
  variant,
  localHref,
  imageAlt,
  comingSoon,
}: ServiceImageCardProps) {
  const nationalSrc = getNationalServiceImage(slug);
  const [src, setSrc] = useState(() => getLocationServiceImage(citySlug, slug));

  const isDark = variant === "dark";
  const href = localHref ?? `/services/${slug}`;

  return (
    <Link
      href={href}
      className="block zv-luxury-card overflow-hidden h-full group"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={src}
          alt={imageAlt ?? `Zivel ${name} at ${cityName} Location`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
          style={getLocationServiceImagePosition(citySlug, slug) === "center top"
            ? { objectPosition: "center top", transformOrigin: "center top" } : undefined}
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onError={() => {
            if (src !== nationalSrc) setSrc(nationalSrc);
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
      </div>
      <div className="p-6">
        <h3
          className={`text-xl mb-3 transition-colors duration-500 ${
            isDark
              ? "text-white group-hover:text-[var(--zivel-gold)]"
              : "text-black/85 group-hover:text-[var(--zivel-gold-dark)]"
          }`}
        >
          {name}
        </h3>
        {comingSoon && (
          <p className={`mb-4 text-sm font-semibold tracking-widest ${isDark ? "text-[var(--zivel-gold)]" : "text-[var(--zivel-gold-dark)]"}`}>
            COMING SOON
          </p>
        )}
        {description && (
          <p
            className={`text-sm line-clamp-3 mb-6 ${
              isDark ? "text-white/60" : "text-black/55"
            }`}
          >
            {description}
          </p>
        )}
        <span
          className={`text-sm font-medium flex items-center gap-2 ${
            isDark ? "text-[var(--zivel-gold)]" : "text-[var(--zivel-gold-dark)]"
          }`}
        >
          Explore
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform duration-300 group-hover:translate-x-1"
          >
            <path
              d="M3 8H13M13 8L9 4M13 8L9 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    </Link>
  );
}
