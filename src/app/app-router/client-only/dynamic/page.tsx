import Content from "./content";

export default function AppRouterDynamicOnlyStaticPage() {
  const timestamp = Date.now();

  return <Content timestamp={timestamp} />;
}

export const dynamic = "force-dynamic";
