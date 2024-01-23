import ClientComponent from "./content";
import { getGrowthbook } from "@/api/growthbook";
import BackLink from "@/components/BackLink";
import FormattedDate from "@/components/FormattedDate";

export default async function AppRouterHybridPage() {
  const growthbook = await getGrowthbook();
  const timestamp = Date.now();
  const isInTest = growthbook.isOn("example_link_color_test");
  const className = isInTest ? "border-purple-500/20" : "border-blue-500/20";

  return (
    <main
      className={`${className} border-2 my-6 rounded-lg mx-auto container p-4 flex flex-col gap-4 items-start`}
    >
      <h1>App Router &middot; Hybrid &middot; Dynamic</h1>
      <p>
        This is an example of a <strong>dynamic</strong> page built with the{" "}
        <strong>app router</strong>. Page rendered at{" "}
        <FormattedDate isInTest={isInTest} timestamp={timestamp} />.
      </p>
      <p>
        In this example we're loading Growthbook on both the client and the
        server. So if you're in the variant and you refresh the page you will
        not see the colors flash.
      </p>
      <p>
        The borders define the server component and the shaded section below is
        a client component.
      </p>
      <ClientComponent />
      <BackLink isInTest={isInTest} />
    </main>
  );
}
