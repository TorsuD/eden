import Image from "next/image";
import { Card } from "./ui/card";
import Link from "next/link";

interface ProductItemProps {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
  category?: string;
}

const CATEGORY_THEME: Record<string, string> = {
  "Succulent Plants": "from-emerald-100 via-emerald-50 to-white",
  "Indoor Plants": "from-teal-100 via-teal-50 to-white",
  "Outdoor Plants": "from-amber-100 via-amber-50 to-white",
  Flowers: "from-pink-100 via-rose-50 to-white",
};

const ProductItem = ({
  _id,
  name,
  price,
  stock,
  images,
  category,
}: ProductItemProps) => {
  const theme = CATEGORY_THEME[category ?? ""] ?? "from-green-100 via-green-50 to-white";
  const lowStock = stock > 0 && stock <= 10;

  return (
    <Link href={`/products/${_id}`} className="group block">
      <Card className="p-0 overflow-hidden rounded-3xl border-transparent gap-0 shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-green-900/10">
        <div
          className={`relative aspect-square bg-linear-to-br ${theme} overflow-hidden`}
        >
          {/* decorative blob */}
          <div className="absolute -top-8 -right-8 h-28 w-28 rounded-full bg-white/40 blur-2xl" />

          {category && (
            <span className="absolute top-3 left-3 z-10 rounded-full bg-white/80 backdrop-blur px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-green-700 shadow-sm">
              {category.replace(" Plants", "")}
            </span>
          )}

          {stock === 0 ? (
            <span className="absolute top-3 right-3 z-10 rounded-full bg-gray-900/80 px-2.5 py-1 text-[10px] font-semibold text-white">
              Sold out
            </span>
          ) : lowStock ? (
            <span className="absolute top-3 right-3 z-10 rounded-full bg-orange-500/90 px-2.5 py-1 text-[10px] font-semibold text-white">
              Only {stock} left
            </span>
          ) : null}

          <Image
            src={images[0] ?? "/cacy.png"}
            alt={name}
            width={500}
            height={500}
            quality={90}
            className="relative h-full w-full object-contain p-6 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-2"
          />
        </div>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-semibold leading-tight text-gray-900 dark:text-white">
              {name}
            </h3>
          </div>
          <div className="mt-2 flex items-center justify-between">
            <span className="rounded-full bg-green-50 px-2.5 py-1 text-sm font-bold text-green-700">
              ${price.toFixed(2)}
            </span>
            <span className="text-xs text-gray-400 dark:text-white">Stock: {stock}</span>
          </div>
        </div>
      </Card>
    </Link>
  );
};

export default ProductItem;
