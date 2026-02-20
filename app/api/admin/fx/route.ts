import { NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-api";
import { fetchAndStoreTodayFxRate } from "@/lib/cnb";

export async function POST() {
  try {
    await assertAdminApi();
    const row = await fetchAndStoreTodayFxRate();
    return NextResponse.json({ ok: true, row });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 401 });
  }
}
