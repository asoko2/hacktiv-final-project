import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const authentication = cookies().get("accessToken");
  const currentGroup = cookies().get("group")?.value;

  // console.log('currentGroup', currentGroup);

  if (request.nextUrl.pathname === "/") {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (request.nextUrl.pathname === "/login") {
    if (authentication) {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  if (request.nextUrl.pathname.startsWith("/dashboard")) {
    if (!authentication) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (
    request.nextUrl.pathname.startsWith("/dashboard/users") &&
    currentGroup !== "hrd"
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/", "/dashboard/:path*", "/login"],
};
