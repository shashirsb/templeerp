import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

const SPBSchema: Schema = new Schema({
    transactionId: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    specialPoojaId: { type: String, required: true, default: "", uppercase: true },
    devoteeName: { type: String, required: true },
    devoteePhone: { type: String, default: "" },
    devoteeAddress: { type: String, required: true },
    specialPoojatype: { type: String, default: "" },
    specialPoojaDate: { type: Date, required: true, default: Date.now },
    amountPaid: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    bookingPersonName: { type: String, default: "" },
});

const options = {
    modelName: 'SPB',
    field: 'SpecialPoojaNumber', // user_id will have an auto-incrementing value
};

SPBSchema.plugin(MongooseAutoIncrementID.plugin, options);

export default model("SPB", SPBSchema);
