import { Prisma, PropertyStatus } from "@prisma/client";
import { prisma } from "@/lib/prisma";
import type { DirectoryFilters } from "@/components/property-filters";

export async function getPublishedProperties(filters: DirectoryFilters = {}, limit?: number) {
  const where: Prisma.PropertyWhereInput = {
    status: PropertyStatus.published,
    ...(filters.city ? { city: filters.city } : {}),
    ...(filters.propertyType ? { propertyType: filters.propertyType } : {}),
    ...(filters.bedrooms ? { bedrooms: { gte: filters.bedrooms } } : {}),
    ...(filters.areaMin || filters.areaMax
      ? {
          areaM2: {
            ...(filters.areaMin ? { gte: filters.areaMin } : {}),
            ...(filters.areaMax ? { lte: filters.areaMax } : {})
          }
        }
      : {}),
    ...(filters.yieldMin ? { yieldEstimate: { gte: filters.yieldMin } } : {}),
    ...(filters.topPicksOnly ? { isTopPick: true } : {})
  };

  const orderBy: Prisma.PropertyOrderByWithRelationInput =
    filters.sort === "area_desc"
      ? { areaM2: "desc" }
      : filters.sort === "yield_desc"
        ? { yieldEstimate: "desc" }
        : { publishedAt: "desc" };

  return prisma.property.findMany({ where, orderBy, take: limit });
}

export async function getPropertyBySlug(slug: string) {
  return prisma.property.findFirst({
    where: { slug, status: "published" },
    include: { project: true, developer: true }
  });
}

export async function getTopPicks(limit = 12) {
  return prisma.property.findMany({
    where: { status: "published", isTopPick: true },
    orderBy: { publishedAt: "desc" },
    take: limit
  });
}

export async function getLocalityRanges() {
  return prisma.localityStats.findMany({ orderBy: { city: "asc" } });
}

export async function getProjects() {
  return prisma.project.findMany({ include: { developer: true }, orderBy: { updatedAt: "desc" } });
}

export async function getProjectBySlug(slug: string) {
  return prisma.project.findUnique({ where: { slug }, include: { developer: true, properties: true } });
}

export async function getDevelopers() {
  return prisma.developer.findMany({ include: { projects: true }, orderBy: { name: "asc" } });
}

export async function getDeveloperBySlug(slug: string) {
  return prisma.developer.findUnique({ where: { slug }, include: { projects: true, properties: true } });
}

export async function getBlogPosts(lang: string) {
  return prisma.blogPost.findMany({ where: { lang, publishedAt: { not: null } }, orderBy: { publishedAt: "desc" } });
}

export async function getBlogPost(lang: string, slug: string) {
  return prisma.blogPost.findFirst({ where: { lang, slug, publishedAt: { not: null } } });
}
