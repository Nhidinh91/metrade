import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import { emailCheck } from "../trung/mailValidation.js";
import { hashPassword } from "../trung/passwordHashing.js";
import { sendConfirmationEmailService } from "../trung/emailSender.js";
import { verifyUser } from "../trung/userVerfication.js";
import { verifyJwtToken } from "../trung/jwtPromise.js";
import { isValidJwtToken } from "../trung/jwtTokenDecode";

import jwt from "jsonwebtoken";
import { jwtDecode } from "jwt-decode";

export const register = async (req, res) => {
  try {
    //email and password
    const { name, email, password } = req.body;
    if (!emailCheck(email)) {
      console.log("is it here");
      throw new Error("Invalid Email Format, should be Metropolia Email");
    } else {
      //check if the user with email exist
      const user = await User.findOne({ email });
      // console.log(user);
      if (user) {
        throw new Error(`email ${email} is already used`);
      } else {
        // if not exist, create a new user , and a new cart with new user id
        const hashedPassword = await hashPassword(password);
        const newUser = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        const newCart = await Cart.create({ user_id: newUser.id });

        await sendConfirmationEmailService(email);
        // send confirmation email
        // console.log(newCart);
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

export const verifyToken = async (req, res) => {
  try {
    // const { token } = req.params;
    const { token, email } = req.query;
    // console.log(req.query);
    const fakeEmail = "trung@gmail.com";
    const decodedToken = jwtDecode(token);
    // console.log(decodedToken);
    const checkEmail = decodedToken.email;
    // console.log(isValidJwtToken(token, email));

    // if (isValidJwtToken(token, fakeEmail)) {
    if (isValidJwtToken(token, email)) {
      const updatedUser = await verifyUser(email);
      res.status(200).json({
        status: "success",
        data: {
          message: "Email verified successfully",
          updatedUser,
        },
      });
    } else {
      console.log("Invalid Request. Resending new Email");
      await sendConfirmationEmailService(email);
      throw new Error(
        "Email verification failed, possibly the link is invalid or expired\nNew verification link is sent."
      );
    }

  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {};
