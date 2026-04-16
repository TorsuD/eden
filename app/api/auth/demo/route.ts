import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken, COOKIE_NAME, MAX_AGE } from "@/lib/auth";

const DEMO_EMAIL = "guest@tryeden.com";
const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "guest_eden_2024";
const DEMO_NAME = "Guest";

export async function POST() {
  try {
    await connectDB();

    let user = await User.findOne({ email: DEMO_EMAIL });

    if (!user) {
      const passwordHash = await bcrypt.hash(DEMO_PASSWORD, 10);
      user = await User.create({
        name: DEMO_NAME,
        email: DEMO_EMAIL,
        passwordHash,
        role: "customer",
      });
    }

    const token = await signToken({
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    });

    const res = NextResponse.json(
      { user: { id: user._id, name: user.name, email: user.email, role: user.role } },
      { status: 200 }
    );

    res.cookies.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: MAX_AGE,
      path: "/",
    });

    return res;
  } catch (err) {
    console.error("[demo-login]", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}
