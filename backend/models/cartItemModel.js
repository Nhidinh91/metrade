import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cart_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart", // Reference to the Cart model
      required: true,
    },
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true,
    },
    product_name: {
      type: String,
      required: true,
      trim: true,
    },
    image: {
      type: String, // URL to the product image
      required: true,
    },
    shop_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop", // Reference to the Shop model
      required: true,
    },
    adding_quantity: {
      type: Number,
      required: true,
      min: 0, // Ensures the quantity is not negative
    },
    price: {
      type: Number,
      required: true,
      min: 0, // Ensures the price is not negative
    },
    pickup_point: {
      type: String,
      required: true, // The location where the product will be picked up
      trim: true,
    },
    sub_total: {
      type: Number,
      required: true,
      min: 0, // Calculated as adding_quantity * price
    },
    status: {
      type: String,
      enum: ["active", "deactive"],
      default: "active",
    },
    deleted_at: {
      type: Date,
      default: null, // Will be set to the deletion time when the item is "soft deleted"
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically add created_at and updated_at
  }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);

export default CartItem;
