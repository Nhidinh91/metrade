import mongoose from "mongoose";
import Cart from "../models/cartModel.js";
import CartItem from "../models/cartItemModel.js";

//ADD PRODUCT TO CART
export const addCartItem = async (req, res) => {
  const product = req.body.product;
  const addingQuantity = req.body.adding_quantity;

  if (!product || !mongoose.Types.ObjectId.isValid(product._id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Product Id",
    });
  }

  if (!addingQuantity || addingQuantity <= 0) {
    return res.status(400).json({
      success: false,
      message: "Invalid adding quantity",
    });
  }

  const userId = req.user.id;
  // Find or create a new cart for the user
  let cart = await Cart.findOne({ user_id: userId }).populate({
    path: "cart_items",
  });

  //If no cart exists, create a new one
  if (!cart) {
    cart = await Cart.create({ user_id: userId });

    if (!cart) {
      return res.status(500).json({
        success: false,
        message: "Fail to create new cart",
      });
    }
  }

  //If there is a cart with this user_id

  let cartItem = cart.cart_items.find((item) =>
    item.product_id.equals(product._id)
  );

  // if the product is already in the cart, adding quantity
  if (cartItem) {    
    if (addingQuantity <= cartItem.limit_quantity) {
      const newQuantity = cartItem.adding_quantity + addingQuantity;
      const updatedCartItem = await CartItem.findByIdAndUpdate(
        cartItem._id,
        {
          adding_quantity: newQuantity,
          limit_quantity: cartItem.limit_quantity - addingQuantity,
          sub_total: newQuantity * product.price,
        },
        { new: true }
      );

      if (updatedCartItem) {
        return res.status(200).json({
          success: true,
          message: "Add product to cart successfully",
          limit_quantity: updatedCartItem.limit_quantity,
        });
      } else {
        return res.status(500).json({
          success: false,
          message: "Failed to add product to cart",
        });
      }
    } else {
      return res.status(400).json({
        success: false,
        message: "Adding number exceeds limit quantity",
      });
    }
  }

  // if the product is not included in the cart, create new cart item
  if (!cartItem) {
    cartItem = await CartItem.create({
      cart_id: cart._id,
      product_id: product._id,
      adding_quantity: addingQuantity,
      limit_quantity: product.stock_quantity - addingQuantity,
      sub_total: addingQuantity * product.price,
    });

    if (!cartItem) {
      return res.status(500).json({
        success: false,
        message: "Fail to add to cart",
      });
    }

    cart.cart_items.push(cartItem._id);
    const updatedCart = await Cart.findByIdAndUpdate(
      cart._id,
      { cart_items: cart.cart_items },
      { new: true }
    );

    if (!updatedCart) {
      return res.status(500).json({
        success: false,
        message: "Fail to update cart with new cart item",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Add product to cart successfully",
      limit_quantity: cartItem.limit_quantity,
    });
  }
};

// GET CART ITEM INFO
export const getCartItem = async (req, res) => {
  const userId = req.user.id;
  const productId = req.body.product_id;

  //if no valid productId
  if (!productId || !mongoose.Types.ObjectId.isValid(productId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid request",
    });
  }
  try {
    //find Cart info with userId
    const cart = await Cart.findOne({ user_id: userId }).populate({
      path: "cart_items",
    });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "No valid cart",
      });
    }
    //check if there is any cart item that has productId
    if (cart) {
      const cartItem = cart.cart_items.find((item) =>
        item.product_id.equals(productId)
      );
      if (cartItem) {
        return res.status(200).json({
          success: true,
          message: "Get cart item info successfully",
          cartItem: cartItem,
        });
      }
      return res.status(404).json({
        success: false,
        message: "No valid cart item",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

//GET CART AND ALL OF CART ITEM INCLUDED
export const getCartDetail = async (req, res) => {
  const userId = req.user.id;
  try {
    const cartDetail = await Cart.findOne({ user_id: userId })
    .populate({
      path: "cart_items",
      populate: {
        path: "product_id",
        select: "name image pickup_point price"
      }
    });
    if (cartDetail) {
      return res.status(200).json({
        success: true,
        message: "Get cart item info successfully",
        cart_detail: cartDetail,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Fail to get cart item",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
