import { model, Schema } from "mongoose";

const HundiSchema: Schema = new Schema({
  transactionId: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  hundiDate: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  occasion: { type: String, required: true },
  behalfOf: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model("Hundi", HundiSchema);
