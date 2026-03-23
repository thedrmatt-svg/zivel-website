import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import { NextRequest, NextResponse } from "next/server";

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Inject x-pathname into the request headers before next-intl processes it.
  // next-intl forwards request headers via NextResponse.next({ request: { headers } }),
  // so Server Components can read them with headers() from next/headers.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-pathname", pathname);
  const patchedRequest = new NextRequest(request, { headers: requestHeaders });

  return intlMiddleware(patchedRequest);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
