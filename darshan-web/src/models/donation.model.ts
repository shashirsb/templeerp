import { model, Schema } from "mongoose";

const DonationSchema: Schema = new Schema({
  transactionId: { type: String },
  userId: { type: Schema.Types.ObjectId, ref: "User", default: null },
  donationTypeId: { type: Schema.Types.ObjectId, ref: "DonationType" },
  donationDate: { type: Date, default: Date.now },
  amount: { type: Number, required: true },
  isCardDonation: { type: Boolean, default: false },
  buildingName:  { type: String, default: "" },
  isSecretFunds: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default model("Donation", DonationSchema);
