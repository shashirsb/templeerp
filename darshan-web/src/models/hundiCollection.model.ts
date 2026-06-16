import { model, Schema } from "mongoose";
import { MongooseAutoIncrementID } from 'mongoose-auto-increment-reworked';

const HundiCollectionSchema: Schema = new Schema({
    transactionId: { type: String, default: "" },
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    hundiCollectionId: { type: String, required: true, default: "", uppercase: true },
    totalAmount: { type: Number, required: true },
    notesTotalAmount: { type: Number, required: true },
    coinTotalAmount: { type: Number, required: true },
    hundiID: { type: String, default: "" },
    hundiUnstagedPlace: { type: String, default: "" },
    hundiUnstagedDate: { type: Date, required: true, default: Date.now },
    hundiOpenedDate: { type: Date, required: true, default: Date.now },
    description: { type: String, default: "" },
    note2000: { type: Number, required: true },
    note500: { type: Number, required: true },
    note200: { type: Number, required: true },
    note100: { type: Number, required: true },
    note50: { type: Number, required: true },
    note20: { type: Number, required: true },
    note10: { type: Number, required: true },
    note5: { type: Number, required: true },
    note2: { type: Number, required: true },
    note1: { type: Number, required: true },
    coin10: { type: Number, required: true },
    coin5: { type: Number, required: true },
    coin2: { type: Number, required: true },
    coin1: { type: Number, required: true },
    bankName: { type: String, default: "" },
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    bookingPersonName: { type: String, default: "" }
});

const options = {
    modelName: 'HundiCollection',
    field: 'hundiCollectionNumber', // user_id will have an auto-incrementing value
};

HundiCollectionSchema.plugin(MongooseAutoIncrementID.plugin, options);

export default model("HundiCollection", HundiCollectionSchema);
