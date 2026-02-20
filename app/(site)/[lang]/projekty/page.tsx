import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getProjects } from "@/lib/queries";
import { formatCzk } from "@/lib/format";

export async function generateMetadata() {
  return buildMetadata({
    title: "Development projekty",
    description: "Projekty s veřejným cenovým rozpětím pro 2+ jednotky.",
    pathWithoutLang: "/projekty"
  });
}

export default async function ProjectsPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const projects = await getProjects();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Projekty</h1>
      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} className="rounded-xl border border-black/10 bg-white p-4">
            <h2 className="text-xl font-semibold">{p.name}</h2>
            <p className="text-sm">{p.city}</p>
            <p className="text-sm text-black/70">
              Rozpětí: {formatCzk(p.publicPriceRangeMinCzk)} - {formatCzk(p.publicPriceRangeMaxCzk)}
            </p>
            <Link href={`/${lang}/projekt/${p.slug}`} className="text-sm font-medium text-brand">
              Detail projektu
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
