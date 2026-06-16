import { model, Schema } from "mongoose";

const PilgrimSchema: Schema = new Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true, default: "M" },
  idProofType: { type: String, default: "" },
  idProofNumber: { type: String, default: "" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now }
});

export default model("Pilgrim", PilgrimSchema);
