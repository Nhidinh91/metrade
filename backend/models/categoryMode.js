import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    parent_id: {
      type: Schema.Types.ObjectId,
      ref: "Category", // Reference to the parent category
      default: null,
    },
    ancestors: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category", // References to all ancestor categories
      },
    ],
    children: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category", // References to direct child categories
      },
    ],
    is_active: {
      type: Boolean,
      default: true, // Indicates whether the category is active
    },
    keywords: {
      type: [String], // Array of keywords associated with the category
      default: [], // Default to an empty array
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically add created_at and updated_at
  }
);
const Category = mongoose.model("Category", categorySchema);

export default Category;