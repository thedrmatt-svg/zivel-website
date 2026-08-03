import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // Pass the request directly to next-intl's middleware.
  // Previously we injected an x-pathname header here so server components
  // could read the current pathname via headers(). That call to headers()
  // opted every [locale] route into dynamic streaming rendering, which caused
  // <title> and <meta name="description"> to arrive in $RC streaming fill
  // chunks after </head> — invisible to Lighthouse and crawlers.
  // x-pathname is no longer read anywhere; removing it keeps the middleware
  // header surface minimal.
  return intlMiddleware(request);
}

export const config = {
  // Exclude API routes, Next.js internals, static files, and any standalone
  // ad landing pages (e.g. /riverton-google) from the i18n middleware so they
  // are served directly without locale detection or redirection.
  matcher: ["/((?!api|_next|_vercel|riverton-google|.*\\..*).*)"],
};
