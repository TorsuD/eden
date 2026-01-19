import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { MailIcon } from "lucide-react";
import Link from "next/link";

const ForgotPassword = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div>
        <div className="text-center text-4xl text-green-600 font-bold">
          Eden<span className="text-black font-black">.</span>
        </div>

        <p className="mt-2 text-center">
          Enter your email to reset you password
        </p>

        <div>
          <InputGroup className="h-12 border-none shadow-none bg-gray-100 my-5">
            <InputGroupInput type="text" placeholder="Email" />
            <InputGroupAddon>
              <MailIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>

        <Button className="bg-green-600 h-12 w-full font-bold">
          Reset Password
        </Button>

        <div className="mt-10 text-center">
          <Link
            href="/login"
            className="text-sm text-green-700 underline text-center mt-4 gap-3"
          >
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
