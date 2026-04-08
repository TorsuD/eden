import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { Resend } from "resend";
import crypto from "crypto";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email is required." }, { status: 400 });

  await connectDB();

  const user = await User.findOne({ email: email.toLowerCase().trim() });

  // Always return success to prevent email enumeration
  if (!user) return NextResponse.json({ success: true });

  const token = crypto.randomBytes(32).toString("hex");
  const expiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  user.resetToken = token;
  user.resetTokenExpiry = expiry;
  await user.save();

  const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;

  await resend.emails.send({
    from: "Eden <onboarding@resend.dev>",
    to: user.email,
    subject: "Reset your Eden password",
    html: `
      <div style="font-family: sans-serif; max-width: 480px; margin: 0 auto;">
        <h2 style="color: #16a34a;">Reset your password</h2>
        <p>Hi ${user.name},</p>
        <p>We received a request to reset your password. Click the button below — this link expires in 1 hour.</p>
        <a href="${resetUrl}" style="display:inline-block;background:#16a34a;color:white;padding:12px 24px;border-radius:6px;text-decoration:none;font-weight:bold;margin:16px 0;">
          Reset Password
        </a>
        <p style="color:#6b7280;font-size:14px;">If you didn't request this, you can safely ignore this email.</p>
      </div>
    `,
  });

  return NextResponse.json({ success: true });
}
