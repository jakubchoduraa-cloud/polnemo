import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { mailProvider } from "@/lib/mailer";

const schema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string().min(3),
  lang: z.string().default("cs"),
  source: z.string().default("contact"),
  propertyId: z.string().optional()
});

export async function POST(req: Request) {
  try {
    const body = schema.parse(await req.json());

    const lead = await prisma.lead.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        lang: body.lang,
        source: body.source
      }
    });

    const concierge = await prisma.conciergeRequest.create({
      data: {
        leadId: lead.id,
        propertyId: body.propertyId,
        message: body.message,
        status: "new"
      }
    });

    await mailProvider.send({
      to: body.email,
      subject: "Potvrzení kontaktu - NEMOVITOSTI V POLSKU",
      text: [
        `Dobrý den ${body.name},`,
        "děkujeme za kontakt. Ozveme se vám telefonicky.",
        "",
        "5 klíčových bodů nákupu v Polsku:",
        "1) Ověření právního stavu a břemen",
        "2) Kontrola daňových dopadů a poplatků",
        "3) Nastavení bezpečného převodu prostředků",
        "4) Due diligence SVJ/administrativy budovy",
        "5) Strategie pronájmu a správy po akvizici"
      ].join("\n")
    });

    return NextResponse.json({ ok: true, leadId: lead.id, conciergeId: concierge.id });
  } catch (error) {
    return NextResponse.json({ ok: false, error: (error as Error).message }, { status: 400 });
  }
}
