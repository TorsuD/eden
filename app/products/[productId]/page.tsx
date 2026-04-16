import ImagePreview from "@/components/ImagePreviewer";
import Navbar from "@/components/navbar";
import { Badge } from "@/components/ui/badge";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import { notFound } from "next/navigation";
import ProductActions from "./ProductActions";
import Footer from "@/components/Footer";
import ProductItem from "@/components/ProductItem";

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

async function getRelatedProducts(category: string, excludeId: string) {
  await connectDB();
  const products = await Product.find({
    category,
    _id: { $ne: excludeId },
  })
    .limit(4)
    .lean();

  // If not enough in the same category, pad with products from other categories
  if (products.length < 4) {
    const others = await Product.find({
      _id: { $ne: excludeId, $nin: products.map((p) => p._id) },
    })
      .limit(4 - products.length)
      .lean();
    products.push(...others);
  }

  return products.map((p) => ({ ...p, _id: p._id.toString() }));
}

const ProductPage = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;
  const product = await getProduct(productId);

  if (!product) notFound();

  const related = await getRelatedProducts(
    product.category as string,
    productId,
  );

  /* ============================================================
     NEW UI — comment this block out and uncomment the OLD UI
     below if you want to revert.
  ============================================================ */
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full pt-24 lg:pt-32">
        {/* ── PRODUCT DETAIL ── */}
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* LEFT — image previewer */}
          <ImagePreview images={product.images as string[]} />

          {/* RIGHT — info */}
          <div className="py-4 flex flex-col gap-6">
            {/* CATEGORY + TAGS */}
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold uppercase tracking-widest text-green-600 bg-green-50 px-3 py-1 rounded-full">
                {product.category as string}
              </span>
              {(product.tags as string[])?.map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            {/* NAME */}
            <h1 className="title-font text-4xl lg:text-5xl leading-tight">
              {product.name as string}
            </h1>

            {/* PRICE */}
            <div className="flex items-end gap-3">
              <span className="text-4xl font-black text-green-600">
                ${(product.price as number).toFixed(2)}
              </span>
              <span className="text-gray-400 text-sm mb-1">per unit</span>
            </div>

            {/* DIVIDER */}
            <div className="border-t" />

            {/* DESCRIPTION */}
            <p className="text-gray-500 leading-8">
              {product.description as string}
            </p>

            {/* STOCK INDICATOR */}
            <div className="flex items-center gap-2">
              <div
                className={`w-2 h-2 rounded-full ${
                  (product.stock as number) > 5
                    ? "bg-green-500"
                    : (product.stock as number) > 0
                      ? "bg-orange-400"
                      : "bg-red-500"
                }`}
              />
              <span className="text-sm text-gray-500">
                {(product.stock as number) > 5
                  ? `In stock (${product.stock as number} available)`
                  : (product.stock as number) > 0
                    ? `Low stock — only ${product.stock as number} left`
                    : "Out of stock"}
              </span>
            </div>

            {/* DIVIDER */}
            <div className="border-t" />

            {/* ADD TO CART */}
            <ProductActions
              productId={product._id}
              name={product.name as string}
              price={product.price as number}
              stock={product.stock as number}
              image={(product.images as string[])[0] ?? "/cacy.png"}
            />

            {/* ID */}
            <p className="text-gray-300 text-xs font-mono">{product._id}</p>
          </div>
        </div>

        {/* ── YOU WILL ALSO LIKE ── */}
        {related.length > 0 && (
          <div className="mt-24 mb-16">
            <div className="mb-8">
              <h2 className="title-font text-3xl">
                You will also <span className="text-green-600">like</span>.
              </h2>
              <p className="text-gray-400 text-sm mt-2">
                More picks from our {product.category as string} collection.
              </p>
            </div>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductItem key={p._id} {...(p as any)} />
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductPage;
