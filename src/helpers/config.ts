import { z } from "zod";

const env = {
  GROWTHBOOK_API_HOST: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
  GROWTHBOOK_CLIENT_KEY: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
  GROWTHBOOK_DEV_MODE: process.env.NEXT_PUBLIC_GROWTHBOOK_DEV_MODE,
};

const ConfigSchema = z.object({
  GROWTHBOOK_API_HOST: z.string().url(),
  GROWTHBOOK_CLIENT_KEY: z.string(),
  GROWTHBOOK_DEV_MODE: z.coerce.boolean().default(false),
});

const parsedEnv = ConfigSchema.safeParse(env);

if (!parsedEnv.success) {
  console.error(
    "❌ Invalid environment variables:",
    parsedEnv.error.flatten().fieldErrors
  );

  throw new Error("Invalid environment variables");
}

const config = parsedEnv.data;

export { config };
