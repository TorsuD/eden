import { Schema, model, models, Document, Types } from "mongoose";

export interface ICartItem {
  product: Types.ObjectId;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface ICart extends Document {
  user: Types.ObjectId;
  items: ICartItem[];
  updatedAt: Date;
}

const CartItemSchema = new Schema<ICartItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    image: { type: String, required: true },
    quantity: { type: Number, required: true, min: 1 },
  },
  { _id: false }
);

const CartSchema = new Schema<ICart>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    items: { type: [CartItemSchema], default: [] },
  },
  { timestamps: true }
);

const Cart = models.Cart || model<ICart>("Cart", CartSchema);
export default Cart;
