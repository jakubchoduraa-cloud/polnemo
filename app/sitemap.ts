import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";
import { baseUrl, LANGS } from "@/lib/i18n";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const staticPaths = [
    "",
    "/trojmiasto",
    "/projekty",
    "/developeri",
    "/blog",
    "/jak-zacit",
    "/faq",
    "/srovnani-mest",
    "/kontakt",
    "/pro"
  ];

  const properties = await prisma.property.findMany({
    where: { status: "published" },
    select: { slug: true, updatedAt: true }
  });
  const projects = await prisma.project.findMany({ select: { slug: true, updatedAt: true } });
  const developers = await prisma.developer.findMany({ select: { slug: true, updatedAt: true } });
  const blogPosts = await prisma.blogPost.findMany({
    where: { publishedAt: { not: null } },
    select: { slug: true, updatedAt: true, lang: true }
  });

  const urls: MetadataRoute.Sitemap = [];

  LANGS.forEach((lang) => {
    staticPaths.forEach((path) => {
      urls.push({ url: `${baseUrl}/${lang}${path}`, lastModified: now });
    });
  });

  properties.forEach((p) => {
    LANGS.forEach((lang) => {
      urls.push({ url: `${baseUrl}/${lang}/nemovitost/${p.slug}`, lastModified: p.updatedAt });
    });
  });

  projects.forEach((p) => {
    LANGS.forEach((lang) => {
      urls.push({ url: `${baseUrl}/${lang}/projekt/${p.slug}`, lastModified: p.updatedAt });
    });
  });

  developers.forEach((d) => {
    LANGS.forEach((lang) => {
      urls.push({ url: `${baseUrl}/${lang}/developer/${d.slug}`, lastModified: d.updatedAt });
    });
  });

  blogPosts.forEach((b) => {
    urls.push({ url: `${baseUrl}/${b.lang}/blog/${b.slug}`, lastModified: b.updatedAt });
  });

  return urls;
}
