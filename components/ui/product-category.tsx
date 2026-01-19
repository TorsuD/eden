import React from "react";
import { Button } from "./button";
import Link from "next/link";

const Category = ({ name, href }: { name: string; href: string }) => {
  return (
    <Link href={href}>
      <Button variant={"outline"} className="text-center px-6 py-4 rounded-2xl">
        <div>{name}</div>
      </Button>
    </Link>
  );
};

export default Category;
