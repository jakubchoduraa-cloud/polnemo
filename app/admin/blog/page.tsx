import { prisma } from "@/lib/prisma";

export default async function AdminBlogPage() {
  const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: "desc" }, take: 50 });
  return (
    <div className="space-y-3">
      <h2 className="text-xl font-semibold">Blog CRUD (MVP list)</h2>
      {posts.map((p) => (
        <div key={p.id} className="rounded border bg-white p-3 text-sm">
          {p.lang.toUpperCase()} - {p.title}
        </div>
      ))}
    </div>
  );
}
