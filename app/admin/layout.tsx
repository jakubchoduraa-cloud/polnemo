import Link from "next/link";
import { ReactNode } from "react";
import { requireAdmin } from "@/lib/admin";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await requireAdmin();

  return (
    <div className="container-main py-8">
      <header className="mb-6 flex items-center gap-4 border-b pb-4">
        <h1 className="text-2xl font-bold">Admin</h1>
        <Link href="/admin/properties">Properties</Link>
        <Link href="/admin/projects">Projects</Link>
        <Link href="/admin/developers">Developers</Link>
        <Link href="/admin/blog">Blog</Link>
        <Link href="/admin/locality">Locality</Link>
      </header>
      {children}
    </div>
  );
}
