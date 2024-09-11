import User from "../models/userModel.js";

export const profile = async (req, res) => {
    res.status(200).json({ success: true, message: "User profile", user: { "name": "John Doe" } });
};