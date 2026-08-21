import TitleSection from "./TitleSection";

import { Card, CardContent } from "@/components/ui/card";
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
            {products?.splice(1, 4)?.map((item, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <Link href={`/products/${item._id}`} className="p-1">
                  <Card>
                    <CardContent className="flex aspect-square items-center justify-center p-6">
                      <Image
                        src={item?.images?.[0] || "/placeholder.png"}
                        alt="potted flower"
                        width={900}
                        height={900}
                        sizes="320px"
                        className="h-80 w-80 object-contain"
                      />
                    </CardContent>
                    <div className="text-center">{item?.name}</div>
                  </Card>
                </Link>
              </CarouselItem>
            ))}
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
