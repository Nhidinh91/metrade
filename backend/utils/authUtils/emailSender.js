import nodemailer from "nodemailer";
import dotenv from "dotenv";
import User from "../../models/userModel.js";
import { hashInput } from "./inputHashing.js";

dotenv.config();

const convertToDateTimeStr = (string) => {
  switch (string.toLowerCase()) {
    case "s":
      return "second";
    case "m":
      return "minute";
    case "h":
      return "hour";
    case "d":
      return "day";
  }
};

const convertToFullDateTimeStr = (expStr) => {
  const time_str = convertToDateTimeStr(expStr[expStr.length - 1]);
  const num_str = expStr.slice(0, 2);
  const num = Number(num_str);
  return num > 1 ? `${num_str} ${time_str}s` : `${num_str} ${time_str}`;
};

export const sendConfirmationEmailService = async (email) => {
  console.log("Start sending email");
  const exp_time_str = process.env.VERIFICATION_EXPIRES_IN;
  const transport = nodemailer.createTransport({
    service: "gmail",
    // service: "smtp.gmail.com", // to prepare a smtp server, working on trollio
    port: 25, //25, 465
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const verifyToken = await hashInput(email);
  await User.saveTokenToUserWithEmail(email, verifyToken);
  const timeStr = convertToFullDateTimeStr(exp_time_str);

  let mailConfigurations = await transport.sendMail({
    from: `Metrade <${process.env.EMAIL_USERNAME}`,
    to: `${email}`,
    subject: "Email Verification",
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:3000/api/auth/verify/?token=${verifyToken}&email=${email}\n.
           
           The link will expire after ${timeStr}
           Thanks`,
  });
  transport.sendMail(mailConfigurations, (err, info) => {
    if (err) {
      throw new Error("Unable to send email");
    }
    console.log("Email SENT Successfully");
  });
};
