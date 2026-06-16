import { model, Schema } from "mongoose";

const SevaTypeSchema: Schema = new Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true, default: 0 },
  allowed: { type: Number, required: true, default: 50 },
  description: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model("SevaType", SevaTypeSchema);
