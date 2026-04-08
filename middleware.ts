import { NextRequest, NextResponse } from "next/server";
import { verifyToken, COOKIE_NAME } from "./lib/auth";

const PROTECTED_PATHS = ["/home", "/products", "/checkout", "/orders"];
const AUTH_PATHS = ["/login", "/register", "/forgot-password", "/reset-password"];

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get(COOKIE_NAME)?.value;
  const user = token ? await verifyToken(token) : null;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isAuthPage = AUTH_PATHS.some((p) => pathname.startsWith(p));

  // Not logged in trying to access protected page → send to login
  if (isProtected && !user) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Already logged in trying to access auth pages → send to home
  if (isAuthPage && user) {
    return NextResponse.redirect(new URL("/home", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/home/:path*",
    "/products/:path*",
    "/checkout/:path*",
    "/orders/:path*",
    "/login",
    "/register",
    "/forgot-password",
    "/reset-password",
  ],
};
