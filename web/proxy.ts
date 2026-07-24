import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const TOKEN_COOKIE = "token";
const AUTH_ROUTES = ["/login", "/login/create", "/login/lost", "/login/reset"];
const PROTECTED_ROUTES = ["/account"];

function matchesRoute(pathname: string, routes: string[]) {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const hasToken = request.cookies.has(TOKEN_COOKIE);

  if (hasToken && matchesRoute(pathname, AUTH_ROUTES)) {
    return NextResponse.redirect(new URL("/account", request.url));
  }

  if (!hasToken && matchesRoute(pathname, PROTECTED_ROUTES)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/account/:path*"],
};
