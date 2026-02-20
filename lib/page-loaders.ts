import { getPropertyBySlug, getPublishedProperties } from "@/lib/queries";
import type { DirectoryFilters } from "@/components/property-filters";

export async function loadDirectoryPage(filters: DirectoryFilters = {}) {
  return getPublishedProperties(filters);
}

export async function loadPropertyPage(slug: string) {
  return getPropertyBySlug(slug);
}
