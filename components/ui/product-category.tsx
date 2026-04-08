import React from "react";
import { Button } from "./button";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Category = ({
  name,
  href,
  className,
}: {
  name: string;
  href: string;
  className?: string;
}) => {
  return (
    <Link href={href}>
      <Button
        variant={"outline"}
        className={cn("text-center px-6 py-4 rounded-2xl", className)}
      >
        <div>{name}</div>
      </Button>
    </Link>
  );
};

export default Category;
