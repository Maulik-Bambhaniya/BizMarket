import mongoose, { Schema } from "mongoose";

const businessSchema = new Schema(
  {
    businessName: {
      type: String,
      required: true,
    },
    businessOwner: {
      type: String,
      required: true,
    },
    businessDescription: {
      type: String,
    },
    businessEmail: {
      type: String,
      required: true,
    },
    businessWebsite: {
      type: String,
    },
    type: {
      type: String,
      required: true,
    },
    rating: {  // New rating Field
      type: Number,
      default: 0,   // Default value
      min: 0,      // Minimum is 0
      max: 5      // Maximum is 5
    },
  },
  { timestamps: true }
);

export const Business = mongoose.model("Business", businessSchema);
