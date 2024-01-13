"use client";
import { useFeatureValue } from "@growthbook/growthbook-react";
import BackLink from "@/components/BackLink";
import FormattedDate from "@/components/FormattedDate";

type Props = {
  timestamp: number;
};

export default function AppRouterClientOnlyDynamicPageContent({
  timestamp,
}: Props) {
  const isInTest = useFeatureValue<boolean>("example_link_color_test", false);

  return (
    <main className="container p-4 flex flex-col gap-4 items-start">
      <h1>Next App Router + Growthbook</h1>
      <p>
        This is an example of a dynamic page built app pages router. Page
        rendered at <FormattedDate isInTest={isInTest} timestamp={timestamp} />.
      </p>
      <p>
        This is similar to the pages router version. If you're in the variant
        and you refresh the page you will see the colors flash. This is because
        the test is only on the client.
      </p>
      <BackLink isInTest={isInTest} />
    </main>
  );
}
