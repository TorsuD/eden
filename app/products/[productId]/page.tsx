"use client";

import Footer from "@/components/Footer";
import ImagePreview from "@/components/ImagePreviewer";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import { useState } from "react";

const Product = () => {
  const params = useParams<{ productId: string }>();

  const [count, setCount] = useState(1);

  const increment = () => setCount((prev) => prev + 1);
  const decrement = () => setCount((prev) => (prev > 1 ? prev - 1 : 1));
  return (
    <div>
      <Navbar />
      <div>
        <div className="flex pt-30 max-w-7xl mx-auto">
          <div className="flex-[0.5]">
            <div>
              {/* PRODUCT NAME */}
              <div className="text-green-500 title-font text-5xl lg:text-5xl">
                Succulent Plant {params.productId}
              </div>

              {/* PRODUCT ID */}
              <p className="text-gray-400 mt-2">0056893434777</p>

              {/* PRODUCT PRICE */}
              <p className="font-thin text-5xl mt-6 ">$14.99</p>

              {/* PRODUCT DESCRIPTION */}
              <p className="text-gray-600 mt-10 leading-8 w-[80%]">
                Our succulents are hardy, eye-catching plants known for their
                thick, water-storing leaves and modern appeal. They require
                little watering and adapt easily to indoor or outdoor
                environments, making them ideal for beginners and plant lovers
                alike.
              </p>

              <p className="text-gray-600 mt-10 leading-8 w-[80%]">
                {" "}
                Stock: 20
              </p>

              <div className="mt-3 flex items-center gap-2">
                <Badge variant="outline">Indoor plant</Badge>
                <Badge>Pet safe</Badge>
              </div>

              <div className="flex items-center mt-10 gap-2">
                <div className="flex gap-4 items-center bg-muted">
                  {/* DECREMENT BUTTON */}
                  <Button
                    variant={"ghost"}
                    className="text-xl py-7 px-5"
                    onClick={decrement}
                  >
                    <span className="text-2xl">-</span>
                  </Button>

                  {/* COUNT */}
                  <p className="text-lg text-center w-10">{count}</p>

                  {/* INCREMENT BUTTON */}
                  <Button
                    variant={"ghost"}
                    className="text-xl py-7 px-5"
                    onClick={increment}
                  >
                    <span className="text-2xl">+</span>
                  </Button>
                </div>

                {/* ADD TO CART BUTTON */}
                <div>
                  <Button className="py-7 cursor-pointer px-10 rounded-none">
                    Add to Cart $14.99
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* PRODUCT IMAGE */}
          <ImagePreview />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Product;
