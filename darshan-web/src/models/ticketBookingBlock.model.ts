import { model, Schema } from "mongoose";

const TicketBookingBlockSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  darshanType: { type: Schema.Types.ObjectId, ref: "DarshanType" },
  sevaType: { type: Schema.Types.ObjectId, ref: "SevaType" },
  bookingBlockType: { type: String, required: true, default: "full" },
  bookingBlockFor: { type: String, required: true, default: "darshan" },
  bookingBlockDate: { type: Date, required: true, default: Date.now },
  bookingBlockStartTime: { type: Number, required: true, default: Date.now },
  bookingBlockEndTime: { type: Number, required: true, default: Date.now },
  description: { type: String, default: "" },
  note: { type: String, default: "" },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now }
});

export default model("TicketBookingBlock", TicketBookingBlockSchema);