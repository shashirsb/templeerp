import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

const KSASchema: Schema = new Schema({
    transactionId: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    kanikeId: { type: String, required: true, default: "", uppercase: true },    
    devoteeName: { type: String, required: true },
    devoteePhone: { type: String, default: "" },
    devoteeAddress: { type: String, required: true },
    imageUrl: { type: Array, default: [] },
    kanikeType: { type: String, required: true },
    kanikeQuality: { type: String, default: "" },
    kanikeWeight: { type: String, default: "" },
    kanikePrice: { type: Number, default: 0 },
    kanikeDescription: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    bookingPersonName: { type: String, default: "" },
});

const options = {
    modelName: 'KSA',
    field: 'kanikeNumber', // user_id will have an auto-incrementing value
};

KSASchema.plugin(MongooseAutoIncrementID.plugin, options);

export default model("KSA", KSASchema);
