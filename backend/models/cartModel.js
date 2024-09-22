import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
      unique: true

    },
    cart_item: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CartItem" // Reference to the CartItem model
      }
    ],
    total_item_quantity: {
      type: Number,
      required: true,
      min: 0,
      default: 0, // Default value is 0 when the cart is created
    },
    total_price: {
      type: Number,
      required: true,
      min: 0, // Ensures the price is not negative
      default: 0, // Default value is 0 when the cart is created
    },
    is_active: {
      type: Boolean,
      default: true, // Indicates whether the cart is active
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" }, // Automatically add created_at and updated_at
  }
);

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;
