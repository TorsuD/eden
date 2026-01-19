import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import ProductItem from "@/components/ProductItem";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import Category from "@/components/ui/product-category";
import { SearchIcon } from "lucide-react";

const Products = () => {
  const categories = [
    {
      id: 1,
      href: "#",
      name: "All products",
    },
    {
      id: 2,
      href: "#",
      name: "Succulent Plants",
    },
    {
      id: 3,
      href: "#",
      name: "Indoor plants",
    },

    {
      id: 4,
      href: "#",
      name: "Outdoor plants",
    },

    {
      id: 5,
      href: "#",
      name: "Flowers",
    },
  ];

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 lg:p-8 ">
        {/* SEARCH SECTION */}
        <div className="mt-20 flex items-center justify-between">
          <div>
            <div className="title-font text-5xl">
              Products<span className="text-green-600 font-black">.</span>
            </div>
            <p className="text-sm text-gray-600 font-thin mt-2">
              Explore our wonderful catalog of plants and flowers.
            </p>
          </div>
          <div>
            <InputGroup className="h-10 border-none w-90 shadow-sm bg-gray-100">
              <InputGroupInput type="text" placeholder="Search product" />
              <InputGroupAddon>
                <SearchIcon />
              </InputGroupAddon>
            </InputGroup>
          </div>
        </div>

        {/* TABS AND PRODUCTS */}
        <div className="flex items-center gap-3 mt-10">
          {categories.map((item, index) => (
            <Category key={index} name={item?.name} href={item.href} />
          ))}
        </div>

        {/* PRODUCTS */}
        <div className="grid grid-cols-5 mt-10 items-center gap-3">
          {Array.from({ length: 20 }).map((_, index) => (
            <ProductItem key={index} />
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Products;
