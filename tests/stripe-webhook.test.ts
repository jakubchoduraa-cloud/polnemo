import { beforeEach, describe, expect, it, vi } from "vitest";

const constructEvent = vi.fn();

vi.mock("@/lib/stripe", () => ({
  stripe: {
    webhooks: {
      constructEvent
    }
  }
}));

const createEvent = vi.fn(async () => ({}));
const updateUsers = vi.fn(async () => ({}));

vi.mock("@/lib/prisma", () => ({
  prisma: {
    subscriptionEvent: { create: createEvent },
    user: { updateMany: updateUsers }
  }
}));

import { POST } from "@/app/api/stripe/webhook/route";

describe("stripe webhook", () => {
  beforeEach(() => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
    constructEvent.mockReset();
    createEvent.mockClear();
    updateUsers.mockClear();
  });

  it("handles checkout.session.completed", async () => {
    constructEvent.mockReturnValue({
      id: "evt_1",
      type: "checkout.session.completed",
      data: {
        object: {
          customer: "cus_1",
          customer_details: { email: "a@example.com" }
        }
      }
    });

    const req = new Request("http://localhost/api/stripe/webhook", {
      method: "POST",
      body: JSON.stringify({}),
      headers: { "stripe-signature": "sig" }
    });

    const res = await POST(req);
    expect(res.status).toBe(200);
    expect(createEvent).toHaveBeenCalledTimes(1);
    expect(updateUsers).toHaveBeenCalledTimes(1);
  });
});
