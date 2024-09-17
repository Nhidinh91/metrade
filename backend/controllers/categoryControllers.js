import mongoose from "mongoose";
import Category from "../models/categoryModel.js";

export const categoryHierarchy = async (req, res) => {
    try {
      const mainCategories = await Category.find({ parent_id: null }).exec();
      console.log(mainCategories);
      
      // Check if main categories exist
      if (!mainCategories || mainCategories.length === 0) {
        return res.status(404).json({ message: "No main categories found" });
      }

      // Populate children for each main category
      const populatedCategories = await Promise.all(mainCategories.map( async (mainCategory) => {
        const { _id, name, children } = mainCategory;
        console.log("subCategories: ", children); //list of subCategories
        // let populatedChildren = [];
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
            children: childrenDocs  
      };
    })
);       
      // Send the populated main categories
      res.status(200).json(populatedCategories);

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({ is_active: true }).exec();
        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const getMainCategories = async (req, res) => {
    try {
      const mainCategories = await Category.find({ parent_id: null }).exec();
      // Check if main categories exist
      if (!mainCategories || mainCategories.length === 0) {
        return res.status(404).json({ message: "No main categories found" });
      } else {}
        res.status(200).json(mainCategories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
}



export const getCategoryRelationships = async (req, res) => {
  const categoryId = req.params.categoryId;

  //check if id is provided
  if (!categoryId) {
    return res.status(400).json({ message: "Category ID is required" });
  }
  //check if id is a valid ObjectId
  if (!mongoose.Types.ObjectId.isValid(categoryId)) {
    return res.status(400).json({ message: "Invalid category ID" });
  }

  try {
      const category = await Category.findById(categoryId)
        // .populate("children")
        .populate({
            path: "children",
            select: "name _id",
            populate: [
            {
                path: "children", 
                select: "name _id",
            },
            ],
        })
        .exec();
      
        if (!category) {
            return res.status(404).json({ message: "Category not found" });
        } else {
            console.log(category);
            return res.status(200).json(category);
        }
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
};