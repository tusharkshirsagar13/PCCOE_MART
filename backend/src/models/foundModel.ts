import mongoose from "mongoose";

const foundItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  description: {
    type: String,
    required: true,
    trim: true,
  },

  category: {
    type: String,
    required: true,
    enum: ["Books", "Electronics", "Stationery", "Clothing", "Others"],
  },

  imageUrls: {
    type: [String],
    default: [],
  },

  finder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

export const foundModel = mongoose.model("found", foundItemSchema);
