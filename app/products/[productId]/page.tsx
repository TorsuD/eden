import ImagePreview from "@/components/ImagePreviewer";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductActions from "./ProductActions";
import Footer from "@/components/Footer";

async function getProduct(id: string) {
  await connectDB();
  try {
    const product = await Product.findById(id).lean();
    if (!product) return null;
    return { ...product, _id: product._id.toString() };
  } catch {
    return null;
  }
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) notFound();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-col-reverse lg:flex-row  max-w-7xl mx-auto px-4 w-full pt-20 lg:pt-30 gap-10 lg:gap-20">
        <div className="flex-[0.5]">
          {/* PRODUCT NAME */}
          <div className="text-green-500 title-font text-5xl lg:text-5xl">
            {product.name}
          </div>

          {/* PRODUCT ID */}
          <p className="text-gray-400 mt-2 text-sm">{product._id}</p>

          {/* PRODUCT PRICE */}
          <p className="font-thin text-5xl mt-6">${product.price.toFixed(2)}</p>

          {/* PRODUCT DESCRIPTION */}
          <p className="text-gray-600 mt-10 leading-8 w-[80%]">
            {product.description}
          </p>

          {/* STOCK */}
          <p className="text-gray-600 mt-6">
            Stock: <span className="font-semibold">{product.stock}</span>
          </p>

          {/* TAGS */}
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            {(product.tags as string[])?.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>

          {/* QUANTITY + ADD TO CART */}
          <ProductActions
            productId={product._id}
            name={product.name as string}
            price={product.price as number}
            stock={product.stock as number}
            image={(product.images as string[])[0] ?? "/cacy.png"}
          />
        </div>

        {/* PRODUCT IMAGES */}
        <ImagePreview images={product.images as string[]} />
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
