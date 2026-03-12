"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const nationalImageMap: Record<string, string> = {
  "cryotherapy": "/images/home/service-cryo.jpg",
  "red-light-therapy": "/images/home/service-redlight.jpg",
  "infrared-sauna": "/images/home/service-sauna.jpg",
  "dry-float": "/images/home/service-dryfloat.jpg",
  "compression-therapy": "/images/home/service-compression.jpg",
  "cryo-slimming": "/images/home/service-slimming.jpg",
  "cryo-toning": "/images/services/cryo-toning/hero.avif",
  "cryo-lift-facial": "/images/services/cryo-lift-facial/hero.avif",
};

const fallbackImage = "/images/home/service-exercise.jpg";

type ServiceImageCardProps = {
  slug: string;
  name: string;
  description?: string;
  citySlug: string;
  cityName: string;
  variant: "light" | "dark";
};

export default function ServiceImageCard({
  slug,
  name,
  description,
  citySlug,
  cityName,
  variant,
}: ServiceImageCardProps) {
  const customSrc = `/locations/${citySlug}/services/${slug}.jpg`;
  const nationalSrc = nationalImageMap[slug] || fallbackImage;
  const [src, setSrc] = useState(customSrc);

  const isDark = variant === "dark";

  return (
    <Link
      href={`/services/${slug}`}
      className="block zv-luxury-card overflow-hidden h-full group"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={src}
          alt={`Zivel ${name} at ${cityName} Location`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
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
