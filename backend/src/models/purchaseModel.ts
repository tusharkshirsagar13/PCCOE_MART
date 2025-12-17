import mongoose from "mongoose";

const purchaseSchema = new mongoose.Schema({
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

  oldPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  currentPrice: {
    type: Number,
    required: true,
    min: 0,
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

  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  }
});

export const PurchaseModel = mongoose.model("Purchase", purchaseSchema);
