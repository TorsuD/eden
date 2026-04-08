"use client";

import { useState, useMemo } from "react";
import ProductItem from "@/components/ProductItem";
import Category from "@/components/ui/product-category";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { SearchIcon } from "lucide-react";

interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category: string;
}

const CATEGORIES = [
  "All products",
  "Succulent Plants",
  "Indoor Plants",
  "Outdoor Plants",
  "Flowers",
];

export default function ProductsGrid({ products }: { products: Product[] }) {
  const [activeCategory, setActiveCategory] = useState("All products");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "All products" || p.category === activeCategory;
      const matchesSearch =
        search === "" ||
        p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <>
      {/* SEARCH + TITLE */}
      <div className="mt-20 flex items-center justify-between">
        <div>
          <div className="title-font text-5xl">
            Products<span className="text-green-600 font-black">.</span>
          </div>
          <p className="text-sm text-gray-600 font-thin mt-2">
            Explore our wonderful catalog of plants and flowers.
          </p>
        </div>
        <div>
          <InputGroup className="h-10 border-none w-90 shadow-sm bg-gray-100">
            <InputGroupInput
              type="text"
              placeholder="Search product"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </div>
      </div>

      {/* CATEGORY TABS */}
      <div className="flex items-center gap-3 mt-10 flex-wrap">
        {CATEGORIES.map((cat) => (
          <button key={cat} onClick={() => setActiveCategory(cat)}>
            <Category
              name={cat}
              href="#"
              className={activeCategory === cat ? "border-green-600 text-green-600" : ""}
            />
          </button>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 mt-16 text-center">No products found.</p>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 mt-10 items-center gap-3">
          {filtered.map((product) => (
            <ProductItem key={product._id} {...product} />
          ))}
        </div>
      )}
    </>
  );
}
