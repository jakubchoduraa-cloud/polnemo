import { describe, expect, it, vi } from "vitest";

vi.mock("@/lib/queries", () => ({
  getPublishedProperties: vi.fn(async () => [{ id: "1", title: "A" }])
}));

import { loadDirectoryPage } from "@/lib/page-loaders";

describe("directory loads", () => {
  it("returns property list", async () => {
    const rows = await loadDirectoryPage({});
    expect(rows.length).toBeGreaterThan(0);
  });
});
