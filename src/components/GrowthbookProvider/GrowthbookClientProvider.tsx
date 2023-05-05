"use client";
import {
  FeatureDefinition,
  GrowthBook,
  GrowthBookProvider,
} from "@growthbook/growthbook-react";
import React, { ReactNode, useEffect, useState } from "react";
import { AppFeatures } from "../../generated-types/app-features";

type Props = {
  attributes: Record<string, any>;
  children: ReactNode;
  features: Record<string, FeatureDefinition<any>>;
};

export default function GrowthbookClientProvider({
  attributes,
  children,
  features,
}: Props) {
  const [growthbook] = useState(
    () =>
      new GrowthBook<AppFeatures>({
        apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
        attributes,
        clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
        features,
        enableDevMode: true,
      })
  );

  useEffect(() => {
    growthbook.loadFeatures({ autoRefresh: true });
  }, [growthbook]);

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
}
