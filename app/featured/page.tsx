import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import ProductItem from "@/components/ProductItem";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";

async function getFeaturedProducts() {
  await connectDB();
  const products = await Product.find({}).sort({ createdAt: -1 }).lean();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
}

const FeaturedCollectionPage = async () => {
  const products = await getFeaturedProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full pt-32 pb-20">
        {/* HEADER */}
        <div className="mb-12">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Curated for you
          </p>
          <h1 className="title-font text-5xl lg:text-6xl">
            Featured <span className="text-green-600">Collection</span>.
          </h1>
          <p className="text-gray-500 mt-5 max-w-xl leading-7">
            Our most loved plants — carefully selected by our team for their
            beauty, ease of care, and ability to transform any space.
          </p>
        </div>

        {/* BANNER */}
        <div className="bg-green-500 rounded-3xl p-8 mb-12 flex items-center justify-between gap-6">
          <div>
            <h2 className="font-bold text-xl text-muted mb-1">
              Hand-picked. Expert approved.
            </h2>
            <p className="text-gray-500 text-sm">
              Every plant in this collection has been selected for exceptional
              quality and character.
            </p>
          </div>
          <span className="text-5xl shrink-0">🌟</span>
        </div>

        {/* PRODUCTS */}
        {products.length === 0 ? (
          <div className="text-center py-20 text-gray-400">
            No products available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <ProductItem key={product._id} {...(product as any)} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default FeaturedCollectionPage;
