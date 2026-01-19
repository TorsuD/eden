import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

const ProductItem = () => {
  return (
    <Link href={"/products/3"}>
      <Card className="p-2 ">
        <CardContent className="p-0">
          <CardHeader>
            <Image
              src={"/cacy.png"}
              alt="plant"
              width={900}
              height={900}
              quality={90}
              className="object-contain bg-center h-40 w-full rounded-2xl"
            />
            <CardTitle className="rounded-2xl">Succulent Plant</CardTitle>
            <CardDescription className="text-sm">
              <p>$14.99</p>
              <p>Stock: 14</p>
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
