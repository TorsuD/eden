import mongoose, { Schema, model, models, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash?: string;       // undefined for OAuth-only users
  role: "customer" | "admin";
  resetToken?: string;
  resetTokenExpiry?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    passwordHash: { type: String },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

// Prevent model re-compilation during hot reload in dev
const User = models.User || model<IUser>("User", UserSchema);
export default User;
