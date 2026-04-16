import Footer from "@/components/Footer";
import Navbar from "@/components/navbar";
import { LeafIcon, HeartIcon, PackageIcon, SunIcon } from "lucide-react";

const values = [
  {
    icon: LeafIcon,
    title: "Sustainably Sourced",
    description:
      "Every plant in our catalog is ethically and sustainably grown, partnering with growers who share our commitment to the planet.",
  },
  {
    icon: HeartIcon,
    title: "Curated with Care",
    description:
      "Our team hand-picks each variety for quality, health, and beauty — so you always receive the best.",
  },
  {
    icon: PackageIcon,
    title: "Safe Delivery",
    description:
      "Plants are carefully packaged to arrive at your door fresh, healthy, and ready to thrive.",
  },
  {
    icon: SunIcon,
    title: "Lifetime Support",
    description:
      "Not sure how to care for your plant? Our team is always here to guide you through every season.",
  },
];

const AboutPage = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* HERO */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 w-full pt-32 pb-20">
        <div className="text-center max-w-3xl mx-auto">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-4">
            Our Story
          </p>
          <h1 className="title-font text-5xl lg:text-7xl">
            About <span className="text-green-600">Eden</span>.
          </h1>
          <p className="text-gray-500 text-lg mt-6 leading-8">
            Eden was born from a simple belief; that everyone deserves a little
            piece of nature in their home. We started as a small team of plant
            lovers and grew into a community rooted in greenery, wellness, and
            sustainable living.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="my-20 border-t" />

        {/* MISSION */}
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-3">
              Our Mission
            </p>
            <h2 className="title-font text-4xl mb-6">
              Bringing nature closer to you.
            </h2>
            <p className="text-gray-500 leading-8 mb-4">
              We believe plants are more than decoration. They clean the air,
              calm the mind, and bring life to any space. Our mission is to make
              it easy and joyful for anyone from first-time plant parents to
              seasoned gardeners to find, care for, and love plants.
            </p>
            <p className="text-gray-500 leading-8">
              From tropical houseplants to drought-tolerant succulents, we
              source varieties that are beautiful, resilient, and suited for
              real homes and real lives.
            </p>
          </div>

          <div className="bg-green-50 rounded-3xl p-10 space-y-6">
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-green-600">200+</span>
              <span className="text-gray-500 font-medium">
                Plant varieties available
              </span>
            </div>
            <div className="border-t" />
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-green-600">5k+</span>
              <span className="text-gray-500 font-medium">
                Happy plant parents
              </span>
            </div>
            <div className="border-t" />
            <div className="flex items-center gap-4">
              <span className="text-5xl font-black text-green-600">100%</span>
              <span className="text-gray-500 font-medium">
                Sustainably sourced
              </span>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="my-20 border-t" />

        {/* VALUES */}
        <div className="text-center mb-12">
          <p className="text-green-600 font-semibold text-sm uppercase tracking-widest mb-3">
            What We Stand For
          </p>
          <h2 className="title-font text-4xl">Our Values.</h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="border rounded-2xl p-6 hover:shadow-md transition-shadow"
            >
              <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                <Icon className="text-green-600 w-5 h-5" />
              </div>
              <h3 className="font-bold text-lg mb-2">{title}</h3>
              <p className="text-gray-500 text-sm leading-6">{description}</p>
            </div>
          ))}
        </div>

        {/* DIVIDER */}
        <div className="my-20 border-t" />

        {/* CLOSING */}
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="title-font text-4xl mb-6">
            Made with love, for plant people.
          </h2>
          <p className="text-gray-500 leading-8">
            Whether you&apos;re looking for your first plant or your fiftieth,
            Eden is here to make every step feel effortless. Thank you for being
            part of our growing community.
          </p>
          <p className="text-green-600 font-bold mt-6">— The Eden Team by</p>
          <p className="text-muted-foreground font-bold text-xs mt-2">
            Derrick Torsu
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
};

export default AboutPage;
