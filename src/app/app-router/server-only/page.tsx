import { getGrowthbook } from "@/api/growthbook";
import BackLink from "@/components/BackLink";
import FormattedDate from "@/components/FormattedDate";

export default async function AppRouterServerOnlyPageContent() {
  const growthbook = await getGrowthbook();
  const isInTest = growthbook.isOn("example_link_color_test");
  const timestamp = Date.now();

  return (
    <main className="container p-4 flex flex-col gap-4 items-start">
      <h1>Next App Router + Growthbook &middot; Server Only</h1>
      <p>
        This is an example of a <strong>dynamic</strong> page built with{" "}
        <strong>app router</strong>. Page rendered at{" "}
        <FormattedDate isInTest={isInTest} timestamp={timestamp} />.
      </p>
      <p>
        In this scenario, the test runs on the <strong>server</strong>. There is
        no flash of content. The test is <em>not available</em> on the client.
        This page is always dynamic since the server has to access cookies.
      </p>
      <BackLink isInTest={isInTest} />
    </main>
  );
}
