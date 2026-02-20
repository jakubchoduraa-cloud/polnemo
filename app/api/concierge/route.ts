import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  userId: z.string().optional(),
  leadId: z.string().optional(),
  propertyId: z.string().optional(),
  message: z.string().min(3)
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());
    const row = await prisma.conciergeRequest.create({
      data: {
        userId: body.userId,
        leadId: body.leadId,
        propertyId: body.propertyId,
        message: body.message,
        status: "new"
      }
    });
    return NextResponse.json({ ok: true, id: row.id });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 400 });
  }
}
