"use client";
import { GrowthBook, GrowthBookProvider } from "@growthbook/growthbook-react";
import React, { ReactNode, useEffect, useState } from "react";
import { AppFeatures } from "../../generated-types/app-features";

type Props = {
  children: ReactNode;
  id: string;
};

export default function GrowthbookClientProvider({ children, id }: Props) {
  const [growthbook] = useState(
    () =>
      new GrowthBook<AppFeatures>({
        apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
        clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
        enableDevMode: true,
      })
  );

  useEffect(() => {
    growthbook.loadFeatures({ autoRefresh: true });
  }, [growthbook]);

  useEffect(() => {
    growthbook.setAttributes({ id });
  }, [growthbook, id]);

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
}
