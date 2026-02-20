import { NextResponse } from "next/server";
import { assertAdminApi } from "@/lib/admin-api";

export async function POST(req: Request) {
  try {
    await assertAdminApi();
    const formData = await req.formData();
    const csv = String(formData.get("csv") || "");
    const lines = csv.split("\n").map((l) => l.trim()).filter(Boolean);

    // TODO: Map CSV rows into property/project upserts.
    return NextResponse.json({ ok: true, parsedLines: lines.length, message: "Import stub ready" });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 401 });
  }
}
