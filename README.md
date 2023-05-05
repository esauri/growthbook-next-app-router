# Next App Router + Growthbook Example

This example showcases the ability to use [Growthbook](https://www.growthbook.io/) in a [Next.js](https://nextjs.org/) app that utilizes React Server Components (RSC) with the [app router](https://nextjs.org/docs/app/building-your-application/routing).

## Example

You can see a working example here https://growthbook-next-app-router.vercel.app/.

User should see a blue button link. If the user has the feature enabled, they should see a purple button link instead.

You can enable the feature for yourself by adding a `userId` cookie with the value `123`.

## Setup

For this example you should set up a [Growthbook](https://app.growthbook.io/getstarted) project.

Once you've gone through the process you can create a `example_link_color_test` boolean feature and turn it off. I would recommend creating a **Forced Value** rule for id, say value `123` to turn it on.

Then you can add your `NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY` in your `.env.local` file. If you wish to override the `NEXT_PUBLIC_GROWTHBOOK_API_HOST` you can also do it in that file.

In order to determine if the user is seeing a blue (off) or purple (on) link, we check the `userId` cookie. If the cookie's value is what was entered in the Forced Value, it will be purple. Otherwise it will be blue.

## Problem

Since [React Server Components have no React state](https://nextjs.org/docs/getting-started/react-essentials#context), we can't rely on `<GrowthbookProvider />` as it uses React Context.

This means that we'll need a different way to access feature values for React Server Components.

## How it works

Our approach here is to create a `growthbook` instance on the server that can be consumed by server components. We can also send the `attributes` and `features` of this instance to a client component that wraps `<GrowthbookProvider />`. This way the rest of our client components can utilize hooks such as `useFeature`, `useFeatureIsOn`, and so on.

We start by creating a function that returns the growthbook instance with it's features already loaded. We allow passing an `id` to be able to use experiments in our server components.

### Usage in React Server Components

```ts
// src/utils/growthbook.ts
import { GrowthBook } from "@growthbook/growthbook";
import { AppFeatures } from "@/generated-types/app-features";

const getServerSideGrowthBook = async (id: string | undefined) => {
  const growthbook = new GrowthBook<AppFeatures>({
    apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
    clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
    attributes: {
      id,
    },
  });

  await growthbook.loadFeatures({ timeout: 1000 });

  return growthbook;
};
```

Now we can simply request the growthbook instance in our server component.

```tsx
// src/app/page.tsx
import Link from "next/link";
import getServerSideGrowthBook from "@/utils/growthbook";

export default async function Home() {
  const growthbook = await getServerSideGrowthBook();
  const isInColorTest = growthbook.isOn("example_link_color_test");
  const colorClassName = isInColorTest ? "bg-purple-500" : "bg-blue-500";

  return (
    <main className="container p-4 flex flex-col gap-4 items-start">
      <h1 className="text-2xl font-bold">Next App Router + Growthbook</h1>
      <p>
        This is a <strong>server</strong> component.
      </p>
      <Link
        className={`${colorClassName} text-white px-4 py-2 rounded-2xl`}
        href="/client"
      >
        Go to client component page
      </Link>
    </main>
  );
}
```

### Usage in React Client Components

However, we'll still want to use the [feature hooks](https://docs.growthbook.io/lib/react#feature-hooks) in our client components. To do this we must wrap our application with `<GrowthbookProvider />`.

First, we'll create a client component that wraps Growthbook's `<GrowthbookProvider />`.

```tsx
// src/components/GrowthbookProvider/GrowthbookClientProvider.tsx
"use client";
import {
  FeatureDefinition,
  GrowthBook,
  GrowthBookProvider,
} from "@growthbook/growthbook-react";
import React, { ReactNode, useEffect, useState } from "react";
import { AppFeatures } from "@/generated-types/app-features";

type Props = {
  children: ReactNode;
};

export default function GrowthbookClientProvider({ children }: Props) {
  const [growthbook] = useState(
    () =>
      new GrowthBook<AppFeatures>({
        apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
        clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
        enableDevMode: true,
      })
  );

  useEffect(() => {
    growthbook.loadFeatures({ autoRefresh: true });
  }, [growthbook]);

  return (
    <GrowthBookProvider growthbook={growthbook}>{children}</GrowthBookProvider>
  );
}
```

An issue here is that these client components won't have access to our Growthbook features until after the page has loaded, when our client code runs, not during SSR.

We can fix that by also sending `features` as a prop. We can also send `attributes` from our server instance.

```tsx
// src/components/GrowthbookProvider/GrowthbookClientProvider.tsx
// ...

type Props = {
  attributes: Record<string, any>;
  children: ReactNode;
  features: Record<string, FeatureDefinition<any>>;
};

export default function GrowthbookClientProvider({
  attributes,
  children,
  features,
}: Props) {
  const [growthbook] = useState(
    () =>
      new GrowthBook<AppFeatures>({
        apiHost: process.env.NEXT_PUBLIC_GROWTHBOOK_API_HOST,
        attributes,
        clientKey: process.env.NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY,
        features,
        enableDevMode: true,
      })
  );

  // ...
}
```

Then we can create an async component that requests our Growthbook features and passes serializable data to our client component.

```tsx
// src/components/GrowthbookProvider/GrowthbookProvider.tsx
import React, { ReactNode } from "react";
import getServerSideGrowthBook from "@/utils/growthbook";
import GrowthbookClientProvider from "./GrowthbookClientProvider";

type Props = {
  children: ReactNode;
};

export default async function GrowthbookProvider({ children }: Props) {
  const growthbook = await getServerSideGrowthBook();
  const attributes = growthbook.getAttributes();
  const features = growthbook.getFeatures();

  return (
    <GrowthbookClientProvider attributes={attributes} features={features}>
      {children}
    </GrowthbookClientProvider>
  );
}
```

Lastly, we can add that component to our Root Layout so it wraps our routes. Note, for the time being we need to add a `ts-expect-error` above our [async component](https://nextjs.org/docs/app/building-your-application/configuring/typescript#async-server-component-typescript-error).

```tsx
// src / app / layout.tsx;
// ...
import GrowthbookProvider from "@/components/GrowthbookProvider";

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body>
        {/* @ts-expect-error Async Server Component */}
        <GrowthbookProvider>{children}</GrowthbookProvider>
      </body>
    </html>
  );
}
```

Now we can use our hooks in client components

```tsx
"use client";
import { useFeatureIsOn } from "@growthbook/growthbook-react";
import Link from "next/link";
import { AppFeatures } from "@/generated-types/app-features";

export default function Client() {
  const isInColorTest = useFeatureIsOn<AppFeatures>("example_link_color_test");
  const colorClassName = isInColorTest ? "bg-purple-500" : "bg-blue-500";

  return (
    <main className="container p-4 flex flex-col gap-4 items-start">
      <h1 className="text-2xl font-bold">Next App Router + Growthbook</h1>
      <p>
        This is a <strong>client</strong> component.
      </p>
      <Link
        className={`${colorClassName} text-white px-4 py-2 rounded-2xl`}
        href="/"
      >
        Go to server component page
      </Link>
    </main>
  );
}
```

### Caching

One last thing, since there could be many React Server Components using our growthbook server instance, we can utilize React Cache so we don't load features everytime it's used. We can also ensure it is only used on the server by using the `server-only` package.

```ts
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
```
