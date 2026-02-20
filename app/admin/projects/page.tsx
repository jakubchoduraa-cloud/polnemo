import { prisma } from "@/lib/prisma";
import { formatCzk } from "@/lib/format";

export default async function AdminProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { updatedAt: "desc" }, take: 50 });
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Projects CRUD (MVP list)</h2>
      {projects.map((p) => (
        <div key={p.id} className="rounded border bg-white p-3 text-sm">
          {p.name} - {formatCzk(p.publicPriceRangeMinCzk)} - {formatCzk(p.publicPriceRangeMaxCzk)}
        </div>
      ))}
    </div>
  );
}
