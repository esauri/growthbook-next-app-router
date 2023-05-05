import React, { ReactNode } from "react";
import getServerSideGrowthBook from "../../utils/growthbook";
import GrowthbookClientProvider from "./GrowthbookClientProvider";

type Props = {
  children: ReactNode;
};

export default async function GrowthbookProvider({ children }: Props) {
  const growthbook = await getServerSideGrowthBook();
  const attributes = growthbook.getAttributes();
  const features = growthbook.getFeatures();

  return (
    <GrowthbookClientProvider attributes={attributes} features={features}>
      {children}
    </GrowthbookClientProvider>
  );
}
