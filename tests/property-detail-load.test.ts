import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/queries", () => ({
  getPropertyBySlug: vi.fn(async () => ({ id: "1", slug: "x" }))
}));

import { loadPropertyPage } from "@/lib/page-loaders";

describe("property detail loads", () => {
  it("returns one property", async () => {
    const row = await loadPropertyPage("x");
    expect(row?.slug).toBe("x");
  });
});
