import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
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
