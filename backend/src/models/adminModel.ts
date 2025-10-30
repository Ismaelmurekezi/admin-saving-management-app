import mongoose, { Document, Schema } from "mongoose";

export interface IAdmin extends Document {
  email: string;
  password: string;
  role: "admin";
  createdAt: Date;
}

const adminSchema = new Schema<IAdmin>({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: "admin" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IAdmin>("Admin", adminSchema);
