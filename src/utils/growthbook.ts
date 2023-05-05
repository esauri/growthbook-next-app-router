import "server-only";
import { GrowthBook } from "@growthbook/growthbook";
import { cache } from "react";
import { AppFeatures } from "../generated-types/app-features";
import getUserId from "./getUserId";

/**
 * Cache the GrowthBook instance for server use by user id
 */
const getCachedServerSideGrowthBook = cache(async (id: string | undefined) => {
  const growthbook = new GrowthBook<AppFeatures>({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    attributes: {
      id,
    },
  });

  await growthbook.loadFeatures({ timeout: 1000 });

  return growthbook;
});

/**
 * Returns growthbook instance for server side use
 *
 * @returns
 */
export default async function getServerSideGrowthBook() {
  const id = getUserId();

  return getCachedServerSideGrowthBook(id);
}
