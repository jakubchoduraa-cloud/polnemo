import { NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

export async function POST() {
  try {
    await assertAdminApi();
    const properties = await prisma.property.findMany({
      where: { status: "published" },
      select: { id: true, sourceUrl: true },
      take: 50
    });

    const results = await Promise.all(
      properties.map(async (p) => {
        try {
          const res = await fetch(p.sourceUrl, { method: "HEAD" });
          if (res.ok) {
            await prisma.property.update({
              where: { id: p.id },
              data: { sourceLastSeenAt: new Date() }
            });
          }
          return { id: p.id, status: res.status, ok: res.ok };
        } catch {
          return { id: p.id, status: 0, ok: false };
        }
      })
    );

    return NextResponse.json({ ok: true, results });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 401 });
  }
}
