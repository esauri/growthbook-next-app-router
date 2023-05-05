import { cookies } from "next/headers";

/**
 * Grabs the userId from cookies
 *
 * @returns
 */
export default function getUserId() {
  const cookieStore = cookies();
  const userIdCookie = cookieStore.get("userId");

  return userIdCookie?.value;
}
