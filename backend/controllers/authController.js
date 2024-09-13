import querystring from "querystring";
import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import { emailCheck } from "../utils/authUtils/mailValidation.js";
import { hashInput } from "../utils/authUtils/inputHashing.js";
import { sendConfirmationEmailService } from "../utils/authUtils/emailSender.js";
import {
  createToken,
  isValidVerifyToken,
} from "../utils/authUtils/tokenValidation.js";
import jwt from "jsonwebtoken";

const FE_GATE = 5173;
const FE_URL = `http://localhost:${FE_GATE}`;

export const register = async (req, res) => {
  try {
    //email and password
    const { name, email, password } = req.body;
    console.log(req.body);

    if (!name || !email || !password) {
      throw new Error(`Missing information`);
    }
    if (!emailCheck(email)) {
      throw new Error(`wrong email format`);
    } else {
      //check if the user with email exist
      const user = await User.findOne({ email });
      if (user) {
        throw new Error(`email ${email} is already used`);
      } else {
        // if not exist, create a new user , and a new cart with new user id
        const hashedPassword = await hashInput(password);
        const validation_token = await createToken(email);
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
          validation_token,
        });
        const newCart = await Cart.create({ user_id: newUser.id });
        // send confirmation email
        await sendConfirmationEmailService(email, validation_token.value);
        // return response to FE
        res.status(201).json({
          status: "success",
          data: {
            user: newUser,
            cart: newCart,
          },
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const getCheckVerify = async (req, res) => {
  try {
    const { token, email } = req.query;
    const user = await User.findOne({ email });
    if (!user) {
      // cach 1

      // const qsObj = {
      //   status: "fail",
      //   message: "user does not exist",
      // };
      // const qs = querystring.stringify(qsObj);
      // return res.redirect(FE_URL + `/verify-fail?${qs}`);

      res.status(404).json({
        status: "fail",
        message: "an account with this email does not exist",
      });
    }
    if (user.is_verified) {
      // return res.redirect(FE_URL + `/verify-success`);
      throw new Error("User is already verified");
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
      //if valid token redirect to home page
      // return res.redirect(FE_URL + "/verify-success");

      res.status(200).json({
        status: "success",
        data: {
          message: "Email verified successfully",
          updatedUser,
        },
      });
    } else {
      // const qsObj = {
      //   status: "fail",
      //   email,
      //   message: "Invalid Token",
      // };
      // const qs = querystring.stringify(qsObj);
      // return res.redirect(FE_URL + `/verify-fail?${qs}`);

      throw new Error(
        "Email verification failed, possibly the link is invalid or expired\nPlease request new verification link."
      );
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const postCheckVerify = async (req, res) => {
  try {
    const { token, email } = req.body;
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
      // cach 1

      // const qsObj = {
      //   status: "fail",
      //   message: "user does not exist",
      // };
      // const qs = querystring.stringify(qsObj);
      // return res.redirect(FE_URL + `/verify-fail?${qs}`);

      return res.status(404).json({
        status: "fail",
        message: "an account with this email does not exist",
      });
    }
    if (user.is_verified) {
      // return res.redirect(FE_URL + `/verify-success`);
      // throw new Error("User is already verified");
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
      //   //if valid token redirect to home page
      //   // return res.redirect(FE_URL + "/verify-success");

      return res.status(200).json({
        status: "success",
        data: {
          message: "Email verified successfully",
          updatedUser,
        },
      });
    } else {
      // const qsObj = {
      //   status: "fail",
      //   email,
      //   message: "Invalid Token",
      // };
      // const qs = querystring.stringify(qsObj);
      // return res.redirect(FE_URL + `/verify-fail?${qs}`);

      // throw new Error(
      //   "Email verification failed, possibly the link is invalid or expired\nPlease request new verification link."
      // );
      return res.status(404).json({
        status: "fail",
        message:
          "        Email verification failed, possibly the link is invalid or expired\nPlease request new verification link.",
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
      throw new Error(`Missing information`);
    }
    // check email format
    else if (!emailCheck(email)) {
      throw new Error(`wrong email format`);
    } else {
      //check if the user with email exist
      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({
          status: "fail",
          message:
            "an account with this email does not exist. Please register!",
        });
        //create token and update user to db and send email
      } else if (user.is_verified) {
        res.status(400).json({
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
        sendConfirmationEmailService(email, validation_token.value);
        res.status(201).json({
          status: "success",
          data: updatedUser,
        });
      }
    }
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message:
        "Cannot send resend email. Please wait a for 10 minutes and try again",
    });
  }
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
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
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
