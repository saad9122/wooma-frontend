// middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;

    // Redirect logged-in users away from login page
    if (token && req.nextUrl.pathname.startsWith("/auth/login")) {
      return NextResponse.redirect(new URL("/reports", req.url));
    }

    // Allow everything else to work as normal
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // Protect matched routes
    },
  }
);

export const config = {
  matcher: [
    "/reports/:path*",
    "/users/:path*",
    "/auth/login", // now also run middleware for login
  ],
};
