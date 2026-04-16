"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/store/cartStore";
import { ShoppingCartIcon, CheckIcon } from "lucide-react";

interface ProductActionsProps {
  productId: string;
  name: string;
  price: number;
  stock: number;
  image: string;
}

export default function ProductActions({
  productId,
  name,
  price,
  stock,
  image,
}: ProductActionsProps) {
  const [count, setCount] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stockError, setStockError] = useState("");

  const addItem = useCartStore((s) => s.addItem);
  const cartItems = useCartStore((s) => s.items);

  const cartQty =
    cartItems.find((i) => i.productId === productId)?.quantity ?? 0;
  const remaining = stock - cartQty;

  const increment = () => {
    if (count >= remaining) {
      setStockError(`Only ${remaining} available.`);
      return;
    }
    setStockError("");
    setCount((prev) => prev + 1);
  };

  const decrement = () => {
    setStockError("");
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleAddToCart = async () => {
    if (count > remaining) {
      setStockError(`Only ${remaining} left in stock.`);
      return;
    }
    setStockError("");
    setLoading(true);
    await addItem({ productId, name, price, image }, count);
    setLoading(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="mt-10 space-y-2">
      {stockError && (
        <p className="text-sm text-red-500 font-medium">{stockError}</p>
      )}
      {remaining <= 3 && remaining > 0 && !stockError && (
        <p className="text-sm text-orange-500 font-medium">
          Only {remaining} left!
        </p>
      )}
      <div className="flex items-center flex-col lg:flex-row gap-2">
        <div className="flex gap-4 items-center bg-muted">
          <Button
            variant="ghost"
            className="text-xl py-7 px-5 cursor-pointer"
            onClick={decrement}
          >
            <span className="text-2xl">-</span>
          </Button>
          <p className="text-lg text-center w-10">{count}</p>
          <Button
            variant="ghost"
            className="text-xl py-7 px-5 cursor-pointer"
            onClick={increment}
          >
            <span className="text-2xl">+</span>
          </Button>
        </div>

        <Button
          onClick={handleAddToCart}
          disabled={loading || remaining === 0}
          className={`py-7 cursor-pointer px-10 rounded-none transition-colors ${
            added
              ? "bg-green-700 hover:bg-green-700"
              : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {added ? (
            <>
              <CheckIcon className="w-4 h-4 mr-2" /> Added!
            </>
          ) : (
            <>
              <ShoppingCartIcon className="w-4 h-4 mr-2" />
              {remaining === 0
                ? "Out of Stock"
                : `Add to Cart $${(price * count).toFixed(2)}`}
            </>
          )}
        </Button>
      </div>
    </div>
  );
}
