"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import ProductItem from "@/components/ProductItem";
import Category from "@/components/ui/product-category";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { Flower2Icon, SearchIcon } from "lucide-react";

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
  "Succulent plants",
  "Indoor plants",
  "Outdoor plants",
  "Flowers",
];

const CATEGORY_TO_SLUG: Record<string, string> = {
  "Indoor plants": "indoor-plants",
  "Outdoor plants": "outdoor-plants",
  "Flowers": "flowers",
  "Succulent plants": "succulents",
};

export default function ProductsGrid({
  products,
  initialCategory = "All products",
}: {
  products: Product[];
  initialCategory?: string;
}) {
  const router = useRouter();
  const [activeCategory, setActiveCategory] = useState(initialCategory);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    return products.filter((p) => {
      const matchesCategory =
        activeCategory === "All products" || p.category === activeCategory;
      const matchesSearch =
        search === "" || p.name.toLowerCase().includes(search.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [products, activeCategory, search]);

  return (
    <>
      {/* SEARCH + TITLE */}
      <div className="mt-20 flex lg:flex-row flex-col items-center justify-between">
        <div>
          <div className="title-font text-5xl">
            Products<span className="text-green-600 font-black">.</span>
          </div>
          <p className="text-sm text-gray-600 font-thin mt-2">
            Explore our wonderful catalog of plants and flowers.
          </p>
        </div>
        <div>
          <InputGroup className="h-10 border-none mt-2 lg:mt-0 w-90 shadow-sm bg-gray-100">
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
      <div className="flex items-center gap-3 mt-5 flex-wrap">
        {CATEGORIES.map((cat) => (
          <div
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              if (cat === "All products") {
                router.push("/products");
              } else {
                router.push(`/products/category?name=${CATEGORY_TO_SLUG[cat]}`);
              }
            }}
          >
            <Category
              name={cat}
              href="#"
              className={
                activeCategory === cat ? "border-green-600 text-green-600" : ""
              }
            />
          </div>
        ))}
      </div>

      {/* PRODUCTS GRID */}
      {filtered.length === 0 ? (
        <div>
          <Flower2Icon className="mx-auto mt-20 text-gray-300" size={48} />
          <p className="text-gray-400 mt-8 text-center">No products found.</p>
        </div>
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
