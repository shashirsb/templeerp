import { model, Schema } from "mongoose";
import {MongooseAutoIncrementID} from 'mongoose-auto-increment-reworked';

const ConnectionCheckSchema: Schema = new Schema({
  createdAt: { type: Date, default: Date.now }
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
  modelName: 'ConnectionCheck',
  field: 'connection', // user_id will have an auto-incrementing value
};

ConnectionCheckSchema.plugin(MongooseAutoIncrementID.plugin, options);

export default model("ConnectionCheck", ConnectionCheckSchema);


