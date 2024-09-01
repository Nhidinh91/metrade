import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: Schema.Types.ObjectId,
      auto: true,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    order_number: {
      type: String,
      required: true,
      unique: true,
    },
    total_item_quantity: {
      type: Number,
      required: true,
      min: 0, // Ensures the quantity is not negative
    },
    total_price: {
      type: Number,
      required: true,
      min: 0, // Ensures the price is not negative
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically add created_at and updated_at
  }
);

const Order = mongoose.model("Order", orderSchema);

export default Order;