import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

//Get all categories in database
export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ is_active: true }).exec();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

//Get categories with hierarchy from main -> sub -> sub-sub
export const categoryHierarchy = async (req, res) => {
  try {
    const mainCategories = await Category.find({ parent_id: null }).exec();
    console.log(mainCategories);

    // Check if main categories exist
    if (!mainCategories || mainCategories.length === 0) {
      return res.status(404).json({ message: "No main categories found" });
    }

    // Populate children for each main category
    const populatedCategories = await Promise.all(
      mainCategories.map(async (mainCategory) => {
        const { _id, name, children } = mainCategory;
        console.log("subCategories: ", children); //list of subCategories

        let childrenDocs = [];
        if (children && children.length > 0) {
          childrenDocs = await Category.find({ _id: { $in: children } })
            .populate({ path: "children", select: "name _id" })
            .exec();
        }
        // Return the main category with populated children
        return {
          _id,
          name,
          children: childrenDocs,
        };
      })
    );
    // Send the populated main categories
    res.status(200).json(populatedCategories);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

