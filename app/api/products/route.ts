import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    const { searchParams } = new URL(req.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const filter: Record<string, unknown> = {};

    if (category && category !== "All products") {
      filter.category = category;
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];
    }

    const products = await Product.find(filter).lean();
    return NextResponse.json({ products });
  } catch (err) {
    console.error("[GET /api/products]", err);
    return NextResponse.json({ error: "Failed to fetch products." }, { status: 500 });
  }
}
