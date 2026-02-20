import { buildMetadata } from "@/lib/seo";
import { getPublishedProperties } from "@/lib/queries";
import { normalizeLang } from "@/lib/i18n";
import { PropertyCard } from "@/components/property-card";
import { parseDirectoryFilters } from "@/components/property-filters";

export async function generateMetadata() {
  return buildMetadata({
    title: "Trojmiasto directory",
    description: "Byty, apartmány, domy a vily na prodej v Gdaňsku, Gdyni a Sopotech.",
    pathWithoutLang: "/trojmiasto"
  });
}

export default async function DirectoryPage({
  params,
  searchParams
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { lang } = await params;
  const current = normalizeLang(lang);
  const filters = parseDirectoryFilters(await searchParams);
  const properties = await getPublishedProperties(filters);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Trojmiasto - nabídka nemovitostí</h1>
      <form className="grid gap-3 rounded-xl border border-black/10 bg-white p-4 md:grid-cols-6">
        <input name="city" placeholder="city" className="rounded border p-2" />
        <input name="property_type" placeholder="property_type" className="rounded border p-2" />
        <input name="bedrooms" placeholder="bedrooms" className="rounded border p-2" />
        <input name="area_min" placeholder="area_min" className="rounded border p-2" />
        <input name="yield_min" placeholder="yield_min" className="rounded border p-2" />
        <button className="rounded bg-brand px-3 py-2 text-white">Filtrovat</button>
      </form>
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2">
          {properties.map((p) => (
            <PropertyCard key={p.id} property={p} lang={current} />
          ))}
        </div>
        <aside className="min-h-[400px] rounded-xl border border-dashed border-black/30 bg-white p-4">
          <h2 className="text-lg font-semibold">Mapa (MVP placeholder)</h2>
          <p className="text-sm text-black/70">Zde bude interaktivní mapa s piny.</p>
        </aside>
      </div>
    </div>
  );
}
