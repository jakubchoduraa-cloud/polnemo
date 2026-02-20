import { prisma } from "@/lib/prisma";

export default async function AdminDevelopersPage() {
  const developers = await prisma.developer.findMany({ orderBy: { updatedAt: "desc" } });
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Developers CRUD (MVP list)</h2>
      {developers.map((d) => (
        <div key={d.id} className="rounded border bg-white p-3 text-sm">
          {d.name} - {d.websiteUrl}
        </div>
      ))}
    </div>
  );
}
