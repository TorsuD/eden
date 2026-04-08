import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectDB();

    const product = await Product.findById(id).lean();
    if (!product) {
      return NextResponse.json({ error: "Product not found." }, { status: 404 });
    }

    return NextResponse.json({ product });
  } catch (err) {
    console.error("[GET /api/products/:id]", err);
    return NextResponse.json({ error: "Failed to fetch product." }, { status: 500 });
  }
}
