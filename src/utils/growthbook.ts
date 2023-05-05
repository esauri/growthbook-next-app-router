import { GrowthBook } from "@growthbook/growthbook";
import { AppFeatures } from "../generated-types/app-features";
import getUserId from "./getUserId";

async function _getServerSideGrowthBook(id: string | undefined) {
  const growthbook = new GrowthBook<AppFeatures>({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    attributes: {
      id,
    },
  });

  await growthbook.loadFeatures({ timeout: 1000 });

  return growthbook;
}

export default async function getServerSideGrowthBook() {
  const id = getUserId();

  return _getServerSideGrowthBook(id);
}
