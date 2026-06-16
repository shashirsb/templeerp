import { model, Schema } from "mongoose";

const DonationTypeSchema: Schema = new Schema({
  title_en: { type: String, required: true },
  title_kan: { type: String, required: true },
  description_en: { type: String, default: "" },
  description_kan: { type: String, default: "" },
  hasCardDonation: { type: Boolean, default: false },
  cardTitle_en: { type: String },
  cardTitle_kan: { type: String },
  cardAmount: { type: Number, default: 0 },
  cardCause_en: { type: String, default: "" },
  cardCause_kan: { type: String, default: "" },
  cardBenifits_en:  { type: String, default: "" },
  cardBenifits_kan:  { type: String, default: "" },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default model("DonationType", DonationTypeSchema);
