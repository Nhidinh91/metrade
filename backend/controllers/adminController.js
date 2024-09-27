import mongoose from "mongoose";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

///User management


///Product management

//create aggregation pipeline for fetching products sort by status then created_at
const createAggregationPipeline = (status, skip, limit) => {
  const matchStage = status ? { $match: { status } } : {};
  return [
    matchStage,
    {
      $addFields: {
        sortOrder: {
          $switch: {
            branches: [
              { case: { $eq: ["$status", "processing"] }, then: 1 },
              { case: { $eq: ["$status", "active"] }, then: 2 },
              { case: { $eq: ["$status", "sold"] }, then: 3 },
            ],
            default: 4,
          },
        },
      },
    },
    { $sort: { sortOrder: 1, created_at: -1 } },
    { $skip: skip },
    { $limit: limit },
  ].filter((stage) => Object.keys(stage).length > 0); // Remove empty match stage if no status filter
};

// Get all products with optional status filter
export const adminGetAllProducts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
    const limit = 8; // Get the limit from the query parameter
    const status = req.query.status || null; // Get the status filter from the query parameter

    // Validate page and limit
    if (page < 1) {
      return res.status(400).json({ message: "Invalid page" });
    }

    const skip = (page - 1) * limit; // Calculate how many products to skip
    const totalProducts = await Product.countDocuments(
      status ? { status } : {}
    ); // Get the total count of products based on status

    // Fetch and sort products using aggregation
    const products = await Product.aggregate(
      createAggregationPipeline(status, skip, limit)
    );

    // If no products found
    if (products.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    // Send both products and total count in the response
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

// Get counts for each status
export const adminGetProductCounts = async (req, res) => {
  try {
    const activeCount = await Product.countDocuments({ status: "active" });
    const processingCount = await Product.countDocuments({
      status: "processing",
    });
    const soldCount = await Product.countDocuments({ status: "sold" });

    res.status(200).json({
      activeCount,
      processingCount,
      soldCount,
    });
  } catch (error) {
    console.error("Error fetching product counts:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

// Activate a product
export const activateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product Id",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.status !== "processing") {
      return res
        .status(400)
        .json({
          message: "Only products with 'processing' status can be activated",
        });
    }

    product.status = "active";
    await product.save();

    res
      .status(200)
      .json({ message: "Product activated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "Failed to activate product", error: error.message });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if the ID is valid
    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Product Id",
      });
    }

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Product.findByIdAndDelete(id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete product", error: error.message });
  }
};


///Order management