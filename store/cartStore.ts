import { create } from "zustand";

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  loading: boolean;

  fetchCart: () => Promise<void>;
  addItem: (item: Omit<CartItem, "quantity">, quantity: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number) => Promise<void>;
  clearCart: () => void;

  // Derived helpers
  itemCount: () => number;
  total: () => number;
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  loading: false,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const res = await fetch("/api/cart");
      if (!res.ok) return;
      const data = await res.json();
      set({ items: data.items });
    } catch {
      // silently fail — cart just shows empty
    } finally {
      set({ loading: false });
    }
  },

  addItem: async (item, quantity) => {
    // Optimistic update
    set((state) => {
      const existing = state.items.find((i) => i.productId === item.productId);
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.productId === item.productId
              ? { ...i, quantity: i.quantity + quantity }
              : i
          ),
        };
      }
      return { items: [...state.items, { ...item, quantity }] };
    });

    // Persist to DB
    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...item, quantity }),
    });
  },

  removeItem: async (productId) => {
    // Optimistic update
    set((state) => ({
      items: state.items.filter((i) => i.productId !== productId),
    }));

    await fetch("/api/cart", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId }),
    });
  },

  updateQuantity: async (productId, quantity) => {
    if (quantity < 1) {
      get().removeItem(productId);
      return;
    }

    set((state) => ({
      items: state.items.map((i) =>
        i.productId === productId ? { ...i, quantity } : i
      ),
    }));

    await fetch("/api/cart", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ productId, quantity, replace: true }),
    });
  },

  clearCart: () => set({ items: [] }),

  itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),
  total: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
}));
