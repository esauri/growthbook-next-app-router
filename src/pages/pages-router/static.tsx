import { useFeatureValue } from "@growthbook/growthbook-react";
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
    <main className="container p-4 flex flex-col gap-4 items-start">
      <h1>Next Pages Router + Growthbook</h1>
      <p>
        This is an example of a static page built with pages router. Page
        rendered at <FormattedDate isInTest={isInTest} timestamp={timestamp} />.
      </p>
      <BackLink isInTest={isInTest} />
    </main>
  );
}