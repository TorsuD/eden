"use client";

import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Fade } from "react-awesome-reveal";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [guestLoading, setGuestLoading] = useState(false);

  const router = useRouter();
  const { setUser } = useAuth();

  const handleGuestLogin = async () => {
    setGuestLoading(true);
    setError("");
    try {
      const res = await fetch("/api/auth/demo", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }
      setUser(data.user);
      router.push("/home");
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setGuestLoading(false);
    }
  };

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
        return;
      }

      setUser(data.user);
      router.push("/home");
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
          <div className="text-center text-4xl text-green-600 mb-4 font-bold">
            eden<span className="text-foreground font-black">.</span>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* LOGIN FORM */}
          <div>
            <InputGroup className="h-12 border-none shadow-none bg-muted">
              <InputGroupInput
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="h-12 border-none shadow-none bg-muted mt-4">
              <InputGroupInput
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>
              <InputGroupAddon
                onClick={() => setShowPassword((p) => !p)}
                align={"inline-end"}
                className="hover:cursor-pointer"
              >
                {showPassword ? <EyeClosedIcon /> : <EyeIcon />}
              </InputGroupAddon>
            </InputGroup>
          </div>

          {/* FORGOT PASSWORD */}
          <Link
            href={"/forgot-password"}
            className="flex my-4 mb-5 items-center text-sm justify-start font-bold"
          >
            Having trouble signing in?
          </Link>

          <Button
            onClick={handleLogin}
            disabled={loading}
            className="bg-green-600 h-12 w-full font-bold"
          >
            {loading ? "Signing in..." : "Login"} <ArrowRightIcon />
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-muted-foreground">
                or
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-3 mt-10">
            <Button
              variant={"outline"}
              className="text-sm border-border w-full h-12 flex items-center justify-center"
            >
              <span className="text-sm flex items-center gap-1 font-bold">
                Continue with Google
              </span>{" "}
              <FcGoogle />
            </Button>

            <Button
              variant={"outline"}
              onClick={handleGuestLogin}
              disabled={guestLoading}
              className="text-sm border-green-200 text-green-700 w-full h-12 font-bold hover:bg-green-50"
            >
              {guestLoading ? "Signing in..." : "Continue as Guest"}
            </Button>
          </div>

          <div>
            <p className="text-center mt-6 text-sm text-gray-600">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-green-600 font-bold">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default LoginPage;
