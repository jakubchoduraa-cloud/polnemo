import { NextResponse } from "next/server";
import { City } from "@prisma/client";
import { assertAdminApi } from "@/lib/admin-api";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  try {
    await assertAdminApi();
    const formData = await req.formData();
    const city = formData.get("city") as string;
    const min = Number(formData.get("min"));
    const max = Number(formData.get("max"));

    if (!Object.values(City).includes(city as City) || Number.isNaN(min) || Number.isNaN(max)) {
      return NextResponse.json({ ok: false, error: "Invalid payload" }, { status: 400 });
    }

    const row = await prisma.localityStats.upsert({
      where: { city: city as City },
      update: { publicPriceRangeMinCzk: min, publicPriceRangeMaxCzk: max, updatedAt: new Date() },
      create: { city: city as City, publicPriceRangeMinCzk: min, publicPriceRangeMaxCzk: max }
    });

    return NextResponse.json({ ok: true, row });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 401 });
  }
}
