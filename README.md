# Next.js + Growthbook Example

These examples showcases the ability to use [Growthbook](https://www.growthbook.io/) in a [Next.js](https://nextjs.org/) app that utilizes the [Pages Router](https://nextjs.org/docs/pages/building-your-application) and the [App Router](https://nextjs.org/docs/app/building-your-application) with React Server Components.

## Example

You can see a working example here https://growthbook-next-app-router.vercel.app/.

There's an experiment running that changes the accent color from blue to purple.

You can force the feature for yourself by setting your `deviceId` cookie to `off` or `on`. Otherwise the split is 50/50.

## Setup

For this example you should set up a [Growthbook](https://app.growthbook.io/getstarted) project.

Once you've gone through the process you can create a `example_link_color_test` boolean feature and turn it off. I would recommend creating a **Forced Value** rule for `deviceId`, say value `on` to turn it on and `off` to turn it off. Then add a split value of 50/50 for randomization.

Then you can add your `NEXT_PUBLIC_GROWTHBOOK_CLIENT_KEY` in your `.env.local` file. If you wish to override the `NEXT_PUBLIC_GROWTHBOOK_API_HOST` you can also do it in that file.

In order to determine if the user is seeing a blue (off) or purple (on) link, we check the `deviceId` cookie. If the cookie's value is what was entered in the Forced Value, it will be purple. Otherwise it will be blue.

## Problem

Growthbook provides a `<GrowthbookProvider />` component built on top of React Context which allows us to access features using various hooks such as `useFeatureIsOn`, `useFeatureValue` etc.

Since [Server Components](https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers) do not support React Context, we'll need a different way to access features and experiments when using the App Router.

## Solutions

### Pages Router

#### Client only

For the pages router we're loading our features on the client-side in `src/pages/_app.tsx` and wrapping our router in `<GrowthBookProvider />`.

See https://growthbook-next-app-router.vercel.app/pages-router/static

### App Router

#### Client only

For the client only version of the app router, we take a similar approach to what we did in the **pages router**, but instead we add `<GrowthBookProvider />` to `src/app/app-router/client-only/layout.tsx`.

See https://growthbook-next-app-router.vercel.app/app-router/client-only/static

#### Server only

For the server only version of the app router, we load our growthbook features on the server using the **node.js** version of growthbook (`@growthbook/growthbook`), and we fetch that data in our server component.

See https://growthbook-next-app-router.vercel.app/app-router/server-only
