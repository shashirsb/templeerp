import { model, Schema } from "mongoose";
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

const SLBSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User" },
  darshanType: { type: Schema.Types.ObjectId, ref: "DarshanType", default: null },
  sevaType: { type: Schema.Types.ObjectId, ref: "SevaType", default: null },
  transactionId: { type: String, default: "" },
  bookingId: { type: String, required: true, default: "", uppercase: true },
  bookingFor: { type: String, required: true, default: "darshan" },
  bookingDate: { type: Date, required: true, default: Date.now },
  bookingStartTime: { type: Number, required: true, default: 0 },
  bookingEndTime: { type: Number, required: true, default: 0 },
  bookingAmount: { type: Number, required: true, default: 0 },
  paymentType: { type: String, required: true, default: "netBanking" },
  paymentId: { type: String, required: true, default: "abcdefghijklmnop" },
  bookingBy: { type: String, required: true, default: "online" },
  bookingPersonName: { type: String, default: "" },
  bookingPersonMobile: { type: String, default: 0 },
  numberOfDevotees:  { type: Number, required: true, default: 0 },
  entryDate:  { type: Date, required: true, default: Date.now },
  entryDone:  { type: Boolean, required: true, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
  updatedAt: { type: Date, default: Date.now }
});

// Alternate method
// MongooseAutoIncrementID.initialise('bookingNumber');
// const plugin = new MongooseAutoIncrementID(TicketBookingSchema, 'TicketBooking');

// plugin.applyPlugin()
//   .then(() => {
//     // Plugin ready to use! You don't need to wait for this promise - any save queries will just get queued.
//     // Every document will have an auto-incremented number value on _id.
//   })
//   .catch(e => {
//     // Plugin failed to initialise
//   });

// Default Method

const options = {
  modelName: 'SLB',
  field: 'bookingNumber', // user_id will have an auto-incrementing value
};

SLBSchema.plugin(MongooseAutoIncrementID.plugin, options);

export default model("SLB", SLBSchema);


