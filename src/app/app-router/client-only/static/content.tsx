"use client";
import { useFeatureValue } from "@growthbook/growthbook-react";
import BackLink from "@/components/BackLink";
import FormattedDate from "@/components/FormattedDate";

type Props = {
  timestamp: number;
};

export default function AppRouterClientOnlyStaticPageContent({
  timestamp,
}: Props) {
  const isInTest = useFeatureValue<boolean>("example_link_color_test", false);

  return (
    <main className="container p-4 flex flex-col gap-4 items-start mx-auto my-6">
      <h1>Next App Router + Growthbook &middot; Client Only &middot; Static</h1>
      <p>
        This is an example of a <strong>static</strong> page built with the{" "}
        <strong>app router</strong>. Page rendered at{" "}
        <FormattedDate isInTest={isInTest} timestamp={timestamp} />.
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
