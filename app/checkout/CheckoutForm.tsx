"use client";

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useCartStore } from "@/store/cartStore";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupInput,
} from "@/components/ui/input-group";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2Icon } from "lucide-react";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

// ─── Shipping form + Stripe Payment Element ────────────────────────────────
function PaymentForm({
  shippingAddress,
  onSuccess,
}: {
  shippingAddress: Record<string, string>;
  onSuccess: (piId: string) => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState("");
  const [processing, setProcessing] = useState(false);
  const { clearCart } = useCartStore();

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setError("");
    setProcessing(true);

    const { error: stripeError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${process.env.NEXT_PUBLIC_APP_URL}/orders/confirmation`,
      },
      redirect: "if_required",
    });

    if (stripeError) {
      setError(stripeError.message ?? "Payment failed. Please try again.");
      setProcessing(false);
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      clearCart();
      onSuccess(paymentIntent.id);
    }

    setProcessing(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
          Payment Details
        </h2>
        <div className="border rounded-xl p-4">
          <PaymentElement />
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-3">
          {error}
        </div>
      )}

      <Button
        onClick={handlePay}
        disabled={!stripe || processing}
        className="w-full h-12 bg-green-600 hover:bg-green-700 font-bold"
      >
        {processing ? (
          <><Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> Processing...</>
        ) : (
          "Pay now"
        )}
      </Button>
    </div>
  );
}

// ─── Main checkout form ────────────────────────────────────────────────────
export default function CheckoutForm() {
  const { items, itemCount, total, fetchCart } = useCartStore();
  const router = useRouter();

  const [clientSecret, setClientSecret] = useState("");
  const [loadingIntent, setLoadingIntent] = useState(false);
  const [intentError, setIntentError] = useState("");

  const [shipping, setShipping] = useState({
    name: "",
    line1: "",
    line2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "US",
  });

  const field = (key: keyof typeof shipping) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => setShipping((prev) => ({ ...prev, [key]: e.target.value }));

  // Hydrate cart on mount
  useEffect(() => {
    fetchCart();
  }, []);

  const shippingFilled =
    shipping.name && shipping.line1 && shipping.city && shipping.state && shipping.postalCode;

  const createIntent = async () => {
    if (!shippingFilled) return;
    setLoadingIntent(true);
    setIntentError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ shippingAddress: shipping }),
      });
      const data = await res.json();
      if (!res.ok) { setIntentError(data.error); return; }
      setClientSecret(data.clientSecret);
    } catch {
      setIntentError("Could not initialise payment. Please try again.");
    } finally {
      setLoadingIntent(false);
    }
  };

  if (itemCount() === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500 text-lg">Your cart is empty.</p>
        <Button
          className="mt-6 bg-green-600 hover:bg-green-700"
          onClick={() => router.push("/products")}
        >
          Browse products
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* LEFT — shipping + payment */}
      <div className="space-y-8">
        {/* Shipping address */}
        <div>
          <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
            Shipping Address
          </h2>
          <div className="space-y-3">
            <InputGroup className="h-11 bg-muted border-none shadow-none">
              <InputGroupInput placeholder="Full name" value={shipping.name} onChange={field("name")} />
            </InputGroup>
            <InputGroup className="h-11 bg-muted border-none shadow-none">
              <InputGroupInput placeholder="Address line 1" value={shipping.line1} onChange={field("line1")} />
            </InputGroup>
            <InputGroup className="h-11 bg-muted border-none shadow-none">
              <InputGroupInput placeholder="Address line 2 (optional)" value={shipping.line2} onChange={field("line2")} />
            </InputGroup>
            <div className="grid grid-cols-2 gap-3">
              <InputGroup className="h-11 bg-muted border-none shadow-none">
                <InputGroupInput placeholder="City" value={shipping.city} onChange={field("city")} />
              </InputGroup>
              <InputGroup className="h-11 bg-muted border-none shadow-none">
                <InputGroupInput placeholder="State" value={shipping.state} onChange={field("state")} />
              </InputGroup>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <InputGroup className="h-11 bg-muted border-none shadow-none">
                <InputGroupInput placeholder="Postal code" value={shipping.postalCode} onChange={field("postalCode")} />
              </InputGroup>
              <InputGroup className="h-11 bg-muted border-none shadow-none">
                <InputGroupInput placeholder="Country" value={shipping.country} onChange={field("country")} />
              </InputGroup>
            </div>
          </div>
        </div>

        {/* Payment */}
        {!clientSecret ? (
          <div>
            {intentError && (
              <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-md px-4 py-3 mb-4">
                {intentError}
              </div>
            )}
            <Button
              onClick={createIntent}
              disabled={!shippingFilled || loadingIntent}
              className="w-full h-12 bg-green-600 hover:bg-green-700 font-bold"
            >
              {loadingIntent ? (
                <><Loader2Icon className="w-4 h-4 mr-2 animate-spin" /> Setting up payment...</>
              ) : (
                "Continue to Payment"
              )}
            </Button>
            {!shippingFilled && (
              <p className="text-xs text-gray-400 text-center mt-2">
                Fill in your shipping address to continue.
              </p>
            )}
          </div>
        ) : (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret, appearance: { theme: "stripe" } }}
          >
            <PaymentForm
              shippingAddress={shipping}
              onSuccess={(piId) =>
                router.push(`/orders/confirmation?payment_intent=${piId}`)
              }
            />
          </Elements>
        )}
      </div>

      {/* RIGHT — order summary */}
      <div>
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500 mb-3">
          Order Summary
        </h2>
        <div className="border rounded-xl p-5 space-y-4">
          {items.map((item) => (
            <div key={item.productId} className="flex items-center gap-4">
              <Image
                src={item.image}
                alt={item.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-lg object-contain bg-muted"
              />
              <div className="flex-1">
                <p className="text-sm font-semibold">{item.name}</p>
                <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
              </div>
              <p className="text-sm font-bold">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          ))}

          <div className="border-t pt-4 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-green-600">${total().toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
