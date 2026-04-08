"use client";

import Image from "next/image";
import { PackageIcon, TruckIcon, CheckCircleIcon, ClockIcon, XCircleIcon } from "lucide-react";

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface Order {
  _id: string;
  items: OrderItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  stripePaymentIntentId?: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: string;
}

const statusConfig = {
  pending:   { label: "Pending",   icon: ClockIcon,       color: "text-yellow-600 bg-yellow-50 border-yellow-200" },
  paid:      { label: "Paid",      icon: PackageIcon,     color: "text-blue-600 bg-blue-50 border-blue-200" },
  shipped:   { label: "Shipped",   icon: TruckIcon,       color: "text-purple-600 bg-purple-50 border-purple-200" },
  delivered: { label: "Delivered", icon: CheckCircleIcon, color: "text-green-600 bg-green-50 border-green-200" },
  cancelled: { label: "Cancelled", icon: XCircleIcon,     color: "text-red-600 bg-red-50 border-red-200" },
};

export default function OrderCard({ order }: { order: Order }) {
  const { label, icon: Icon, color } = statusConfig[order.status];
  const date = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "long", day: "numeric",
  });

  return (
    <div className="border border-gray-200 rounded-xl p-5 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <p className="text-xs text-gray-400 font-mono">{order.stripePaymentIntentId}</p>
          <p className="text-sm text-gray-500 mt-0.5">{date}</p>
        </div>
        <span className={`flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full border ${color}`}>
          <Icon className="w-3.5 h-3.5" />
          {label}
        </span>
      </div>

      {/* Items */}
      <div className="space-y-3">
        {order.items.map((item, i) => (
          <div key={i} className="flex items-center gap-3">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-gray-100 shrink-0">
              <Image src={item.image} alt={item.name} fill className="object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate">{item.name}</p>
              <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="text-sm font-semibold shrink-0">
              ${(item.price * item.quantity).toFixed(2)}
            </p>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <p className="text-xs text-gray-400">
          Ship to: {order.shippingAddress.city}, {order.shippingAddress.state}
        </p>
        <p className="font-bold text-green-700">Total: ${order.total.toFixed(2)}</p>
      </div>
    </div>
  );
}
