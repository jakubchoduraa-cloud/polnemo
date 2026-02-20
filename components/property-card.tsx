import Link from "next/link";
import { Property } from "@prisma/client";
import { Card } from "@/components/ui";
import { Lang, localizedPath } from "@/lib/i18n";

export function PropertyCard({ property, lang }: { property: Property; lang: Lang }) {
  return (
    <Card className="overflow-hidden p-0">
      <img src={property.photos[0]} alt={property.title} className="h-48 w-full object-cover" />
      <div className="space-y-2 p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-lg font-medium">{property.title}</h3>
          {property.isTopPick ? <span className="rounded bg-brand-light px-2 py-1 text-xs">Top pick</span> : null}
        </div>
        <p className="text-sm text-black/70">
          {property.city} {property.neighborhood ? `• ${property.neighborhood}` : ""}
        </p>
        <p className="text-sm text-black/70">
          {property.areaM2} m2 • {property.bedrooms}+kk • yield {property.yieldEstimate ?? "N/A"}%
        </p>
        <Link href={localizedPath(lang, `/nemovitost/${property.slug}`)} className="text-sm font-medium text-brand">
          Detail nemovitosti
        </Link>
      </div>
    </Card>
  );
}
