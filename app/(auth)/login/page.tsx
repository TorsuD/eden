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
import { useTheme } from "next-themes";

const LoginPage = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center h-screen">
      <Fade>
        <div className="w-82.5">
          <div className="text-center text-4xl text-green-600 mb-4 font-bold">
            eden<span className="text-black font-black">.</span>
          </div>

          {/* LOGIN FORM */}
          <div>
            <InputGroup className="h-12 border-none shadow-none bg-gray-100">
              <InputGroupInput placeholder="Email" type="email" />
              <InputGroupAddon>
                <MailIcon />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="h-12 border-none shadow-none bg-gray-100 mt-4">
              <InputGroupInput
                placeholder="Password"
                type={clicked ? "text" : "password"}
              />
              <InputGroupAddon>
                <LockIcon />
              </InputGroupAddon>

              <InputGroupAddon
                onClick={handleClick}
                align={"inline-end"}
                className="hover:cursor-pointer"
              >
                {clicked ? <EyeClosedIcon /> : <EyeIcon />}
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

          <Link href={"/home"}>
            <Button className="bg-green-600 h-12 w-full font-bold">
              Login <ArrowRightIcon />
            </Button>
          </Link>

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

          <div className="flex items-center justify-center mt-10">
            <Button
              variant={"outline"}
              className="bg-white text-sm border-gray-300 w-full h-12 flex items-center justify-center"
            >
              <span className="text-sm flex items-center gap-1 font-bold">
                Continue with Google
              </span>{" "}
              <FcGoogle />
            </Button>
          </div>

          <div>
            <p className="text-center mt-6 text-sm text-gray-600">
              Don't have an account?{" "}
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
