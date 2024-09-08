import User from "../models/userModel.js";
import Cart from "../models/cartModel.js";
import { emailCheck } from "../utils/authUtils/mailValidation.js";
import { hashInput } from "../utils/authUtils/inputHashing.js";
import { sendConfirmationEmailService } from "../utils/authUtils/emailSender.js";
import { isValidVerifyToken } from "../utils/authUtils/tokenValidation.js";

export const register = async (req, res) => {
  try {
    //email and password
    const { name, email, password } = req.body;
    if (!emailCheck(email)) {
      throw new Error("Invalid Email Format, should be Metropolia Email");
    } else {
      //check if the user with email exist
      const user = await User.findUserByEmail(email);

      if (user) {
        throw new Error(`email ${email} is already used`);
      } else {
        // if not exist, create a new user , and a new cart with new user id
        const hashedPassword = await hashInput(password);
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
    const user = await User.findUserByEmail(email);
    const validToken = await isValidVerifyToken(token, user);

    // test if someone has the obtain the link user's email and change to attacker's email
    // const fakeEmail = "trung@gmail.com";
    // if (isValidVerifyToken(token, fakeEmail)) {

    // invalid token, resend new email with new token
    // check if the user is already verified (in case user spaming verify email)

    if (!user) {
      throw new Error("Cannot found user. Please register!");
      
    } else if (user.isVerified) {
      throw new Error("User is already verified");

    } else if (validToken) {
      const updatedUser = await User.verifyUser(email);
      res.status(200).json({
        status: "success",
        data: {
          message: "Email verified successfully",
          updatedUser,
        },
      });
    } else {
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
