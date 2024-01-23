"use client";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import Cookies from "js-cookie";
import { type ReactNode, useEffect } from "react";
import { config } from "@/helpers/config";
import { CookieKeys } from "@/constants/cookies";

const { GROWTHBOOK_API_HOST, GROWTHBOOK_CLIENT_KEY, GROWTHBOOK_DEV_MODE } =
  config;

// Create a GrowthBook instance
const growthbook = new GrowthBook({
  apiHost: GROWTHBOOK_API_HOST,
  clientKey: GROWTHBOOK_CLIENT_KEY,
  enableDevMode: GROWTHBOOK_DEV_MODE,
  trackingCallback: (experiment, result) => {
    console.log("Viewed Experiment", experiment, result);
  },
});

type Props = {
  children: ReactNode;
};

export default function AppRouterClientOnlyLayout({ children }: Props) {
  useEffect(() => {
    growthbook.loadFeatures();

    growthbook.setAttributes({
      ...growthbook.getAttributes(),
      deviceId: Cookies.get(CookieKeys.deviceId),
    });
  }, []);

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
}
