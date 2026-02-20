import { prisma } from "@/lib/prisma";

export default async function AdminDashboard() {
  const [properties, projects, leads] = await Promise.all([
    prisma.property.count(),
    prisma.project.count(),
    prisma.lead.count()
  ]);

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <div className="rounded border bg-white p-4">Properties: {properties}</div>
      <div className="rounded border bg-white p-4">Projects: {projects}</div>
      <div className="rounded border bg-white p-4">Leads: {leads}</div>
    </div>
  );
}
