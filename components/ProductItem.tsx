import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Link from "next/link";

interface ProductItemProps {
  _id: string;
  name: string;
  price: number;
  stock: number;
  images: string[];
}

const ProductItem = ({ _id, name, price, stock, images }: ProductItemProps) => {
  return (
    <Link href={`/products/${_id}`}>
      <Card className="p-2 hover:shadow-md transition-shadow">
        <CardContent className="p-0">
          <CardHeader>
            <Image
              src={images[0] ?? "/cacy.png"}
              alt={name}
              width={900}
              height={900}
              quality={100}
              className="object-contain bg-center h-40 w-full rounded-2xl"
            />
            <CardTitle className="rounded-2xl text-sm">{name}</CardTitle>
            <CardDescription className="text-sm">
              <p>${price.toFixed(2)}</p>
              <p>Stock: {stock}</p>
            </CardDescription>
          </CardHeader>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductItem;
