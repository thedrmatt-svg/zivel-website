import { NextRequest } from "next/server";

// Next.js adapter for the managed Clerk frontend proxy. Unlike the editor
// routes this proxy does not require a session: it serves the login SDK.
async function proxy(request: NextRequest, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path = [] } = await params;
  const target = new URL(path.map(encodeURIComponent).join("/") + request.nextUrl.search, "https://frontend-api.clerk.dev/");
  const headers = new Headers(request.headers);
  for (const name of ["host", "connection", "content-length", "accept-encoding"]) headers.delete(name);
  const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim() || request.headers.get("host") || request.nextUrl.host;
  headers.set("Clerk-Proxy-Url", `https://${host}/api/__clerk`);
  headers.set("Clerk-Secret-Key", process.env.CLERK_SECRET_KEY ?? "");
  const upstream = await fetch(target, {
    method: request.method, headers,
    body: ["GET", "HEAD"].includes(request.method) ? undefined : await request.arrayBuffer(),
    redirect: "manual", cache: "no-store",
  });
  const responseHeaders = new Headers(upstream.headers);
  for (const name of ["transfer-encoding", "connection", "keep-alive", "content-encoding", "content-length"]) responseHeaders.delete(name);
  const bodyless = request.method === "HEAD" || [204, 304].includes(upstream.status);
  const body = bodyless ? null : await upstream.arrayBuffer();
  if (body) responseHeaders.set("Content-Length", String(body.byteLength));
  return new Response(body, { status: upstream.status, headers: responseHeaders });
}

export { proxy as GET, proxy as POST, proxy as PUT, proxy as PATCH, proxy as DELETE, proxy as OPTIONS, proxy as HEAD };
