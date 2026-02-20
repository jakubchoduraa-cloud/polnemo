import { NextResponse } from "next/server";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  const body = await req.text();

  if (!stripe || !signature || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ ok: false, error: "Stripe not configured" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return NextResponse.json({ ok: false, error: (err as Error).message }, { status: 400 });
  }

  await prisma.subscriptionEvent.create({
    data: {
      stripeEventId: event.id,
      type: event.type,
      payloadJson: JSON.parse(JSON.stringify(event))
    }
  });

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const email = session.customer_details?.email;
    const customerId = typeof session.customer === "string" ? session.customer : undefined;
    if (email) {
      await prisma.user.updateMany({
        where: { email },
        data: {
          stripeCustomerId: customerId,
          subscriptionStatus: "ACTIVE"
        }
      });
    }
  }

  if (event.type === "customer.subscription.deleted") {
    const subscription = event.data.object as Stripe.Subscription;
    const customerId = typeof subscription.customer === "string" ? subscription.customer : undefined;
    if (customerId) {
      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: { subscriptionStatus: "CANCELED" }
      });
    }
  }

  return NextResponse.json({ received: true });
}
