import { GrowthBook } from "@growthbook/growthbook";
import { cookies } from "next/headers";
import { CookieKeys } from "@/constants/cookies";
import { config } from "@/helpers/config";

const { GROWTHBOOK_API_HOST, GROWTHBOOK_CLIENT_KEY, GROWTHBOOK_DEV_MODE } =
  config;

const growthbook = new GrowthBook({
  apiHost: GROWTHBOOK_API_HOST,
  clientKey: GROWTHBOOK_CLIENT_KEY,
  enableDevMode: GROWTHBOOK_DEV_MODE,
  trackingCallback: (experiment, result) => {
    // TODO: Use your real analytics tracking system
    console.log("Viewed Experiment", {
      experimentId: experiment.key,
      variationId: result.key,
    });
  },
});

export async function getGrowthbook() {
  const cookieStore = cookies();
  const deviceIdCookie = cookieStore.get(CookieKeys.deviceId);
  const deviceId = deviceIdCookie?.value;

  growthbook.setAttributes({
    deviceId,
  });

  await growthbook.loadFeatures();

  return growthbook;
}
