import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import { emailCheck } from "../utils/authUtils/emailValidation.js";
import { hashInput } from "../utils/authUtils/inputHashing.js";
import { sendConfirmationEmailService } from "../utils/authUtils/emailSender.js";
import {
  createToken,
  isValidVerifyToken,
} from "../utils/authUtils/tokenValidation.js";
import jwt from "jsonwebtoken";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../utils/token/jwtToken.js";

export const register = async (req, res) => {
  try {
    //email and password
    const { first_name, last_name, email, password } = req.body;

    if (!first_name || !last_name || !email || !password) {
      return res.status(400).json({
        status: "fail",
        message: `Missing information`,
      });
    }
    if (!emailCheck(email)) {
      return res.status(400).json({
        status: "fail",
        message: `Invalid email format`,
      });
    } else {
      //check if the user with email exist
      const user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({
          status: "fail",
          message: `The email ${email} is already used`,
        });
      } else {
        // if not exist, create a new user , and a new cart with new user id
        const hashedPassword = await hashInput(password);
        const validation_token = await createToken(email);

        await sendConfirmationEmailService(
          first_name,
          email,
          validation_token.value
        );
        const newUser = await User.create({
          first_name,
          last_name,
          email,
          password: hashedPassword,
          validation_token,
        });
        const newCart = await Cart.create({ user_id: newUser.id });

        // send confirmation email
        // return response to FE
        return res.status(201).json({
          status: "success",
          data: {
            user: newUser,
            cart: newCart,
          },
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message: "Cannot Register. Please try again later",
    });
  }
};

export const checkVerify = async (req, res) => {
  try {
    const { token, email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "an account with this email does not exist",
      });
    }

    if (user.is_verified) {
      return res.status(400).json({
        status: "fail",
        message: "User is already verified",
      });
    }

    const validToken = await isValidVerifyToken(token, user);
    if (validToken) {
      const updatedUser = await User.findOneAndUpdate(
        { email },
        {
          $set: {
            is_verified: true,
            validation_token: {
              value: "",
              expired_at: user.validation_token.expired_at,
            },
          },
        },
        { returnDocument: "after" }
      );

      return res.status(200).json({
        status: "success",
        data: {
          message: "Email verified successfully",
          updatedUser,
        },
      });
    } else {
      return res.status(404).json({
        status: "fail",
        message:
          "Email verification failed, possibly the link is invalid or expired\nPlease request new verification link.",
      });
    }
  } catch (err) {
    return res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const resendEmail = async (req, res) => {
  const { email } = req.body;
  try {
    //check contain email in res
    if (!email) {
      return res.status(400).json({
        status: "fail",
        message: "Email is missing",
      });
    }
    // check email format
    else if (!emailCheck(email)) {
      return res.status(400).json({
        status: "fail",
        message: "wrong email format",
      });
    } else {
      //check if the user with email exist
      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({
          status: "fail",
          message:
            "an account with this email does not exist. Please register!",
        });

        //create token and update user to db and send email
      } else if (user.is_verified) {
        return res.status(400).json({
          status: "fail",
          message: "user is already verified",
        });
      } else {
        const validation_token = await createToken(email);
        const updatedUser = await User.findOneAndUpdate(
          { email },
          {
            $set: { validation_token },
          },
          { returnDocument: "after" }
        );

        sendConfirmationEmailService(
          user.first_name,
          email,
          validation_token.value
        );

        return res.status(201).json({
          status: "success",
          data: updatedUser,
        });
      }
    }
  } catch (err) {
    return res.status(500).json({
      status: "fail",
      message:
        "Cannot send resend email. Please wait a for 10 minutes and try again",
    });
  }
};

//Login controller
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
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    // If email and password are correct, send res with token

    //generate refreshToken and store in cookies and database
    const newRefreshToken = generateRefreshToken(user._id);
    const savedToken = await User.findByIdAndUpdate(user._id, {
      refresh_token: newRefreshToken,
    });
    if (!savedToken) {
      return res
        .status(400)
        .json({ success: false, message: "User not found" });
    }
    res.cookie("refreshToken", newRefreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: "/api/get-access-token",
      maxAge: process.env.JWT_REFRESH_EXPIRES_IN.slice(0, -1) * 24 * 3600 * 1000,
    });

    //generate accessToken and store in cookies
    const newAccessToken = generateAccessToken(user._id);
    const expirationTime = Date.now() + 15 * 60 * 1000;

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      path: "/",
      maxAge: process.env.JWT_ACCESS_EXPIRES_IN.slice(0, -1) * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        role: user.role,
        photo_url: user.photo_url,
        is_verified: user.is_verified,
        phone: user.phone,
        balance: user.balance,
        token_expired_at: expirationTime,
      },
    });
  } catch (error) {
    console.log(error);
    // Handle any server errors
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

//Logout action
export const logout = async (req, res) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
  // Verify the refresh token
  jwt.verify(accessToken, process.env.JWT_SECRET, async (error, decoded) => {
    if (error) {
      return res.status(401).json({ success: false, message: "Invalid token" });
    }
    const { id: userId } = decoded;
    try {
      // Clear the refresh token in the database
      const deletedToken = await User.findByIdAndUpdate(userId, {
        refresh_token: "",
      });

      if (deletedToken) {
        // Clear the refresh token from the cookie
        res.clearCookie("refreshToken", {
          httpOnly: true,
          secure: true,
        });

        return res
          .status(200)
          .json({ success: true, message: "Logout successfully" });
      } else {
        return res
          .status(500)
          .json({ success: false, message: "Error during logout" });
      }
    } catch (err) {
      return res.status(500).json({ success: false, message: "Server error" });
    }
  });
};
