"use server";
import { cookies } from "next/headers";
import { z } from "zod";
import { Bucket } from "@/constants/bucket";
import { CookieKeys } from "@/constants/cookies";
import { generateUniqueDeviceId } from "@/helpers/generateUniqueDeviceId";

const ONE_YEAR_IN_MILLISECONDS = 1000 * 60 * 60 * 24 * 365;

const FormValueSchema = z.nativeEnum(Bucket);

export async function setBucket(formData: FormData) {
  const parsedBucket = FormValueSchema.safeParse(formData.get("bucket"));

  if (!parsedBucket.success) {
    throw new Error("Invalid bucket");
  }

  const bucket = parsedBucket.data;

  let deviceId = generateUniqueDeviceId();
  if (bucket === Bucket.control) {
    deviceId = "off";
  } else if (bucket === Bucket.variant) {
    deviceId = "on";
  }

  const cookieStore = cookies();

  cookieStore.set(CookieKeys.deviceId, deviceId, {
    expires: new Date(Date.now() + ONE_YEAR_IN_MILLISECONDS * 1),
    sameSite: "lax",
    secure: true,
  });

  return { message: "Success" };
}
