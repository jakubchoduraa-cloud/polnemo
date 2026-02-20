import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getDeveloperBySlug } from "@/lib/queries";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const developer = await getDeveloperBySlug(slug);
  if (!developer) return {};
  return buildMetadata({
    title: developer.name,
    description: developer.description,
    pathWithoutLang: `/developer/${slug}`
  });
}

export default async function DeveloperDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const developer = await getDeveloperBySlug(slug);
  if (!developer) notFound();

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">{developer.name}</h1>
      <p>{developer.description}</p>
      <p className="text-sm text-black/70">Projekty: {developer.projects.length}</p>
    </div>
  );
}
