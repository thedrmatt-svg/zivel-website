import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https:; style-src 'self' 'unsafe-inline' https:; img-src 'self' data: https: blob:; font-src 'self' data: https:; frame-src 'self' https:; connect-src 'self' https:; object-src 'none'; base-uri 'self'; form-action 'self';",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Cross-Origin-Opener-Policy",
            value: "same-origin",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/riverton",
        destination: "/locations/utah/riverton",
        permanent: true,
      },
      {
        source: "/highlandsranch",
        destination: "/locations/colorado/highlands-ranch",
        permanent: true,
      },
      {
        source: "/fieldhouse",
        destination: "/locations/mississippi/fieldhouse",
        permanent: true,
      },
      {
        source: "/bentonville",
        destination: "/locations/arkansas/bentonville",
        permanent: true,
      },
      {
        source: "/locations/georgia/cumming",
        destination: "/locations/georgia/windermere",
        permanent: true,
      },
      {
        source: "/murfreesboro",
        destination: "/locations/tennessee/murfreesboro",
        permanent: true,
      },
    ];
  },
  allowedDevOrigins: [
    "*.replit.dev",
    "*.replit.app",
    "*.riker.replit.dev",
    "*.spock.replit.dev",
  ],
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 80, 85, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
};

export default withNextIntl(nextConfig);
