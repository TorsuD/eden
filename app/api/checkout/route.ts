import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import stripe from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorised." }, { status: 401 });
  }

  try {
    const { shippingAddress } = await req.json();

    await connectDB();

    const cart = await Cart.findOne({ user: session.id }).lean() as any;
    if (!cart || cart.items.length === 0) {
      return NextResponse.json({ error: "Your cart is empty." }, { status: 400 });
    }

    // Total in cents for Stripe
    const totalCents = Math.round(
      cart.items.reduce((sum: number, item: any) => sum + item.price * item.quantity, 0) * 100
    );

    const paymentIntent = await stripe.paymentIntents.create({
      amount: totalCents,
      currency: "usd",
      metadata: {
        userId: session.id,
        shippingAddress: JSON.stringify(shippingAddress),
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error("[POST /api/checkout]", err);
    return NextResponse.json({ error: "Failed to create payment intent." }, { status: 500 });
  }
}
