import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async headers() {
    return [
      // ── Ads landing pages: belt-and-suspenders noindex header ────────────
      // These pages already set `robots: { index: false }` in their metadata,
      // but an explicit response header ensures crawlers never index them even
      // if the metadata is accidentally removed.
      {
        source: "/riverton-ads",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
      {
        source: "/es/:path*",
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex, nofollow",
          },
        ],
      },
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
          // ── Prefer CSP frame-ancestors over X-Frame-Options (modern browsers)
          // X-Frame-Options above remains for legacy browser compatibility.
          {
            key: "Content-Security-Policy",
            value: "frame-ancestors 'self'",
          },
          // ── AI/LLM discovery — point crawlers to sitemap and llms.txt ───────
          {
            key: "Link",
            value: [
              '<https://www.zivel.com/sitemap.xml>; rel="sitemap"; type="application/xml"',
              '<https://www.zivel.com/llms.txt>; rel="describedby"; type="text/plain"',
            ].join(", "),
          },
          // ── Disable browser features this site does not use ────────────────
          {
            key: "Permissions-Policy",
            value: [
              "camera=()",
              "microphone=()",
              "geolocation=()",
              "payment=()",
              "usb=()",
              "bluetooth=()",
              "midi=()",
              "magnetometer=()",
              "gyroscope=()",
              "accelerometer=()",
              "ambient-light-sensor=()",
              "display-capture=()",
              "interest-cohort=()",
              // fullscreen intentionally omitted — Google Maps iframes use it
            ].join(", "),
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      // ── Canonical domain: non-www → www ─────────────────────────────────
      { source: "/:path*", has: [{ type: "host" as const, value: "zivel.com" }], destination: "https://www.zivel.com/:path*", permanent: true },

      // ── Subdomain redirects ─────────────────────────────────────────────
      { source: "/:path*", has: [{ type: "host" as const, value: "coralgables.zivel.com" }], destination: "https://www.zivel.com/locations/florida/coral-gables/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host" as const, value: "brecksville.zivel.com"  }], destination: "https://www.zivel.com/locations/ohio/brecksville/:path*",     permanent: true },

      // ── Franchisee domain redirects ─────────────────────────────────────
      { source: "/locations/north-carolina/belmont{/}?", destination: "https://www.belmontzivel.com",    permanent: true },
      { source: "/locations/florida/palm-coast{/}?",     destination: "https://www.palmcoastzivel.com", permanent: true },

      // ── Legacy / typo path redirects ────────────────────────────────────
      { source: "/riverton{/}?",                                  destination: "https://www.zivel.com/locations/utah/riverton",           permanent: true },
      { source: "/locations/mississippi/hernando/fieldhouse{/}?", destination: "https://www.zivel.com/locations/mississippi/fieldhouse",  permanent: true },
      { source: "/locations/northcarolina/belmont{/}?",           destination: "https://www.belmontzivel.com",                           permanent: true },
      { source: "/locations/florida/coralgables{/}?",             destination: "https://www.zivel.com/locations/florida/coral-gables",    permanent: true },
      { source: "/locations/colorado/highlandsranch{/}?",         destination: "https://www.zivel.com/locations/colorado/highlands-ranch",permanent: true },
      { source: "/locations/georgie/cumming/windermere{/}?",      destination: "https://www.zivel.com/locations/georgia/windermere",      permanent: true },
      { source: "/locations/georgia/cumming/windermere{/}?",      destination: "https://www.zivel.com/locations/georgia/windermere",      permanent: true },

      // ── Squarespace-era bare-slug shortcuts ─────────────────────────────
      { source: "/coolspot{/}?",        destination: "https://www.zivel.com",                                       permanent: true },
      { source: "/cherryhills{/}?",     destination: "https://www.zivel.com",                                       permanent: true },
      { source: "/belmont{/}?",         destination: "https://www.belmontzivel.com",                                permanent: true },
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
      { source: "/palm-coast{/}?",      destination: "https://www.palmcoastzivel.com", permanent: true },
      { source: "/palmcoast{/}?",       destination: "https://www.palmcoastzivel.com", permanent: true },
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
  webpack(config, { dev, isServer }) {
    if (dev && isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: false,
      };
    }
    return config;
  },
};

export default withNextIntl(nextConfig);
