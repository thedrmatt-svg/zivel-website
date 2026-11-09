import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse, type NextFetchEvent } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

const intlMiddleware = createMiddleware(routing);
const editorMiddleware = clerkMiddleware();

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  // Authentication is restricted to the private editor; public pages retain
  // their existing locale, metadata, consent, and tracking behavior.
  if (request.nextUrl.pathname.startsWith("/admin") || request.nextUrl.pathname.startsWith("/api/blog-editor")) {
    return editorMiddleware(request, event);
  }
  // These campaign routes intentionally bypass locale handling, but still need
  // the same indexing protection for unused legacy ?route= URLs.
  const isMock = /^\/mock\/?$/.test(request.nextUrl.pathname);
  const bypassLocale = isMock || /^\/(?:ads|riverton-ads|riverton-google)/.test(request.nextUrl.pathname);
  // Pass the request directly to next-intl's middleware.
  // Previously we injected an x-pathname header here so server components
  // could read the current pathname via headers(). That call to headers()
  // opted every [locale] route into dynamic streaming rendering, which caused
  // <title> and <meta name="description"> to arrive in $RC streaming fill
  // chunks after </head> — invisible to Lighthouse and crawlers.
  // x-pathname is no longer read anywhere; removing it keeps the middleware
  // header surface minimal.
  const response = bypassLocale ? NextResponse.next() : intlMiddleware(request);
  if (isMock) response.headers.set("X-Robots-Tag", "noindex, nofollow");

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
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)", "/api/blog-editor/:path*"],
};
