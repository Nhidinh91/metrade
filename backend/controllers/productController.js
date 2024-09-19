import mongoose from "mongoose";
import Product from "../models/productModel.js";
import Category from "../models/categoryModel.js";

//Get all products
export const getAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; //get the page number from the query parameter
    const limit = parseInt(req.query.limit) || 8; //get the limit from the query parameter

    // Validate page and limit
    if (page < 1 || limit < 1) {
      return res
        .status(400)
        .json({ message: "Invalid page or limit parameter" });
    }

    const skip = (page - 1) * limit; //calculate how many products to skip
    const totalProducts = await Product.countDocuments(); //get the total count of products
    const products = await Product.find({ status: "active" })
      .sort({ created_at: 1 })
      .skip(skip)
      .limit(limit); //sort by created at time then skip and limit products based on the query

    //if no products found
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }
    //send both products and total count in the response
    res.status(200).json({
      products,
      totalProducts,
    });
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Search for products based on query
export const searchProducts = async (req, res) => {
  try {
    const { query } = req.query; //get the "query" parameter from the request
    const products = await Product.find({
      $and: [
        { status: "active" },
        {
          $or: [
            { name: { $regex: query, $options: "i" } }, //search for query in the product's name
            { description: { $regex: query, $options: "i" } }, //search for query in the product's description
            { keywords: { $regex: query, $options: "i" } }, //search for query in the product's keywords
          ],
        },
      ],
    });

    //if no products found
    if (products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found matching the query" });
    }

    //send both results and total count in the response
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching search results");
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

//Get product detail by Id
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
  }

  try {
    //find product from product collection
    const product = await Product.findById(id).populate({
      path: "category_id",
      populate: {
        path: "ancestors",
        select: "name",
      },
    });
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

//Get products by category
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

// Upload a new product
export const uploadProduct = async (req, res) => {
  const {
    user_id,
    name,
    image,
    photos,
    description,
    price,
    pickup_point,
    category_id,
    keywords,
    stock_quantity,
  } = req.body;

  // Convert user_id and category_id to strings if they are objects
  const userId = typeof user_id === 'object' ? user_id.$oid : user_id;
  const categoryId = typeof category_id === 'object' ? category_id.$oid : category_id;

  // Check if the User ID and Category ID are valid ObjectId strings
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User Id",
    });
  }

  if (!categoryId || !mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({
      success: false,
      message: "Invalid Category Id",
    });
  }

  try {
    const newProduct = await Product.create({
      user_id: userId,
      name,
      image,
      photos,
      description,
      price,
      pickup_point,
      category_id: categoryId,
      keywords,
      stock_quantity,
      status: "processing",
    });

    res.status(201).json({
      success: true,
      message: "Product uploaded successfully",
      product: newProduct,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error uploading product",
      error: error.message,
    });
  }
};
