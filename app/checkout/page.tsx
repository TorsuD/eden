import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-5xl mx-auto w-full px-4 lg:px-8 pt-28 pb-16">
        <div className="mb-8">
          <h1 className="title-font text-4xl">
            Checkout<span className="text-green-600 font-black">.</span>
          </h1>
          <p className="text-sm text-gray-500 mt-1">
            You&apos;re almost there. Fill in your details below.
          </p>
        </div>
        <CheckoutForm />
      </div>
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
