import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/prisma", () => ({
  prisma: {
    lead: { create: vi.fn(async () => ({ id: "lead_1" })) },
    conciergeRequest: { create: vi.fn(async () => ({ id: "concierge_1" })) }
  }
}));

vi.mock("@/lib/mailer", () => ({
  mailProvider: { send: vi.fn(async () => undefined) }
}));

import { POST } from "@/app/api/leads/route";

describe("lead submission endpoint", () => {
  it("creates lead and concierge request", async () => {
    const req = new Request("http://localhost/api/leads", {
      method: "POST",
      body: JSON.stringify({
        name: "Jan",
        email: "jan@example.com",
        message: "Mam zajem",
        lang: "cs",
        source: "property"
      }),
      headers: { "Content-Type": "application/json" }
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    const json = await res.json();
    expect(json.ok).toBe(true);
  });
});
