"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group";
import { LockIcon, EyeIcon, EyeClosedIcon, CheckCircleIcon } from "lucide-react";
import Link from "next/link";
import { Fade } from "react-awesome-reveal";

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) setError("Invalid reset link. Please request a new one.");
  }, [token]);

  const handleSubmit = async () => {
    setError("");
    if (!password || !confirm) {
      setError("Please fill in both fields.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        return;
      }

      setDone(true);
      setTimeout(() => router.push("/login"), 3000);
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
            eden<span className="text-foreground font-black">.</span>
          </div>

          {done ? (
            <div className="text-center space-y-4">
              <CheckCircleIcon className="w-12 h-12 text-green-600 mx-auto" />
              <h2 className="text-xl font-bold">Password updated!</h2>
              <p className="text-gray-500 dark:text-white text-sm">Redirecting you to login...</p>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold mb-1">Set a new password</h2>
              <p className="text-gray-500 dark:text-white text-sm mb-6">Must be at least 8 characters.</p>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-3 mb-4">
                  {error}
                </div>
              )}

              <InputGroup className="h-12 border-none shadow-none bg-muted">
                <InputGroupInput
                  placeholder="New password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
                <InputGroupAddon
                  onClick={() => setShowPassword((p) => !p)}
                  align="inline-end"
                  className="hover:cursor-pointer"
                >
                  {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
                </InputGroupAddon>
              </InputGroup>

              <InputGroup className="h-12 border-none shadow-none bg-muted mt-4">
                <InputGroupInput
                  placeholder="Confirm new password"
                  type={showPassword ? "text" : "password"}
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
                />
                <InputGroupAddon>
                  <LockIcon />
                </InputGroupAddon>
              </InputGroup>

              <Button
                onClick={handleSubmit}
                disabled={loading || !token}
                className="bg-green-600 h-12 w-full font-bold mt-4"
              >
                {loading ? "Updating..." : "Update password"}
              </Button>

              <Link
                href="/login"
                className="flex items-center justify-center text-sm text-gray-500 dark:text-white mt-5 hover:text-gray-700"
              >
                Back to login
              </Link>
            </>
          )}
        </div>
      </Fade>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense>
      <ResetPasswordForm />
    </Suspense>
  );
}
