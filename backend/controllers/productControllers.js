import Product from "../models/productModel.js";
import mongoose from "mongoose";
import { ObjectId } from "mongodb";
import Category from "../models/categoryModel.js";

//Get all products that have the same category_id
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

//Get all products belongs to Main Category
export const getProductsByCategoryV1 = async (req, res) => {
  // handle when categoryId is not of Object Type
  let chosenCategoryId;
  try {
    chosenCategoryId = new mongoose.Types.ObjectId(req.params.categoryId);
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: "invalid category id",
    });
  }
  // console.log("id ", chosenCategoryId);
  try {
    const categoryObj = await Category.aggregate([
      //find the category matched the id in urlquery
      { $match: { _id: chosenCategoryId } },
      // create a array called catGraph ( or category hierarchy), which contain all the categories
      // which are the subcategories of this categories and the sub-subcategories of the subcategories
      {
        $graphLookup: {
          from: "categories",
          startWith: "$_id",
          connectFromField: "_id",
          connectToField: "parent_id",
          as: "categoryHierarchy",
        },
      },
    ]);

    if (categoryObj.length === 0) {
      return res.status(404).json({
        status: "fail",
        message: "this category does not exist",
      });
    }
    //extract the _id of each element inside the catGraph array + the input _id
    //and put into the array called categoriesIdList
    // find the products based on this list $in
    // console.log(categories[0].categoryHierarchy);
    console.log("object array", categoryObj);
    // const categoryHierarchy = categoryObj[0].categoryHierarchy;
    const categoryIds = categoryObj[0].categoryHierarchy.map(
      (category) => category._id
    );
    // categoryIds.push(chosenCategoryId);
    console.log("category id", categoryIds);
    const products = await Product.find({
      category_id: { $in: categoryIds },
    });

    res.status(200).json({
      status: "success",
      count: products.length,
      data: {
        products,
        categoryObj,
      },
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: "Interal server error",
    });
  }
};
