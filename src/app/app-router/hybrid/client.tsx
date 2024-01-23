"use client";
import { useFeatureValue } from "@growthbook/growthbook-react";

export default function AppRouterHybridClientComponent() {
  let isInTest = useFeatureValue<boolean>("example_link_color_test", false);
  const className = isInTest ? "bg-purple-500/20" : "bg-blue-500/20";

  return (
    <div className={`${className} rounded-lg  p-4 w-full`}>
      <p>This is a client component</p>
    </div>
  );
}
