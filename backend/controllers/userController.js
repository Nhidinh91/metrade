import mongoose from "mongoose";
import User from "../models/userModel.js";
import bcrypt from "bcrypt";

// Profile fetching function
export const profile = async (req, res) => {
  const id = req.params.id;

  // Check if the ID is valid
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User Id",
    });
  }

  try {
    const userInfo = await User.findById(id, "first_name last_name photo_url phone email");

    if (!userInfo) {
      return res.status(404).json({
        success: false,
        message: "User Information not found",
      });
    }

    const userObject = userInfo.toObject();
    res.status(200).json({
      success: true,
      message: "User Info found",
      user: { ...userObject },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Profile updating function
export const updateProfile = async (req, res) => {
  const id = req.params.id;
  const { first_name, last_name, phone, currentPassword, newPassword } = req.body;

  // Check if the ID is valid
  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid User Id",
    });
  }

  try {
    // Fetch the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // If the user is changing the password
    if (currentPassword && newPassword) {
      const isPasswordCorrect = await bcrypt.compare(currentPassword, user.password);

      if (!isPasswordCorrect) {
        return res.status(401).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Hash the new password
      user.password = await bcrypt.hash(newPassword);
    }

    // Update other fields
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (phone) user.phone = phone;

    // Save the updated user profile
    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
