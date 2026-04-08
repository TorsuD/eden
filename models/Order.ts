import { Schema, model, models, Document, Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId;
  name: string;              // snapshot of product name at purchase time
  price: number;             // snapshot of price at purchase time
  quantity: number;
  image: string;             // snapshot of primary image
}

export interface IOrder extends Document {
  user: Types.ObjectId;
  items: IOrderItem[];
  total: number;
  status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
  stripePaymentIntentId?: string;
  shippingAddress: {
    name: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postalCode: string;
    country: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderItemSchema = new Schema<IOrderItem>(
  {
    product: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true, min: 0 },
    quantity: { type: Number, required: true, min: 1 },
    image: { type: String, required: true },
  },
  { _id: false }
);

const OrderSchema = new Schema<IOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: { type: [OrderItemSchema], required: true },
    total: { type: Number, required: true, min: 0 },
    status: {
      type: String,
      enum: ["pending", "paid", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    stripePaymentIntentId: { type: String },
    shippingAddress: {
      name: { type: String, required: true },
      line1: { type: String, required: true },
      line2: { type: String },
      city: { type: String, required: true },
      state: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Order = models.Order || model<IOrder>("Order", OrderSchema);
export default Order;
