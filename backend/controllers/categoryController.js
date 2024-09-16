import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ is_active: true }).exec();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}