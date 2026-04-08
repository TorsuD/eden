import { Schema, model, models, Document } from "mongoose";

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  images: string[];          // array of image URLs
  category: string;
  tags: string[];
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema = new Schema<IProduct>(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    images: { type: [String], default: [] },
    category: { type: String, required: true, trim: true },
    tags: { type: [String], default: [] },
    stock: { type: Number, required: true, min: 0, default: 0 },
  },
  { timestamps: true }
);

const Product = models.Product || model<IProduct>("Product", ProductSchema);
export default Product;
