import express from "express";
import {
  login,
  register,
  checkVerify,
  resendEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/register").post(register); // register
router.route("/register/verify").post(checkVerify);
router.route("/register/resend").post(resendEmail);

// resendEmailRoute

router.post("/login", login);

export default router;
