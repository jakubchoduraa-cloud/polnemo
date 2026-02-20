import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getDevelopers } from "@/lib/queries";

export async function generateMetadata() {
  return buildMetadata({
    title: "Developeri",
    description: "Přehled prověřených developerů v Trojmiasto.",
    pathWithoutLang: "/developeri"
  });
}

export default async function DevelopersPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const developers = await getDevelopers();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Developeri</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {developers.map((d) => (
          <div key={d.id} className="rounded-xl border border-black/10 bg-white p-4">
            <h2 className="text-lg font-semibold">{d.name}</h2>
            <p className="text-sm text-black/70">{d.description}</p>
            <Link href={`/${lang}/developer/${d.slug}`} className="text-sm font-medium text-brand">
              Detail developera
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
