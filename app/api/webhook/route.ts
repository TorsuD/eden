import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Order from "@/models/Order";
import Product from "@/models/Product";
import Stripe from "stripe";

// Must use raw body for Stripe signature verification
export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    return NextResponse.json({ error: "Missing stripe-signature header." }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err: any) {
    console.error("[webhook] Signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const pi = event.data.object as Stripe.PaymentIntent;
    const userId = pi.metadata.userId;
    const shippingAddress = JSON.parse(pi.metadata.shippingAddress || "{}");

    await connectDB();

    const cart = await Cart.findOne({ user: userId }).lean() as any;
    if (!cart || cart.items.length === 0) {
      // Cart was already cleared or order already created — idempotency guard
      return NextResponse.json({ received: true });
    }

    // Build order items from cart snapshots
    const orderItems = cart.items.map((item: any) => ({
      product: item.product,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const total = orderItems.reduce(
      (sum: number, i: any) => sum + i.price * i.quantity,
      0
    );

    // Create the order
    await Order.create({
      user: userId,
      items: orderItems,
      total,
      status: "paid",
      stripePaymentIntentId: pi.id,
      shippingAddress,
    });

    // Decrement stock for each item
    for (const item of cart.items) {
      await Product.findByIdAndUpdate(item.product, {
        $inc: { stock: -item.quantity },
      });
    }

    // Clear the cart
    await Cart.deleteOne({ user: userId });
  }

  return NextResponse.json({ received: true });
}
