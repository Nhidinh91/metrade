import mongoose from "mongoose";
import Product from "../models/productModel.js";

export const productDetail = async (req, res) => {
  const id = req.params.id;
  //if lack of id
  if (!id) {
    return res.status(400).json({
      success: false,
      message: "Missed product id",
    });
  }
  //check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid product id format",
    });
  };

  try {
    const product = await Product.findById(id);

    //if no product found
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    //if found product successfully
    res.status(200).json({
      success: true,
      message: "Product found",
      product: { ...product._doc },
    });
  } catch (error) {
    console.log(error);
    //Handle any server errors
    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
      const products = await Product.find({});
      res.status(200).json(products);
  } catch (error) {
      console.error("Error fetching products:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
      const query = req.query.query;
      const products = await Product.find({ keywords: { $regex: query, $options: 'i' } }); //search for products with keywords matching the search query, case insensutive
      res.status(200).json(products);
  } catch (error) {
      console.error("Error fetching search results:", error.message);
      res.status(500).json({ message: "Internal server error", error: error.message });
  }
};
