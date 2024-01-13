import Link from "next/link";
import { Suspense } from "react";
import BucketForm from "@/components/BucketForm";

export default async function Home() {
  return (
    <main className="container p-4 flex flex-col gap-4 items-start">
      <h1>Next.js + Growthbook</h1>
      <p>
        Contains various example pages to demonstrate GrowthBook integration
        with Next.js.
      </p>
      <h2>Experiemnt</h2>
      <p>There's a simple experiment running where the split is 50/50.</p>
      <h3>Control Group</h3>
      <p>
        The control group should see a link and a date in{" "}
        <span className="text-blue-500">blue</span>.
      </p>
      <h3>Variant Group</h3>
      <p>
        The variant group should see a link and a date in{" "}
        <span className="text-purple-500">purple</span>.
      </p>
      <h2>Preferences</h2>
      <p>Select a value below to update which variation you'd like to be in.</p>
      <Suspense fallback={<p>Loading...</p>}>
        <BucketForm />
      </Suspense>
      <h2>Examples:</h2>
      <ul>
        <li>
          <Link href="/pages-router/static">
            Pages Router &middot; Client Only &middot; Static
          </Link>
        </li>
        <li>
          <Link href="/pages-router/dynamic">
            Pages Router &middot; Client Only &middot; Dynamic
          </Link>
        </li>
        <li>
          <Link href="/app-router/client-only/static">
            App Router &middot; Client Only &middot; Static
          </Link>
        </li>
        <li>
          <Link href="/app-router/client-only/dynamic">
            App Router &middot; Client Only &middot; Dynamic
          </Link>
        </li>
        <li>
          <Link href="/app-router/server-only">
            App Router &middot; Server Only &middot; Dynamic
          </Link>
        </li>
      </ul>
    </main>
  );
}
