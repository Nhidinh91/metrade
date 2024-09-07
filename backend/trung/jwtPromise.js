import jwt from "jsonwebtoken";
// import { sendConfirmationEmailService } from "./emailSender";
// sendConfirmationEmailService;

export const verifyJwtToken = (token, secret, email) => {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        // sendConfirmationEmailService(email);
        // console.log("Sending new verification email");
        reject(
          new Error(
            "Email verification failed, possibly the link is invalid or expired\nNew verification link is sent."
          )
        );
      } else {
        resolve(decoded);
      }
    });
  });
};
