import { useFeatureValue, useFeatureIsOn } from "@growthbook/growthbook-react";
import type { InferGetStaticPropsType } from "next";
import BackLink from "@/components/BackLink";
import FormattedDate from "@/components/FormattedDate";

export async function getStaticProps() {
  const timestamp = Date.now();

  return {
    props: {
      timestamp,
    },
  };
}

export default function PagesRouterStaticPage({
  timestamp,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const isInTest = useFeatureValue<boolean>("example_link_color_test", false);

  return (
    <main className="container p-4 flex flex-col gap-4 items-start mx-auto my-6">
      <h1>
        Next Pages Router + Growthbook &middot; Client Only &middot; Static
      </h1>
      <p>
        This is an example of a <strong>static</strong> page built with the{" "}
        <strong>pages router</strong>. Page rendered at{" "}
        <FormattedDate isInTest={isInTest} timestamp={timestamp} />.
      </p>
      <BackLink isInTest={isInTest} />
    </main>
  );
}
