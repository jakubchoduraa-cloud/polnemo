import { City, PropertyType } from "@prisma/client";

export type DirectoryFilters = {
  city?: City;
  propertyType?: PropertyType;
  bedrooms?: number;
  areaMin?: number;
  areaMax?: number;
  yieldMin?: number;
  topPicksOnly?: boolean;
  sort?: "newest" | "area_desc" | "yield_desc";
};

export function parseDirectoryFilters(searchParams: Record<string, string | string[] | undefined>): DirectoryFilters {
  const get = (k: string) => (Array.isArray(searchParams[k]) ? searchParams[k]?.[0] : searchParams[k]);
  return {
    city: get("city") as City | undefined,
    propertyType: get("property_type") as PropertyType | undefined,
    bedrooms: get("bedrooms") ? Number(get("bedrooms")) : undefined,
    areaMin: get("area_min") ? Number(get("area_min")) : undefined,
    areaMax: get("area_max") ? Number(get("area_max")) : undefined,
    yieldMin: get("yield_min") ? Number(get("yield_min")) : undefined,
    topPicksOnly: get("top_picks") === "1",
    sort: (get("sort") as DirectoryFilters["sort"]) || "newest"
  };
}
