import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

const CashKanikeSchema: Schema = new Schema({
    transactionId: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    cashKanikeId: { type: String, required: true, default: "", uppercase: true },    
    devoteeName: { type: String, required: true },
    devoteePhone: { type: String, default: "" },
    devoteeAddress: { type: String, required: true },
    imageUrl: { type: Array, default: [] },
    cashKanikePrice: { type: Number, default: 0 },
    cashKanikeDescription: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    bookingPersonName: { type: String, default: "" },
});

const options = {
    modelName: 'CashKanike',
    field: 'cashKanikeNumber', // user_id will have an auto-incrementing value
};

CashKanikeSchema.plugin(MongooseAutoIncrementID.plugin, options);

export default model("CashKanike", CashKanikeSchema);
