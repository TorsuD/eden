import TitleSection from "./TitleSection";

import { Card } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import Link from "next/link";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

const CATEGORY_THEME: Record<string, string> = {
  "Succulent Plants": "from-emerald-100 via-emerald-50 to-white",
  "Indoor Plants": "from-teal-100 via-teal-50 to-white",
  "Outdoor Plants": "from-amber-100 via-amber-50 to-white",
  Flowers: "from-pink-100 via-rose-50 to-white",
};

async function getProducts() {
  await connectDB();
  const products = await Product.find({}).lean();
  // Convert _id ObjectId to string for client serialisation
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
}

export default async function ShoppingSection() {
  const products = await getProducts();

  return (
    <div>
      <TitleSection
        title="Shop"
        description="Explore from our list of beautiful flowers and plants"
      />

      <div className="center mt-10">
        <Carousel
          opts={{
            align: "start",
          }}
          className="w-full"
        >
          <CarouselContent>
            {products?.splice(1, 4)?.map((item, index) => {
              const theme =
                CATEGORY_THEME[item?.category ?? ""] ??
                "from-green-100 via-green-50 to-white";
              return (
                <CarouselItem
                  key={index}
                  className="md:basis-1/2 lg:basis-1/3 group"
                >
                  <Link href={`/products/${item._id}`} className="block p-1">
                    <Card className="p-0 gap-0 overflow-hidden rounded-3xl border-transparent shadow-sm transition-all duration-300 group-hover:-translate-y-1.5 group-hover:shadow-xl group-hover:shadow-green-900/10">
                      <div
                        className={`relative flex aspect-square items-center justify-center overflow-hidden bg-linear-to-br ${theme}`}
                      >
                        <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-white/40 blur-2xl" />
                        <Image
                          src={item?.images?.[0] || "/placeholder.png"}
                          alt={item?.name ?? "potted flower"}
                          width={500}
                          height={500}
                          sizes="320px"
                          className="relative h-full w-full object-contain p-10 transition-transform duration-500 ease-out group-hover:scale-110 group-hover:-rotate-2"
                        />
                      </div>
                      <div className="px-4 py-4 text-center font-semibold text-gray-900 dark:text-white">
                        {item?.name}
                      </div>
                    </Card>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="hidden lg:flex" />
          <CarouselNext className="hidden lg:flex" />
        </Carousel>
      </div>

      <div className="flex items-center justify-center gap-1 text-center lg:hidden mt-5">
        <span className="text-green-600">swipe</span> through{" "}
        <ArrowRightIcon size={12} className="text-green-600" />
      </div>

      <Link href="/products" className="center mt-20">
        <Button className="bg-green-600 h-13 text-white text-lg w-full lg:w-80 px-10 rounded-xl font-bold">
          Explore <ArrowRightIcon />
        </Button>
      </Link>
    </div>
  );
}
