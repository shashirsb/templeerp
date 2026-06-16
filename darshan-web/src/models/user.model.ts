import { model, Schema } from "mongoose";

const UserSchema: Schema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  userType: { type: String, default: "user", required: true },
  isActive: { type: Boolean, default: true, required: true },
  gender: { type: String, default: "M", required: true },
  mobile: { type: Number, default: 0, required: true },
  mobileVerified: { type: Boolean, required: true, default: false },
  emailVerified: { type: Boolean, required: true, default: false },
  phone: { type: Number },
  otpNumber: { type: Number },
  pilgrimType: { type: String, required: true },
  idProofType: { type: String, required: true },
  idProofNumber: { type: String, required: true },
  addressLine1: { type: String },
  addressLine2: { type: String },
  country: { type: String },
  state: { type: String },
  city: { type: String },
  postalCode: { type: String },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model("User", UserSchema);
