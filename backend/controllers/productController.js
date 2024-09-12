import Product from '../models/productModel.js';

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