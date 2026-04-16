import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import Image from "next/image";
import Link from "next/link";
import { BadgePercentIcon } from "lucide-react";

const DISCOUNT_RATES = [20, 15, 30, 10, 25, 15];

async function getSpecialOfferProducts() {
  await connectDB();
  const products = await Product.find({}).lean();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
}

const SpecialOffersPage = async () => {
  const products = await getSpecialOfferProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full pt-32 pb-20">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Limited Time
          </p>
          <h1 className="title-font text-5xl lg:text-6xl">
            Special <span className="text-green-600">Offers</span>.
          </h1>
          <p className="text-gray-500 mt-5 max-w-xl leading-7">
            Seasonal deals on our favourite plants and blooms. Refresh your
            space for less — these prices won&apos;t last long.
          </p>
        </div>

        {/* BANNER */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 text-white rounded-3xl p-8 mb-12 flex items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-2xl mb-2">Spring Sale — Up to 30% off</h2>
            <p className="text-green-100 text-sm max-w-sm">
              Celebrate the season with our biggest plant sale of the year. Limited
              stock available.
            </p>
          </div>
          <BadgePercentIcon className="w-16 h-16 text-white/30 shrink-0" />
        </div>

        {/* PRODUCTS */}
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No offers available right now. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product, i) => {
              const discount = DISCOUNT_RATES[i % DISCOUNT_RATES.length];
              const salePrice = product.price * (1 - discount / 100);

              return (
                <Link
                  key={product._id}
                  href={`/products/${product._id}`}
                  className="border rounded-2xl overflow-hidden hover:shadow-md transition-shadow group"
                >
                  {/* IMAGE */}
                  <div className="relative bg-gray-50 p-4 flex items-center justify-center h-48">
                    <Image
                      src={(product.images as string[])[0] ?? "/cacy.png"}
                      alt={product.name as string}
                      width={200}
                      height={200}
                      className="h-36 w-36 object-contain"
                    />
                    <span className="absolute top-3 left-3 bg-green-600 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                      -{discount}%
                    </span>
                  </div>

                  {/* INFO */}
                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-1">{product.category as string}</p>
                    <h3 className="font-semibold group-hover:text-green-600 transition-colors">
                      {product.name as string}
                    </h3>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-green-600 font-bold">
                        ${salePrice.toFixed(2)}
                      </span>
                      <span className="text-gray-400 text-sm line-through">
                        ${(product.price as number).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default SpecialOffersPage;
