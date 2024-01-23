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
      <h1>
        Next Pages Router + Growthbook &middot; Client Only &middot; Dynamic
      </h1>
      <p>
        This is an example of a <strong>dynamic</strong> page built with the{" "}
        <strong>pages router</strong>. Page rendered at{" "}
        <FormattedDate isInTest={isInTest} timestamp={timestamp} />.
      </p>
      <BackLink isInTest={isInTest} />
    </main>
  );
}
