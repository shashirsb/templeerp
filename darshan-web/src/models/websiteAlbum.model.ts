import { model, Schema } from "mongoose";

const WebsiteAlbumSchema: Schema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },   
    imageUrl: { type: Array, default: [] },
    websiteAlbumId: { type: String, required: true, default: "", uppercase: true },        
    createdAt: { type: Date, default: Date.now },
    createdBy: { type: Schema.Types.ObjectId, ref: "User" },
    albumName: { type: String, default: "" },
    bookingPersonName: { type: String, default: "" }
});

const options = {
    modelName: 'WebsiteAlbum'
};

export default model("WebsiteAlbum", WebsiteAlbumSchema);
