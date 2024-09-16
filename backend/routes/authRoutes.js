import express from "express";
import {
  login,
  register,
  checkVerify,
  resendEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/register/verify", checkVerify);
router.post("/resend-verification-email", resendEmail);
router.post("/login", login);

export default router;
