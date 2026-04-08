import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Cart from "@/models/Cart";
import Product from "@/models/Product";

// GET /api/cart — fetch the current user's cart
export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  await connectDB();

  const cart = await Cart.findOne({ user: session.id }).lean();
  if (!cart) return NextResponse.json({ items: [] });

  return NextResponse.json({ items: (cart as any).items });
}

// POST /api/cart — add or replace an item
export async function POST(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  const { productId, name, price, image, quantity, replace } = await req.json();

  if (!productId || !quantity || quantity < 1) {
    return NextResponse.json({ error: "Invalid cart data." }, { status: 400 });
  }

  await connectDB();

  // Validate product exists and has enough stock
  const product = await Product.findById(productId);
  if (!product) return NextResponse.json({ error: "Product not found." }, { status: 404 });
  if (product.stock < quantity) {
    return NextResponse.json({ error: "Not enough stock." }, { status: 400 });
  }

  let cart = await Cart.findOne({ user: session.id });

  if (!cart) {
    cart = await Cart.create({
      user: session.id,
      items: [{ product: productId, name, price, image, quantity }],
    });
    return NextResponse.json({ success: true });
  }

  const existingIndex = cart.items.findIndex(
    (i: any) => i.product.toString() === productId
  );

  if (existingIndex > -1) {
    if (replace) {
      cart.items[existingIndex].quantity = quantity;
    } else {
      cart.items[existingIndex].quantity += quantity;
    }
  } else {
    cart.items.push({ product: productId, name, price, image, quantity });
  }

  await cart.save();
  return NextResponse.json({ success: true });
}

// DELETE /api/cart — remove one item by productId
export async function DELETE(req: NextRequest) {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  const { productId } = await req.json();
  if (!productId) return NextResponse.json({ error: "productId required." }, { status: 400 });

  await connectDB();

  await Cart.updateOne(
    { user: session.id },
    { $pull: { items: { product: productId } } }
  );

  return NextResponse.json({ success: true });
}
