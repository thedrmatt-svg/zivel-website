import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // These campaign routes intentionally bypass locale handling, but still need
  // the same indexing protection for unused legacy ?route= URLs.
  const bypassLocale = /^\/(?:ads|riverton-ads|riverton-google)/.test(request.nextUrl.pathname);
  // Pass the request directly to next-intl's middleware.
  // Previously we injected an x-pathname header here so server components
  // could read the current pathname via headers(). That call to headers()
  // opted every [locale] route into dynamic streaming rendering, which caused
  // <title> and <meta name="description"> to arrive in $RC streaming fill
  // chunks after </head> — invisible to Lighthouse and crawlers.
  // x-pathname is no longer read anywhere; removing it keeps the middleware
  // header surface minimal.
  const response = bypassLocale ? NextResponse.next() : intlMiddleware(request);

  // The site does not use the old ?route= router. Keep every nonempty legacy
  // route value out of search results without altering normal-page canonicals
  // or opting the page layouts into dynamic rendering.
  if (request.nextUrl.searchParams.getAll("route").some((value) => value.trim() !== "")) {
    response.headers.set("X-Robots-Tag", "noindex");
  }

  return response;
}

export const config = {
  // Exclude API routes, Next.js internals, and static files. Campaign routes
  // still bypass i18n above, while receiving legacy-query indexing protection.
  // - /ads/* — new convention (/ads/riverton, /ads/riverton-google, etc.)
  // - /riverton-ads, /riverton-google — legacy root paths that redirect to /ads/*
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
