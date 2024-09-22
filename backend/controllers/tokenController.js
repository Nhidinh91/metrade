import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/token/jwtToken.js";

export const getAccessToken = async (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ success: false, message: "No refresh token provided" });
  }
  // Verify the refresh token
  jwt.verify(refreshToken, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(401).json({ success: false, message: "Invalid or expired refresh token" });
    }
    const { id: userId } = decoded;
    const newAcessToken = generateAccessToken(userId);
    const expirationTime = Date.now() + 15 * 60 * 1000;
    res.cookie("accessToken", newAcessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      path: "/api",
      maxAge: process.env.JWT_ACCESS_EXPIRES_IN,
    });
    res.status(200).json({
      success: true,
      message: 'New access token generated',
      token_expired_at: expirationTime
     });
  });
};
