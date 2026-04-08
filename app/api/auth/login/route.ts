import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { signToken, COOKIE_NAME, MAX_AGE } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    await connectDB();

    const user = await User.findOne({ email });
    if (!user || !user.passwordHash) {
      // Same message for both cases to avoid email enumeration
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const valid = await bcrypt.compare(password, user.passwordHash);
    if (!valid) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
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
    console.error("[login]", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }
}
