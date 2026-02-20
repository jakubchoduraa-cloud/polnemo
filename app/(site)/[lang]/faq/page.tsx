import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "FAQ",
    description: "Nejčastější otázky českých kupců v Polsku.",
    pathWithoutLang: "/faq"
  });
}

export default function FaqPage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">FAQ</h1>
      <p>Jak probíhá koupě? Jaké jsou daně? Co řešit při pronájmu? Co umíme přes concierge?</p>
    </div>
  );
}
