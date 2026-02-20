import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getLocalityRanges, getTopPicks } from "@/lib/queries";
import { formatCzk } from "@/lib/format";
import { normalizeLang, localizedPath } from "@/lib/i18n";
import { PropertyCard } from "@/components/property-card";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return buildMetadata({
    title: "NEMOVITOSTI V POLSKU | Investice v Trojmiasto",
    description: "Kurátorovaný directory pro české kupce v Gdaňsku, Gdyni a Sopotech.",
    pathWithoutLang: ""
  });
}

export default async function HomePage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const current = normalizeLang(lang);
  const [ranges, topPicks] = await Promise.all([getLocalityRanges(), getTopPicks(6)]);

  return (
    <div className="space-y-10">
      <section className="rounded-2xl bg-gradient-to-br from-brand-light to-sand p-8">
        <h1 className="text-3xl font-bold">Investujte v Trojmiasto bez chaosu</h1>
        <p className="mt-3 max-w-3xl text-black/75">
          Ručně kurátorovaný výběr bytů, apartmánů a domů na prodej. Bez zveřejnění přesných cen nemovitostí, s důrazem na výnos, lokalitu a reálná rizika.
        </p>
        <div className="mt-6 flex gap-3">
          <Link href={localizedPath(current, "/trojmiasto")} className="rounded bg-brand px-4 py-2 text-white">
            Projít nabídku
          </Link>
          <Link href={localizedPath(current, "/pro")} className="rounded border border-black/20 bg-white px-4 py-2">
            Odemknout PRO
          </Link>
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Top picks (preview)</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {topPicks.map((p) => (
            <PropertyCard key={p.id} property={p} lang={current} />
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-4 text-2xl font-semibold">Veřejné cenové rozpětí dle města</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {ranges.map((r) => (
            <div key={r.id} className="rounded-xl border border-black/10 bg-white p-4">
              <h3 className="text-lg font-medium">{r.city}</h3>
              <p className="text-sm text-black/70">
                {formatCzk(r.publicPriceRangeMinCzk)} - {formatCzk(r.publicPriceRangeMaxCzk)}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {["1) Výběr nemovitosti", "2) Právní prověrka", "3) Concierge podpora"].map((item) => (
          <div key={item} className="rounded-xl border border-black/10 bg-white p-4 text-sm">
            {item}
          </div>
        ))}
      </section>
    </div>
  );
}
