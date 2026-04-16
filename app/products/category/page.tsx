import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductsGrid from "../ProductsGrid";

const SLUG_TO_CATEGORY: Record<string, string> = {
  "indoor-plants": "Indoor plants",
  "outdoor-plants": "Outdoor plants",
  "flowers": "Flowers",
  "succulents": "Succulent plants",
};

async function getProducts() {
  await connectDB();
  const products = await Product.find({}).lean();
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
}

const CategoryPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ name?: string }>;
}) => {
  const { name } = await searchParams;
  const initialCategory = name ? (SLUG_TO_CATEGORY[name] ?? "All products") : "All products";
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 lg:p-8 w-full">
        <ProductsGrid products={products as any} initialCategory={initialCategory} />
      </div>
      <div className="mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default CategoryPage;
