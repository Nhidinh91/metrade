import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import { emailCheck } from "../trung/mailValidation.js";
import { hashPassword } from "../trung/passwordHashing.js";
import { sendConfirmationEmailService } from "../trung/emailSender.js";
import { verifyUser } from "../trung/userVerfication.js";

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

        sendConfirmationEmailService(email);
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
    const { token } = req.params;
    const email = jwtDecode(token).email;
    // {
    //   email: 'viettrung.doan@metropolia.fi',
    //   iat: 1725664371,
    //   exp: 1725664491
    // }
    console.log(decodedToken.email);

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        throw new Error(
          "Email verification failed, possibly the link is invalid or expired"
        );
      } else {
        // const updateUser = await verifyUser(email);
        res.status(200).json({
          status: "success",
          data: {
            message: "Email verified successfully",
            decoded,
          },
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: err.message,
    });
  }
};

export const login = async (req, res) => {};
