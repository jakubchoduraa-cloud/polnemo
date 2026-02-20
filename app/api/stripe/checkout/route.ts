import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { stripe } from "@/lib/stripe";

export async function POST() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.redirect(`${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/cs/pro`);
  }

  if (!stripe || !process.env.STRIPE_PRICE_ID_MONTHLY) {
    return NextResponse.redirect(`${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/cs/pro?stub=1`);
  }

  const checkout = await stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer_email: session.user.email,
    line_items: [{ price: process.env.STRIPE_PRICE_ID_MONTHLY, quantity: 1 }],
    success_url: `${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/cs/pro?success=1`,
    cancel_url: `${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/cs/pro?canceled=1`
  });

  return NextResponse.redirect(checkout.url || `${process.env.PUBLIC_BASE_URL || "http://localhost:3000"}/cs/pro`);
}
