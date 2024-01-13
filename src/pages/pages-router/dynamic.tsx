import { useFeatureValue } from "@growthbook/growthbook-react";
import type { InferGetServerSidePropsType } from "next";
import BackLink from "@/components/BackLink";
import FormattedDate from "@/components/FormattedDate";

export async function getServerSideProps() {
  const timestamp = Date.now();

  return {
    props: {
      timestamp,
    },
  };
}

export default function PagesRouterDynamicPage({
  timestamp,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const isInTest = useFeatureValue<boolean>("example_link_color_test", false);

  return (
    <main className="container p-4 flex flex-col gap-4 items-start">
      <h1>Next Pages Router + Growthbook</h1>
      <p>
        This is an example of a dynamic page built with pages router. Page
        rendered at <FormattedDate isInTest={isInTest} timestamp={timestamp} />.
      </p>
      <BackLink isInTest={isInTest} />
    </main>
  );
}