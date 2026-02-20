import { prisma } from "@/lib/prisma";
import { formatCzk } from "@/lib/format";

export default async function AdminLocalityPage() {
  const rows = await prisma.localityStats.findMany({ orderBy: { city: "asc" } });

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Locality ranges</h2>
      <form action="/api/admin/fx" method="post" className="rounded border bg-white p-4">
        <button className="rounded bg-brand px-3 py-2 text-white">Fetch FX rate today (CNB)</button>
      </form>
      <form action="/api/admin/locality" method="post" className="space-y-3 rounded border bg-white p-4">
        <p className="text-sm text-black/70">Simple update form: city,min,max</p>
        <input name="city" className="rounded border p-2" placeholder="Gdansk" />
        <input name="min" className="rounded border p-2" placeholder="3200000" />
        <input name="max" className="rounded border p-2" placeholder="7300000" />
        <button className="rounded bg-brand px-3 py-2 text-white">Update range</button>
      </form>
      {rows.map((r) => (
        <div key={r.id} className="rounded border bg-white p-3 text-sm">
          {r.city}: {formatCzk(r.publicPriceRangeMinCzk)} - {formatCzk(r.publicPriceRangeMaxCzk)}
        </div>
      ))}
    </div>
  );
}
