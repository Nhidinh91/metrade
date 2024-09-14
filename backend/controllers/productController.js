import Product from "../models/productModel.js";

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
    const products = await Product.find({})
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
      $or: [
        { name: { $regex: query, $options: "i" } }, //search for query in the product's name
        { description: { $regex: query, $options: "i" } }, //search for query in the product's description
        { keywords: { $regex: query, $options: "i" } }, //search for query in the product's keywords
      ],
    })

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
