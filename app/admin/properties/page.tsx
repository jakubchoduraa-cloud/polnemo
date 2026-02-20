import { prisma } from "@/lib/prisma";

export default async function AdminPropertiesPage() {
  const properties = await prisma.property.findMany({ orderBy: { updatedAt: "desc" }, take: 50 });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Properties CRUD (MVP list)</h2>
      <form action="/api/admin/import-csv" method="post" className="space-y-2 rounded border bg-white p-4">
        <h3 className="font-medium">CSV Import (properties/projects)</h3>
        <textarea name="csv" className="h-32 w-full rounded border p-2" placeholder="slug,title,..." />
        <button className="rounded bg-brand px-3 py-2 text-white">Import CSV</button>
      </form>
      {properties.map((p) => (
        <div key={p.id} className="rounded border bg-white p-3 text-sm">
          {p.title} - {p.status} - {p.city}
        </div>
      ))}
    </div>
  );
}
