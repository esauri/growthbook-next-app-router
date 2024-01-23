import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { CookieKeys } from "@/constants/cookies";
import { generateUniqueDeviceId } from "@/helpers/generateUniqueDeviceId";

const ONE_YEAR_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365;

/**
 * Set a deviceId cookie for all users
 *
 * @param request
 * @returns
 */
export function middleware(request: NextRequest) {
  const existingDeviceId = request.cookies.get(CookieKeys.deviceId)?.value;

  if (existingDeviceId) return;

  const response = NextResponse.next();

  const deviceId = generateUniqueDeviceId();

  response.cookies.set(CookieKeys.deviceId, deviceId, {
    expires: new Date(Date.now() + ONE_YEAR_IN_MILLISECONDS * 1),
    sameSite: "lax",
    secure: true,
  });

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - robots.txt (SEO)
     */
    "/((?!api|_next/static|_next/image|robots.txt).*)",
  ],
};
