"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Label } from "@/components/ui/label";
import {
  ArrowRightIcon,
  EyeClosedIcon,
  EyeIcon,
  LockIcon,
  MailIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import { Fade } from "react-awesome-reveal";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";

const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [terms, setTerms] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { theme } = useTheme();
  const router = useRouter();
  const { setUser } = useAuth();

  const handleRegister = async () => {
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (!terms) {
      setError("You must accept the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
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
      <Fade delay={200}>
        <div className="w-82.5">
          <div className="text-center text-4xl text-green-600 font-bold">
            eden<span className="text-black font-black">.</span>
          </div>

          <div className="font-black text-center mt-4 mb-10 text-gray-600">
            From Eden to you. Create your account
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-3 mb-4">
              {error}
            </div>
          )}

          {/* GOOGLE SIGN UP */}
          <div className="flex items-center justify-center">
            <Button
              variant={"outline"}
              className="bg-white text-sm border-gray-300 w-full h-12 flex items-center justify-center"
            >
              <span className="text-sm flex items-center gap-1 font-bold">
                Sign up with Google
              </span>{" "}
              <FcGoogle />
            </Button>
          </div>

          {/* OR SECTION */}
          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-muted-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className={`${theme === "light" ? "bg-white" : "bg-black"} px-2 text-gray-500`}
              >
                or
              </span>
            </div>
          </div>

          {/* MANUAL SIGN UP FORM */}
          <div>
            <InputGroup className="h-12 border-none shadow-none bg-gray-100">
              <InputGroupInput
                placeholder="Full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <InputGroupAddon>
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="h-12 border-none shadow-none bg-gray-100 mt-4">
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

            <InputGroup className="h-12 border-none shadow-none bg-gray-100 mt-4">
              <InputGroupInput
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRegister()}
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

          {/* ACCEPT TERMS AND CONDITIONS */}
          <div className="flex items-center gap-2 mb-2">
            <Checkbox
              id="terms"
              className="border border-green-600"
              checked={terms}
              onCheckedChange={(v) => setTerms(v === true)}
            />
            <Label
              htmlFor="terms"
              className="flex my-4 gap-1 items-center text-sm justify-start font-bold"
            >
              Accept{" "}
              <Link href={"/terms-and-conditions"}>terms and conditions</Link>
            </Label>
          </div>

          <Button
            onClick={handleRegister}
            disabled={loading}
            className="bg-green-600 h-12 w-full font-bold"
          >
            {loading ? "Creating account..." : "Register"} <ArrowRightIcon />
          </Button>

          <div>
            <p className="text-center mt-6 text-sm text-gray-600">
              Have an account?{" "}
              <Link href="/login" className="text-green-600 font-bold">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </Fade>
    </div>
  );
};

export default RegisterPage;
