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

const RegisterPage = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Fade delay={200}>
        <div className="w-82.5">
          <div className="text-center text-4xl text-green-600 font-bold">
            Eden<span className="text-black font-black">.</span>
          </div>

          <div className="font-black text-center mt-4 mb-10 text-gray-600">
            From Eden to you. Create your account
          </div>

          {/* GOOGLE SIGN UP */}
          <div className="flex items-center justify-center mt-10">
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
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">or</span>
            </div>
          </div>

          {/* MANUAL SIGN UP FORM */}
          <div>
            <InputGroup className="h-12 border-none shadow-none bg-gray-100">
              <InputGroupInput placeholder="Full name" type="text" />
              <InputGroupAddon>
                <UserIcon />
              </InputGroupAddon>
            </InputGroup>

            <InputGroup className="h-12 border-none shadow-none bg-gray-100 mt-4">
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

          {/* ACCEPT TERMS AND CONDITION */}
          <div className="flex items-center gap-2 mb-2">
            <Checkbox id="terms" defaultChecked />
            <Label
              htmlFor="terms"
              className="flex my-4 gap-1 items-center text-sm justify-start font-bold"
            >
              Accept{" "}
              <Link href={"/terms-and-conditions"}> terms and conditions</Link>
            </Label>
          </div>

          <Button className="bg-green-600 h-12 w-full font-bold">
            Register <ArrowRightIcon />
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
