import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import { emailCheck } from "../trung/mailValidation.js";
import { hashPassword } from "../trung/passwordHashing.js";
import { sendConfirmationEmailService } from "../trung/emailSender.js";
import { verifyUser } from "../trung/userVerfication.js";
import { isValidJwtToken } from "../trung/jwtTokenDecode";


import { jwtDecode } from "jwt-decode";

export const register = async (req, res) => {
  try {
    //email and password
    const { name, email, password } = req.body;
    if (!emailCheck(email)) {
      throw new Error("Invalid Email Format, should be Metropolia Email");
    } else {
      //check if the user with email exist
      const user = await User.findOne({ email });
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
        
        // send confirmation email
        await sendConfirmationEmailService(email);
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

export const verifyToken = async (req, res) => {
  try {
    const { token, email } = req.query;
    const decodedToken = jwtDecode(token);
    const checkEmail = decodedToken.email;
    
    // test if someone has the obtain the link user's email and change to attacker's email
    // const fakeEmail = "trung@gmail.com";
    // if (isValidJwtToken(token, fakeEmail)) {
    
    // check token
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
      // invalid token, resend new email with new token
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
