import Link from "next/link";
import { buildMetadata } from "@/lib/seo";
import { getBlogPosts } from "@/lib/queries";
import { normalizeLang } from "@/lib/i18n";

export async function generateMetadata() {
  return buildMetadata({
    title: "Blog",
    description: "Praktický obsah pro nákup nemovitostí v Polsku.",
    pathWithoutLang: "/blog"
  });
}

export default async function BlogPage({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  const current = normalizeLang(lang);
  const posts = await getBlogPosts(current);

  return (
    <div className="space-y-4">
      <h1 className="text-3xl font-bold">Blog</h1>
      {posts.map((p) => (
        <article key={p.id} className="rounded-xl border border-black/10 bg-white p-4">
          <h2 className="text-xl font-semibold">{p.title}</h2>
          <p className="text-sm text-black/70">{p.excerpt}</p>
          <Link href={`/${current}/blog/${p.slug}`} className="text-sm font-medium text-brand">
            Číst dál
          </Link>
        </article>
      ))}
    </div>
  );
}
