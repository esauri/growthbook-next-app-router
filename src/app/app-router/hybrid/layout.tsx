import { type ReactNode } from "react";
import { getGrowthbook } from "@/api/growthbook";
import GrowthbookClientProvider from "./GrowthbookClientProvider";

type Props = {
  children: ReactNode;
};

export default async function AppRouterHybridLayout({ children }: Props) {
  const growthbook = await getGrowthbook();

  const attributes = growthbook.getAttributes();
  const features = growthbook.getFeatures();
  const experiments = growthbook.getExperiments();

  return (
    <GrowthbookClientProvider
      attributes={attributes}
      experiments={experiments}
      features={features}
    >
      {children}
    </GrowthbookClientProvider>
  );
}
