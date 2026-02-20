import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  return buildMetadata({
    title: "Jak začít v Polsku",
    description: "A-Z průvodce nákupem nemovitosti v Polsku.",
    pathWithoutLang: "/jak-zacit"
  });
}

export default function GuidePage() {
  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Jak začít v Polsku</h1>
      <p>A-Z: cíle, financování, právní due diligence, daně, podpis u notáře, správa nájmu.</p>
    </div>
  );
}
