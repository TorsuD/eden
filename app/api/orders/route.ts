import { NextResponse } from "next/server";
import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";

export async function GET() {
  const session = await getSession();
  if (!session) return NextResponse.json({ error: "Unauthorised." }, { status: 401 });

  await connectDB();

  const orders = await Order.find({ user: session.id })
    .sort({ createdAt: -1 })
    .lean();

  return NextResponse.json({ orders });
}
