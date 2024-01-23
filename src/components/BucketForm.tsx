import { cookies } from "next/headers";
import { setBucket } from "@/actions/bucket";
import { Bucket } from "@/constants/bucket";
import { CookieKeys } from "@/constants/cookies";
import SubmitButton from "./SubmitButton";

export default function BucketForm() {
  const currentBucket = getCurrentBucket();

  return (
    <form action={setBucket} className="flex gap-4">
      <SubmitButton
        isActive={currentBucket === Bucket.control}
        value={Bucket.control}
      >
        Control
      </SubmitButton>
      <SubmitButton
        isActive={currentBucket === Bucket.variant}
        value={Bucket.variant}
      >
        Variant
      </SubmitButton>
      <SubmitButton
        isActive={currentBucket === Bucket.random}
        value={Bucket.random}
      >
        Random
      </SubmitButton>
    </form>
  );
}

function getCurrentBucket() {
  const cookieStore = cookies();
  const cookie = cookieStore.get(CookieKeys.deviceId);

  if (!cookie?.value) return Bucket.random;

  switch (cookie.value) {
    case "off":
      return Bucket.control;
    case "on":
      return Bucket.variant;
    default:
      return Bucket.random;
  }
}
