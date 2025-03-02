import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const sessionTokenName =
  process.env.NODE_ENV === "development"
    ? "next-auth.session-token"
    : "__Secure-next-auth.session-token";

const protectedPaths = ["/workspaces", "/form"];

const isRouteProtected = (pathname: string) => {
  return protectedPaths.some((p) => pathname.startsWith(p)); 
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.has(sessionTokenName);

  if (hasToken && (pathname === "/sign-in" || pathname === "/sign-up")) {
    return NextResponse.redirect(new URL("/workspaces", request.url));
  }

  if (!hasToken && isRouteProtected(pathname)) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/sign-in",
    "/sign-up",
    "/workspaces",
    "/form/:path*",
    "/submit/:path*",
  ],
};
