import { notFound } from "next/navigation";
import { buildMetadata } from "@/lib/seo";
import { getBlogPost } from "@/lib/queries";

export async function generateMetadata({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const post = await getBlogPost(lang, slug);
  if (!post) return {};
  return buildMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    pathWithoutLang: `/blog/${slug}`
  });
}

export default async function BlogDetailPage({ params }: { params: Promise<{ lang: string; slug: string }> }) {
  const { lang, slug } = await params;
  const post = await getBlogPost(lang, slug);
  if (!post) notFound();

  return (
    <article className="prose max-w-3xl">
      <h1>{post.title}</h1>
      <pre className="whitespace-pre-wrap font-sans">{post.contentMd}</pre>
    </article>
  );
}
