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
      // ── Subdomain redirects ─────────────────────────────────────────────
      { source: "/:path*", has: [{ type: "host" as const, value: "coralgables.zivel.com" }], destination: "https://www.zivel.com/locations/florida/coral-gables/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host" as const, value: "brecksville.zivel.com"  }], destination: "https://www.zivel.com/locations/ohio/brecksville/:path*",     permanent: true },

      // ── Legacy / typo path redirects ────────────────────────────────────
      { source: "/riverton{/}?",                                  destination: "https://www.zivel.com/locations/utah/riverton",           permanent: true },
      { source: "/locations/mississippi/hernando/fieldhouse{/}?", destination: "https://www.zivel.com/locations/mississippi/fieldhouse",  permanent: true },
      { source: "/locations/northcarolina/belmont{/}?",           destination: "https://www.zivel.com/locations/north-carolina/belmont",  permanent: true },
      { source: "/locations/florida/coralgables{/}?",             destination: "https://www.zivel.com/locations/florida/coral-gables",    permanent: true },
      { source: "/locations/colorado/highlandsranch{/}?",         destination: "https://www.zivel.com/locations/colorado/highlands-ranch",permanent: true },
      { source: "/locations/georgie/cumming/windermere{/}?",      destination: "https://www.zivel.com/locations/georgia/windermere",      permanent: true },
      { source: "/locations/georgia/cumming/windermere{/}?",      destination: "https://www.zivel.com/locations/georgia/windermere",      permanent: true },

      // ── Squarespace-era bare-slug shortcuts ─────────────────────────────
      { source: "/coolspot{/}?",        destination: "https://www.zivel.com",                                       permanent: true },
      { source: "/cherryhills{/}?",     destination: "https://www.zivel.com",                                       permanent: true },
      { source: "/belmont{/}?",         destination: "https://www.zivel.com/locations/north-carolina/belmont",      permanent: true },
      { source: "/bentonville{/}?",     destination: "https://www.zivel.com/locations/arkansas/bentonville",        permanent: true },
      { source: "/brecksville{/}?",     destination: "https://www.zivel.com/locations/ohio/brecksville",            permanent: true },
      { source: "/briargate{/}?",       destination: "https://www.zivel.com/locations/colorado/briargate",          permanent: true },
      { source: "/buckhead{/}?",        destination: "https://www.zivel.com/locations/georgia/buckhead",            permanent: true },
      { source: "/cool-springs{/}?",    destination: "https://www.zivel.com/locations/tennessee/cool-springs",      permanent: true },
      { source: "/coolsprings{/}?",     destination: "https://www.zivel.com/locations/tennessee/cool-springs",      permanent: true },
      { source: "/coral-gables{/}?",    destination: "https://www.zivel.com/locations/florida/coral-gables",        permanent: true },
      { source: "/coralgables{/}?",     destination: "https://www.zivel.com/locations/florida/coral-gables",        permanent: true },
      { source: "/fayetteville{/}?",    destination: "https://www.zivel.com/locations/arkansas/fayetteville",       permanent: true },
      { source: "/fieldhouse{/}?",      destination: "https://www.zivel.com/locations/mississippi/fieldhouse",      permanent: true },
      { source: "/highlands-ranch{/}?", destination: "https://www.zivel.com/locations/colorado/highlands-ranch",    permanent: true },
      { source: "/highlandsranch{/}?",  destination: "https://www.zivel.com/locations/colorado/highlands-ranch",    permanent: true },
      { source: "/hollywood{/}?",       destination: "https://www.zivel.com/locations/florida/hollywood",           permanent: true },
      { source: "/metairie{/}?",        destination: "https://www.zivel.com/locations/louisiana/metairie",          permanent: true },
      { source: "/murfreesboro{/}?",    destination: "https://www.zivel.com/locations/tennessee/murfreesboro",      permanent: true },
      { source: "/newport{/}?",         destination: "https://www.zivel.com/locations/kentucky/newport",            permanent: true },
      { source: "/palm-coast{/}?",      destination: "https://www.zivel.com/locations/florida/palm-coast",          permanent: true },
      { source: "/palmcoast{/}?",       destination: "https://www.zivel.com/locations/florida/palm-coast",          permanent: true },
      { source: "/parker{/}?",          destination: "https://www.zivel.com/locations/colorado/parker",             permanent: true },
      { source: "/rogers{/}?",          destination: "https://www.zivel.com/locations/arkansas/rogers",             permanent: true },
      { source: "/windermere{/}?",      destination: "https://www.zivel.com/locations/georgia/windermere",          permanent: true },
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
