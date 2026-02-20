import type { Metadata } from "next";
import { withAlternates } from "@/lib/i18n";

export function buildMetadata(args: {
  title: string;
  description: string;
  pathWithoutLang: string;
  image?: string;
}): Metadata {
  const alternates = withAlternates(args.pathWithoutLang);
  return {
    title: args.title,
    description: args.description,
    alternates,
    openGraph: {
      title: args.title,
      description: args.description,
      url: alternates.canonical,
      images: args.image ? [{ url: args.image }] : undefined
    },
    twitter: {
      card: "summary_large_image",
      title: args.title,
      description: args.description,
      images: args.image ? [args.image] : undefined
    }
  };
}
