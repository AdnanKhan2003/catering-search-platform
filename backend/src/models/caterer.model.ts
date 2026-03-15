import mongoose, { Schema } from "mongoose";

const catererSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    pricePerPlate: {
        type: Number,
        required: true,
    },
    cuisines: {
        type: [String],
        required: true,
    },
    rating: {
        type: Number,
        default: 0,
    }
});

export const Caterer = mongoose.model("Caterer", catererSchema);