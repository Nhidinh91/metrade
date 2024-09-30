import mongoose from "mongoose";
import Product from "../models/productModel.js";
import User from "../models/userModel.js";
import Order from "../models/orderModel.js";

///User management
// Define user management's initial query conditions
const queryConditions = {
  role: { $ne: "admin" }
};

// Get users based on the query parameters
export const getAllUsers = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Get the page number from the query parameter
    const limit = 8; // Set the limit for each page

    // Validate page and limit
    if (page < 1) {
      return res.status(400).json({ message: "Invalid page" });
    }

    const skip = (page - 1) * limit; // Calculate how many products to skip

    // Get status and search from query parameters
    const { status, search } = req.query;

    // Define the query conditions if given
    const updateQueryConditions = {
        ...queryConditions,
      ...(status ? { status } : {}),
      ...(search ? { email: { $regex: new RegExp(search, "i") } } : {})
    };

    let users = await User.find(updateQueryConditions)
      .sort({ createdAt: -1, status: 1 })
      .select("email role status")
      .skip(skip)
      .limit(limit);

    const totalUsersDisplay = await User.countDocuments(updateQueryConditions);

    res.json({
      users,
      totalUsersDisplay
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getAllUserCount = async (req, res) => {
    try {
        const allUsersCount = await User.countDocuments(queryConditions);
    
        const activeUserCount = await User.countDocuments({
        ...queryConditions,
        status: "active",
        });
        const bannedUserCount = await User.countDocuments({
        ...queryConditions,
        status: "banned",
        });
        const deletedUserCount = await User.countDocuments({
        ...queryConditions,
        status: "deleted",
        });
        res.json({
          allUsersCount,
          activeUserCount,
          bannedUserCount,
          deletedUserCount,
        });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

export const updateUserStatus = async (req, res) => {
    try {
        const { id } = req.params;
        const { status } = req.body;
    
        if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ message: "User not found" });
        }
    
        const user = await User.findById(id);
    
        if (!user) {
        return res.status(404).json({ message: "User not found" });
        }
        // Admin cannot change the status of banned user
        if (user.status !== "deleted") {
            user.status = status;
            await user.save();
        } else {
            return res.status(400).json({ message: "Cannot change status of deleted user" });
        }
    
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


///Product management


///Order management