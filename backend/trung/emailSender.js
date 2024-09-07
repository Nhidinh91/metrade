import nodemailer from "nodemailer";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

// process.env.MONGO_URI
export const sendConfirmationEmailService = async (email) => {
  console.log("Start sending email");
  const transport = nodemailer.createTransport({
    service: "gmail",
    // service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  const jwtToken = jwt.sign(
    {
      email,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_VERIFICATION_EXPIRES_IN,
    }
  );
  // console.log(jwtToken);
  let mailConfigurations = await transport.sendMail({
    from: `Metrade <${process.env.EMAIL_USERNAME}`,
    to: `${email}`,
    subject: "Email Verification",
    text: `Hi! There, You have recently visited 
           our website and entered your email.
           Please follow the given link to verify your email
           http://localhost:3000/api/auth/verify/?token=${jwtToken}&email=${email}\n 
           Thanks`,
  });
  transport.sendMail(mailConfigurations, (err, info) => {
    if (err) {
      throw new Error("Unable to send email");
    }
    console.log("Email SENT Successfully");
    // console.log(info);
  });
};
