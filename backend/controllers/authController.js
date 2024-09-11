import User from "../models/userModel.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {

};

export const login = async (req, res) => {
  const { email, password } = req.body;

  // If email and password are not included
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password must be included" });
  }

  try {
    const user = await User.findOne({ email: email });

    // If invalid email or password
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }
    // If email and password are correct, send res with token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: { ...user._doc, password: undefined, token },
    });
  } catch (error) {
    console.log(error);
    // Handle any server errors
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
