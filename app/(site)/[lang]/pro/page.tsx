import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { requireActiveSubscription } from "@/lib/subscription";
import { getTopPicks } from "@/lib/queries";
import { normalizeLang } from "@/lib/i18n";
import { PropertyCard } from "@/components/property-card";

async function ProContent({ lang }: { lang: string }) {
  await requireActiveSubscription();
  const picks = await getTopPicks(100);
  const current = normalizeLang(lang);

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Full Top picks list</h2>
      <p className="text-sm text-black/70">Odemčeno: hlubší analýzy, concierge priorita, archiv newsletteru Top deals.</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {picks.map((p) => (
          <PropertyCard key={p.id} property={p} lang={current} />
        ))}
      </div>
      <section className="rounded-xl border border-black/10 bg-white p-4">
        <h3 className="font-semibold">Newsletter archive (MVP)</h3>
        <p className="text-sm">Leden 2026: 7 transakcí s nadprůměrným nájemním potenciálem.</p>
      </section>
    </div>
  );
}

export default async function ProPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const current = normalizeLang(lang);
  const session = await getServerSession(authOptions);

  if (!session?.user || session.user.subscriptionStatus !== "ACTIVE") {
    const preview = await getTopPicks(12);
    return (
      <div className="space-y-6">
        <div className="mx-auto max-w-xl space-y-4 rounded-xl border border-black/10 bg-white p-6">
          <h1 className="text-3xl font-bold">PRO členství</h1>
          <p>150 CZK/měsíc. Odemkne plný Top picks list, hlubší obsah a concierge prioritu.</p>
          <form action="/api/stripe/checkout" method="post">
            <button className="rounded bg-brand px-4 py-2 text-white">Pokračovat na platbu</button>
          </form>
        </div>
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold">Top picks preview (12)</h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {preview.map((p) => (
              <PropertyCard key={p.id} property={p} lang={current} />
            ))}
          </div>
        </section>
      </div>
    );
  }

  return <ProContent lang={lang} />;
}
