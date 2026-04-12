import Image from "next/image";
import { Button } from "./ui/button";
import { ArrowRightIcon } from "lucide-react";
import { Fade } from "react-awesome-reveal";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div>
      <div className="h-full mt-20 flex lg:flex-row flex-col">
        <div className="flex-1/2 flex items-center justify-center">
          <div>
            {/* TITLE AND SUB TITLE OF EDEN */}
            <Fade cascade damping={0.5} duration={2500}>
              <div className="text-5xl p-2 lg:text-7xl title-font">
                Rooted in <span className="text-green-600">Nature</span>,
                Flourishing in Your Home{" "}
              </div>
            </Fade>

            <Fade cascade delay={500}>
              <p className="text-gray-400 text-lg my-4 font-medium">
                Bring nature's beauty home with our curated indoor plants, pots,
                and eco-friendly accessories.
              </p>
            </Fade>

            {/* SHOP NOW */}
            <Link href={"/products"}>
              <Button className="bg-green-600 h-16 text-white text-xl w-full lg:w-80 lg:mt-10 mt-6 rounded-xl font-bold">
                Shop Now <ArrowRightIcon />
              </Button>
            </Link>
          </div>
        </div>

        {/* RIGT SIDE IMAGE */}
        <div className="flex items-center justify-center flex-1 lg:flex-1/2 lg:mt-0 mt-10">
          <div className="relative">
            <Fade>
              <Image
                src={"/leaf.jpg"}
                alt="plant"
                width={900}
                height={900}
                quality={90}
                className="object-contain bg-center h-[90%] w-full rounded-2xl"
              />
            </Fade>

            {/* COMPLIMENTS */}
            <div className="absolute hidden lg:block top-16 -right-7.5 bg-pink-200 text-shadow-md text-white shadow-lg rounded-lg font-bold px-4 py-2  animate-float">
              Nature’s perfection 🌸
            </div>

            <div className="absolute hidden lg:block top-[45%] left-[-40] bg-orange-200 text-shadow-md text-white shadow-lg rounded-lg font-bold px-4 py-2  animate-float-fast">
              🌼 So fresh & alive
            </div>

            <div className="absolute hidden lg:block bottom-10 right-[-90] bg-green-200 text-shadow-md text-white shadow-lg rounded-lg font-bold px-4 py-2  animate-float">
              Calm & beautiful 🪴
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
