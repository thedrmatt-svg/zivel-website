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
    const WWW = [{ type: "host" as const, value: "www.zivel.com" }];

    // www-aware bare-slug rules — placed BEFORE the generic www→non-www
    // fallback so www.zivel.com/riverton lands in a single 301 hop.
    const wwwBareSlug = [
      { source: "/coolspot{/}?",        has: WWW, destination: "https://zivel.com",                                      permanent: true },
      { source: "/cherryhills{/}?",     has: WWW, destination: "https://zivel.com",                                      permanent: true },
      { source: "/belmont{/}?",         has: WWW, destination: "https://zivel.com/locations/north-carolina/belmont",     permanent: true },
      { source: "/bentonville{/}?",     has: WWW, destination: "https://zivel.com/locations/arkansas/bentonville",       permanent: true },
      { source: "/brecksville{/}?",     has: WWW, destination: "https://zivel.com/locations/ohio/brecksville",           permanent: true },
      { source: "/briargate{/}?",       has: WWW, destination: "https://zivel.com/locations/colorado/briargate",         permanent: true },
      { source: "/buckhead{/}?",        has: WWW, destination: "https://zivel.com/locations/georgia/buckhead",           permanent: true },
      { source: "/cool-springs{/}?",    has: WWW, destination: "https://zivel.com/locations/tennessee/cool-springs",     permanent: true },
      { source: "/coolsprings{/}?",     has: WWW, destination: "https://zivel.com/locations/tennessee/cool-springs",     permanent: true },
      { source: "/coral-gables{/}?",    has: WWW, destination: "https://zivel.com/locations/florida/coral-gables",       permanent: true },
      { source: "/coralgables{/}?",     has: WWW, destination: "https://zivel.com/locations/florida/coral-gables",       permanent: true },
      { source: "/fayetteville{/}?",    has: WWW, destination: "https://zivel.com/locations/arkansas/fayetteville",      permanent: true },
      { source: "/fieldhouse{/}?",      has: WWW, destination: "https://zivel.com/locations/mississippi/fieldhouse",     permanent: true },
      { source: "/highlands-ranch{/}?", has: WWW, destination: "https://zivel.com/locations/colorado/highlands-ranch",   permanent: true },
      { source: "/highlandsranch{/}?",  has: WWW, destination: "https://zivel.com/locations/colorado/highlands-ranch",   permanent: true },
      { source: "/hollywood{/}?",       has: WWW, destination: "https://zivel.com/locations/florida/hollywood",          permanent: true },
      { source: "/metairie{/}?",        has: WWW, destination: "https://zivel.com/locations/louisiana/metairie",         permanent: true },
      { source: "/murfreesboro{/}?",    has: WWW, destination: "https://zivel.com/locations/tennessee/murfreesboro",     permanent: true },
      { source: "/newport{/}?",         has: WWW, destination: "https://zivel.com/locations/kentucky/newport",           permanent: true },
      { source: "/palm-coast{/}?",      has: WWW, destination: "https://zivel.com/locations/florida/palm-coast",         permanent: true },
      { source: "/palmcoast{/}?",       has: WWW, destination: "https://zivel.com/locations/florida/palm-coast",         permanent: true },
      { source: "/parker{/}?",          has: WWW, destination: "https://zivel.com/locations/colorado/parker",            permanent: true },
      { source: "/riverton{/}?",        has: WWW, destination: "https://zivel.com/locations/utah/riverton",              permanent: true },
      { source: "/rogers{/}?",          has: WWW, destination: "https://zivel.com/locations/arkansas/rogers",            permanent: true },
      { source: "/windermere{/}?",      has: WWW, destination: "https://zivel.com/locations/georgia/windermere",         permanent: true },
    ];

    return [
      // ── 1. www-aware bare-slug shortcuts (single hop for www visitors) ──
      ...wwwBareSlug,

      // ── 2. Generic www → non-www fallback ──────────────────────────────
      { source: "/:path*", has: WWW, destination: "https://zivel.com/:path*", permanent: true },

      // ── 3. Subdomain redirects ──────────────────────────────────────────
      { source: "/:path*", has: [{ type: "host" as const, value: "coralgables.zivel.com" }], destination: "https://zivel.com/locations/florida/coral-gables/:path*", permanent: true },
      { source: "/:path*", has: [{ type: "host" as const, value: "brecksville.zivel.com"  }], destination: "https://zivel.com/locations/ohio/brecksville/:path*",     permanent: true },

      // ── 4. Legacy / typo path redirects ────────────────────────────────
      { source: "/riverton{/}?",                              destination: "https://zivel.com/locations/utah/riverton",           permanent: true },
      { source: "/locations/mississippi/hernando/fieldhouse{/}?", destination: "https://zivel.com/locations/mississippi/fieldhouse", permanent: true },
      { source: "/locations/northcarolina/belmont{/}?",       destination: "https://zivel.com/locations/north-carolina/belmont",   permanent: true },
      { source: "/locations/florida/coralgables{/}?",         destination: "https://zivel.com/locations/florida/coral-gables",     permanent: true },
      { source: "/locations/colorado/highlandsranch{/}?",     destination: "https://zivel.com/locations/colorado/highlands-ranch", permanent: true },
      { source: "/locations/georgie/cumming/windermere{/}?",  destination: "https://zivel.com/locations/georgia/windermere",       permanent: true },
      { source: "/locations/georgia/cumming/windermere{/}?",  destination: "https://zivel.com/locations/georgia/windermere",       permanent: true },

      // ── 5. Bare-slug shortcuts for non-www visitors ─────────────────────
      { source: "/coolspot{/}?",        destination: "https://zivel.com",                                      permanent: true },
      { source: "/cherryhills{/}?",     destination: "https://zivel.com",                                      permanent: true },
      { source: "/belmont{/}?",         destination: "https://zivel.com/locations/north-carolina/belmont",     permanent: true },
      { source: "/bentonville{/}?",     destination: "https://zivel.com/locations/arkansas/bentonville",       permanent: true },
      { source: "/brecksville{/}?",     destination: "https://zivel.com/locations/ohio/brecksville",           permanent: true },
      { source: "/briargate{/}?",       destination: "https://zivel.com/locations/colorado/briargate",         permanent: true },
      { source: "/buckhead{/}?",        destination: "https://zivel.com/locations/georgia/buckhead",           permanent: true },
      { source: "/cool-springs{/}?",    destination: "https://zivel.com/locations/tennessee/cool-springs",     permanent: true },
      { source: "/coolsprings{/}?",     destination: "https://zivel.com/locations/tennessee/cool-springs",     permanent: true },
      { source: "/coral-gables{/}?",    destination: "https://zivel.com/locations/florida/coral-gables",       permanent: true },
      { source: "/coralgables{/}?",     destination: "https://zivel.com/locations/florida/coral-gables",       permanent: true },
      { source: "/fayetteville{/}?",    destination: "https://zivel.com/locations/arkansas/fayetteville",      permanent: true },
      { source: "/fieldhouse{/}?",      destination: "https://zivel.com/locations/mississippi/fieldhouse",     permanent: true },
      { source: "/highlands-ranch{/}?", destination: "https://zivel.com/locations/colorado/highlands-ranch",   permanent: true },
      { source: "/highlandsranch{/}?",  destination: "https://zivel.com/locations/colorado/highlands-ranch",   permanent: true },
      { source: "/hollywood{/}?",       destination: "https://zivel.com/locations/florida/hollywood",          permanent: true },
      { source: "/metairie{/}?",        destination: "https://zivel.com/locations/louisiana/metairie",         permanent: true },
      { source: "/murfreesboro{/}?",    destination: "https://zivel.com/locations/tennessee/murfreesboro",     permanent: true },
      { source: "/newport{/}?",         destination: "https://zivel.com/locations/kentucky/newport",           permanent: true },
      { source: "/palm-coast{/}?",      destination: "https://zivel.com/locations/florida/palm-coast",         permanent: true },
      { source: "/palmcoast{/}?",       destination: "https://zivel.com/locations/florida/palm-coast",         permanent: true },
      { source: "/parker{/}?",          destination: "https://zivel.com/locations/colorado/parker",            permanent: true },
      { source: "/rogers{/}?",          destination: "https://zivel.com/locations/arkansas/rogers",            permanent: true },
      { source: "/windermere{/}?",      destination: "https://zivel.com/locations/georgia/windermere",         permanent: true },
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
