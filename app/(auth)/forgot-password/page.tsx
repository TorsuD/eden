"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { MailIcon, ArrowLeftIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Something went wrong.");
        return;
      }

      setSent(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Fade>
        <div className="w-82.5">
          <div className="text-center text-4xl text-green-600 mb-6 font-bold">
            eden<span className="text-black font-black">.</span>
          </div>

          {sent ? (
            <div className="text-center space-y-4">
              <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto" />
              <h2 className="text-xl font-bold">Check your email</h2>
              <p className="text-gray-500 text-sm leading-relaxed">
                If an account exists for <span className="font-semibold">{email}</span>, we&apos;ve
                sent a password reset link. It expires in 1 hour.
              </p>
              <Link href="/login" className="text-green-600 font-semibold text-sm inline-block mt-2">
                Back to login
              </Link>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-1">Forgot your password?</h2>
              <p className="text-gray-500 text-sm mb-6">
                Enter your email and we&apos;ll send you a reset link.
              </p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <InputGroup className="h-12 border-none shadow-none bg-gray-100">
                <InputGroupInput
                  placeholder="Email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
              </InputGroup>

              <Button
                onClick={handleSubmit}
                disabled={loading}
                className="bg-green-600 h-12 w-full font-bold mt-4"
              >
                {loading ? "Sending..." : "Send reset link"}
              </Button>

              <Link
                href="/login"
                className="flex items-center gap-1 text-sm text-gray-500 mt-5 justify-center hover:text-gray-700"
              >
                <ArrowLeftIcon className="w-3.5 h-3.5" /> Back to login
              </Link>
            </>
          )}
        </div>
      </Fade>
    </div>
  );
}
