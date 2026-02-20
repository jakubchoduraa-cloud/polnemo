import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getPropertyBySlug } from "@/lib/queries";
import { LeadForm } from "@/components/lead-form";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) return {};
  return buildMetadata({
    title: property.title,
    description: property.descriptionShort,
    pathWithoutLang: `/nemovitost/${slug}`,
    image: property.photos[0]
  });
}

export default async function PropertyDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const property = await getPropertyBySlug(slug);
  if (!property) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: property.title,
    description: property.descriptionShort,
    image: property.photos[0],
    url: `${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/${lang}/nemovitost/${property.slug}`
  };

  return (
    <div className="space-y-6">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <h1 className="text-3xl font-bold">{property.title}</h1>
      <img src={property.photos[0]} alt={property.title} className="h-[380px] w-full rounded-xl object-cover" />
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="space-y-6">
          <section className="rounded-xl border border-black/10 bg-white p-4">
            <h2 className="mb-2 text-xl font-semibold">Přehled</h2>
            <p>{property.descriptionLong}</p>
            <p className="mt-3 text-sm text-black/70">
              Lokalita: {property.city} • {property.areaM2} m2 • yield: {property.yieldEstimate ?? "N/A"}%
            </p>
          </section>
          <section className="rounded-xl border border-black/10 bg-white p-4">
            <h2 className="mb-2 text-xl font-semibold">Lokalita & co dělat</h2>
            <ul className="list-disc space-y-1 pl-6 text-sm">
              <li>Pláž: 12 min</li>
              <li>Coworking: 8 min</li>
              <li>Restaurace: 5 min</li>
            </ul>
            <p className="mt-3 text-sm text-black/70">
              Praha → Gdaňsk: letadlo {property.travelTimePlaneHours ?? 1.2}h, vlak {property.travelTimeTrainHours ?? 8.4}h.
            </p>
          </section>
          <section className="rounded-xl border border-black/10 bg-white p-4">
            <h2 className="mb-2 text-xl font-semibold">Jak začít v Polsku</h2>
            <p className="text-sm">A-Z snippet: právník, notář, due diligence, banka, převod, správce nájmu.</p>
          </section>
          <section className="rounded-xl border border-black/10 bg-white p-4">
            <h2 className="mb-2 text-xl font-semibold">Rizika</h2>
            <pre className="overflow-x-auto text-sm">{JSON.stringify(property.riskFlagsJson, null, 2)}</pre>
          </section>
        </div>
        <div className="space-y-4">
          <LeadForm lang={lang} propertyId={property.id} />
          <div className="rounded-xl border border-black/10 bg-white p-4 text-sm text-black/70">
            Přesná cena nemovitosti není veřejně ani člensky zobrazována.
          </div>
        </div>
      </div>
    </div>
  );
}
