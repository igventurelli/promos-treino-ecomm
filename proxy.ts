import { NextResponse, type NextRequest } from "next/server";

const allowedExactPaths = new Set(["/", "/privacidade"]);

function isAllowedPath(pathname: string) {
  return (
    allowedExactPaths.has(pathname) ||
    pathname.startsWith("/api/promos/") ||
    pathname.startsWith("/favicon/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/p/")
  );
}

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isAllowedPath(pathname)) {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/", request.url), 308);
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|ads.txt|site.webmanifest|robots.txt|.*\\..*).*)"],
};
