import Content from "./content";

export default function AppRouterClientOnlyDynamicPage() {
  const timestamp = Date.now();

  return <Content timestamp={timestamp} />;
}

export const dynamic = "force-dynamic";
