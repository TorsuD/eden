"use client";

import { Button } from "@/components/ui/button";
import { BoxIcon } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const NotFoundPage = () => {
  const router = useRouter();
  return (
    <div className="flex items-center h-screen justify-center">
      <div className="text-center space-y-6 max-w-md mt-30">
        <div>
          <Image
            src={"/hands+plants.jpg"}
            alt="thank- you"
            height={500}
            width={500}
            className="h-70 w-70 object-cover rounded-lg mx-auto mb-6"
          />
          <BoxIcon className="w-10 h-10 text-green-500 mx-auto" />
          <h1 className="title-font text-4xl">
            Oopsy
            <span className="text-green-600 font-black">...</span>
          </h1>
          <p className="text-gray-500 mt-3 leading-relaxed">
            We couldn't find the page you were looking for. It might have been
            removed or is temporarily unavailable.
          </p>
        </div>
        <p className="text-xs text-gray-400 font-mono break-all">
          If you think this shouldn't happen, please report it to us at{" "}
          <a
            href="mailto:support@eden.com"
            className="text-green-600 hover:underline"
          >
            support@eden.com
          </a>
        </p>
        <div className="flex gap-3 justify-center">
          <Button
            onClick={() => router.push("/home")}
            className="bg-green-600 hover:bg-green-700"
          >
            Take me home
          </Button>
          <Button
            onClick={() => router.push("/products")}
            variant="outline"
            className="border-green-600 text-green-600 "
          >
            Explore products
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;
