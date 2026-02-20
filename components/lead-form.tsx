"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

export function LeadForm({ lang, propertyId }: { lang: string; propertyId?: string }) {
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">("idle");

  async function onSubmit(formData: FormData) {
    setStatus("sending");
    try {
      const payload = {
        name: String(formData.get("name") || ""),
        email: String(formData.get("email") || ""),
        phone: String(formData.get("phone") || ""),
        message: String(formData.get("message") || ""),
        lang,
        source: propertyId ? "property" : "contact",
        propertyId
      };
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error("Lead failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form action={onSubmit} className="space-y-3 rounded-xl border border-black/10 bg-white p-4">
      <h3 className="text-base font-semibold">Chci to koupit bez stresu</h3>
      <input className="w-full rounded border p-2" name="name" placeholder="Jméno" required />
      <input className="w-full rounded border p-2" name="email" placeholder="E-mail" type="email" required />
      <input className="w-full rounded border p-2" name="phone" placeholder="Telefon" />
      <textarea className="w-full rounded border p-2" name="message" placeholder="Co hledáte?" required />
      <Button type="submit" disabled={status === "sending"}>
        Odeslat
      </Button>
      {status === "done" ? <p className="text-sm text-green-700">Děkujeme, ozveme se.</p> : null}
      {status === "error" ? <p className="text-sm text-red-700">Chyba, zkuste to znovu.</p> : null}
    </form>
  );
}
