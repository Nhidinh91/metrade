import Product from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const query = req.query.query;
    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } }, //search for query in the product's name
        { description: { $regex: query, $options: "i" } }, //search for query in the product's description
        { keywords: { $regex: query, $options: "i" } }, //search for query in the product's keywords
      ],
    });
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching search results:", error.message);
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
