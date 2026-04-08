import { getSession } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import Order from "@/models/Order";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";
import Footer from "@/components/Footer";
import OrderCard from "./OrderCard";

export default async function OrdersPage() {
  const session = await getSession();
  if (!session) redirect("/login");

  await connectDB();

  const orders = await Order.find({ user: session.id })
    .sort({ createdAt: -1 })
    .lean();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 max-w-3xl mx-auto w-full px-4 py-12">
        <h1 className="title-font text-4xl mb-2">
          My Orders<span className="text-green-600 font-black">.</span>
        </h1>
        <p className="text-gray-500 mb-8">Your purchase history</p>

        {orders.length === 0 ? (
          <div className="text-center py-24 text-gray-400">
            <p className="text-lg">No orders yet.</p>
            <a href="/products" className="text-green-600 font-semibold mt-2 inline-block">
              Start shopping →
            </a>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order: any) => (
              <OrderCard key={order._id.toString()} order={JSON.parse(JSON.stringify(order))} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
