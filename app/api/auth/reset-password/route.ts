import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { token, password } = await req.json();

  if (!token || !password) {
    return NextResponse.json({ error: "Token and password are required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  await connectDB();

  const user = await User.findOne({
    resetToken: token,
    resetTokenExpiry: { $gt: new Date() },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired reset link." }, { status: 400 });
  }

  user.passwordHash = await bcrypt.hash(password, 12);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;
  await user.save();

  return NextResponse.json({ success: true });
}
