import Content from "./content";

const timestamp = Date.now();

export default function AppRouterClientOnlyStaticPage() {
  return <Content timestamp={timestamp} />;
}
