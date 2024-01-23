import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import Cookies from "js-cookie";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import { CookieKeys } from "@/constants/cookies";
import { config } from "@/helpers/config";
import { inter } from "@/helpers/fonts";
import "@/styles/globals.css";

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

export default function PagesLayout({ Component, pageProps }: AppProps) {
  useEffect(() => {
    growthbook.loadFeatures();

    growthbook.setAttributes({
      ...growthbook.getAttributes(),
      deviceId: Cookies.get(CookieKeys.deviceId),
    });
  }, []);

  return (
    <div className={inter.className}>
      <GrowthBookProvider growthbook={growthbook}>
        <Component {...pageProps} />
      </GrowthBookProvider>
    </div>
  );
}
