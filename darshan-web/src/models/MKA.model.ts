import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

const MKASchema: Schema = new Schema({
    transactionId: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    utsavaMurthyId: { type: String, required: true, default: "", uppercase: true },
    devoteeName: { type: String, required: true },
    devoteePhone: { type: String, default: "" },
    devoteeAddress: { type: String, required: true },
    idProofType: { type: String, required: true },
    idProofNo: { type: String, default: "" },
    utsavatype: { type: String, default: "" },
    startDate: { type: Date, required: true, default: Date.now },
    endDate: { type: Date, required: true, default: Date.now },
    noOfDays: { type: Number, required: true, default: 0 },
    amountPaid: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    bookingPersonName: { type: String, default: "" },
});

const options = {
    modelName: 'MKA',
    field: 'utsavaMurthyNumber', // user_id will have an auto-incrementing value
};

MKASchema.plugin(MongooseAutoIncrementID.plugin, options);

export default model("MKA", MKASchema);
