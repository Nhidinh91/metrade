import User from "../models/userModel.js";

// export const register = async (req, res) => {
export const register = (req, res) => {
  console.log(req.body);
  res.status(500).json({
    status: "error",
    message: "This route is not yet defined",
  });
};

export const login = async (req, res) => {};
