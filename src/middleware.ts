import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

function sessionCookieName(req: NextRequest) {
  const names = req.cookies.getAll().map((cookie) => cookie.name);
  if (names.some((name) => name.startsWith("__Secure-authjs.session-token"))) {
    return "__Secure-authjs.session-token";
  }
  if (names.some((name) => name.startsWith("authjs.session-token"))) {
    return "authjs.session-token";
  }
  return req.nextUrl.protocol === "https:"
    ? "__Secure-authjs.session-token"
    : "authjs.session-token";
}

export async function middleware(req: NextRequest) {
  const cookieName = sessionCookieName(req);
  const token = await getToken({
    req,
    secret: process.env.AUTH_SECRET,
    secureCookie: cookieName.startsWith("__Secure-"),
    cookieName,
    salt: cookieName,
  });
  const path = req.nextUrl.pathname;

  if (!token) {
    const url = new URL("/inloggen", req.url);
    url.searchParams.set("callbackUrl", path);
    return NextResponse.redirect(url);
  }

  if (path.startsWith("/admin")) {
    const role = token.role as string | undefined;
    if (role !== "ADMIN" && role !== "EDITOR") {
      return NextResponse.redirect(new URL("/user/dashboard", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard",
    "/dashboard/:path*",
    "/user/dashboard",
    "/user/dashboard/:path*",
    "/admin",
    "/admin/:path*",
    "/profiel",
    "/profiel/:path*",
    "/zakelijk/claimen",
    "/zakelijk/claimen/:path*",
  ],
};
