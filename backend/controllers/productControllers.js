import Product from "../models/productModel.js";
import mongoose from "mongoose";


export const getProductsByCategory = async (req, res) => {
  const chosenCategory = req.params.categoryId;

  try {
    const products = await Product.find({ category_id: chosenCategory });

    if (products.length > 0) {
      res.status(200).json(products);
    } else {
      console.log("No products found");
      res.status(404).json({ message: "No products found" });
    }
  } catch (error) {
    console.log(error);
    // Handle any server errors
    res.status(500).json({ message: "Internal server error" });
  }
};
