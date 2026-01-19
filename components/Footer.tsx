import Link from "next/link";

const Footer = () => {
  return (
    <footer className="px-2 lg:px-8 mt-20 py-5">
      <div className="flex justify-between max-w-7xl mb-10">
        <div className="text-green-500 font-bold">
          eden<span className="text-black">.</span>
        </div>
        <Link href={"/terms-and-conditions"} className="">
          terms and conditions
        </Link>
      </div>

      <div>
        <p className="text-sm text-center font-medium text-gray-500">
          2026 Eden. All rights reserved.
        </p>

        <p className="text-xs text-center mt-5 text-gray-400">
          by Derrick Torsu.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
