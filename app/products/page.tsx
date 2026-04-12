import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { connectDB } from "@/lib/db";
import Product from "@/models/Product";
import ProductsGrid from "./ProductsGrid";

async function getProducts() {
  await connectDB();
  const products = await Product.find({}).lean();
  // Convert _id ObjectId to string for client serialisation
  return products.map((p) => ({
    ...p,
    _id: p._id.toString(),
  }));
}

const ProductsPage = async () => {
  const products = await getProducts();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 lg:p-8 w-full">
        <ProductsGrid products={products as any} />
      </div>
      <div className="mx-auto">
        <Footer />
      </div>
    </div>
  );
};

export default ProductsPage;
