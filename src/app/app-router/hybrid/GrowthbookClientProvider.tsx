"use client";
import type { AutoExperiment } from "@growthbook/growthbook";
import {
  type Attributes,
  FeatureDefinition,
  GrowthBook,
  GrowthBookProvider,
} from "@growthbook/growthbook-react";
import { type ReactNode, useEffect, useState } from "react";
import { config } from "@/helpers/config";

const { GROWTHBOOK_API_HOST, GROWTHBOOK_CLIENT_KEY, GROWTHBOOK_DEV_MODE } =
  config;

type Props = {
  attributes: Attributes;
  children: ReactNode;
  experiments: AutoExperiment[];
  features: Record<string, FeatureDefinition<any>>;
};

export default function GrowthbookClientProvider({
  attributes,
  children,
  experiments,
  features,
}: Props) {
  // Create a GrowthBook instance
  const [growthbook] = useState(() => {
    return new GrowthBook({
      apiHost: GROWTHBOOK_API_HOST,
      attributes,
      clientKey: GROWTHBOOK_CLIENT_KEY,
      experiments,
      features,
      enableDevMode: GROWTHBOOK_DEV_MODE,
      trackingCallback: (experiment, result) => {
        /**
         * @TODO: Use your real analytics tracking system
         * Since you're doing a hybrid approach ensure you don't duplicate events, as this may also be called on the server
         */
        console.log("Viewed Experiment", experiment, result);
      },
    });
  });

  useEffect(() => {
    growthbook.loadFeatures();
  }, [growthbook]);

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
}
