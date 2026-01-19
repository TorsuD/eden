import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/navbar";
import ShoppingSection from "@/components/ShoppingSection";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto p-4 lg:p-8 space-y-35 ">
        <HeroSection />
        <ShoppingSection />

        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
