import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

const KDDSchema: Schema = new Schema({
    transactionId: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    moneyOrderId: { type: String, required: true, default: "", uppercase: true },    
    devoteeName: { type: String, required: true },
    devoteePhone: { type: String, default: "" },
    devoteeAddress: { type: String, required: true },
    imageUrl: { type: Array, default: [] },
    moneyOrderNo: { type: String, required: true },
    moneyOrderType: { type: String, default: "" },
    moneyOrderAmount: { type: Number, default: 0 },
    moneyOrderDescription: { type: String, default: "" },
    sentDate: { type: Date },
    receivedDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    bookingPersonName: { type: String, default: "" },
});

const options = {
    modelName: 'KDD',
    field: 'moneyOrderNumber', // user_id will have an auto-incrementing value
};

KDDSchema.plugin(MongooseAutoIncrementID.plugin, options);

export default model("KDD", KDDSchema);
