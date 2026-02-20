import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getProjectBySlug } from "@/lib/queries";
import { formatCzk } from "@/lib/format";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return buildMetadata({
    title: project.name,
    description: project.description,
    pathWithoutLang: `/projekt/${slug}`
  });
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{project.name}</h1>
      <p>{project.description}</p>
      <p>
        Veřejné cenové rozpětí: {formatCzk(project.publicPriceRangeMinCzk)} - {formatCzk(project.publicPriceRangeMaxCzk)}
      </p>
      <p className="text-sm text-black/70">Jednotky celkem: {project.unitsTotal}, k dispozici: {project.unitsForSale}</p>
    </div>
  );
}
