"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { CheckCircleIcon, CircleCheck, Loader2Icon } from "lucide-react";
import Image from "next/image";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const paymentIntentId = searchParams.get("payment_intent");

  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading",
  );

  useEffect(() => {
    if (!paymentIntentId) {
      setStatus("error");
      return;
    }
    // Give the webhook a moment to process, then confirm
    const t = setTimeout(() => setStatus("success"), 1500);
    return () => clearTimeout(t);
  }, [paymentIntentId]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4">
        {status === "loading" && (
          <div className="text-center space-y-4">
            <Loader2Icon className="w-12 h-12 animate-spin text-green-600 mx-auto" />
            <p className="text-gray-500">Confirming your order...</p>
          </div>
        )}

        {status === "success" && (
          <div className="text-center space-y-6 max-w-md mt-30">
            <div>
              <Image
                src={"/hands+plants.jpg"}
                alt="thank- you"
                height={500}
                width={500}
                className="h-70 w-70 object-cover rounded-lg mx-auto mb-6"
              />
              <CircleCheck className="w-10 h-10 text-green-500 mx-auto" />
              <h1 className="title-font text-4xl">
                Order confirmed
                <span className="text-green-600 font-black">.</span>
              </h1>
              <p className="text-gray-700 mt-3 leading-relaxed">
                Thank you for your purchase! Your plants are on their way.
                We&apos;ll send you an update once your order ships.
              </p>
            </div>
            <p className="text-xs text-gray-400 font-mono break-all">
              Ref: {paymentIntentId}
            </p>
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => router.push("/products")}
                variant="outline"
                className="border-green-600 text-green-600"
              >
                Keep shopping
              </Button>
              <Button
                onClick={() => router.push("/orders")}
                className="bg-green-600 hover:bg-green-700"
              >
                View my orders
              </Button>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="text-center space-y-4">
            <p className="text-red-500 font-semibold">Something went wrong.</p>
            <Button onClick={() => router.push("/checkout")} variant="outline">
              Back to checkout
            </Button>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense>
      <ConfirmationContent />
    </Suspense>
  );
}
