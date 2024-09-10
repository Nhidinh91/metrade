import express from "express";
import {
  login,
  register,
  checkVerify,
  resendEmail,
} from "../controllers/authController.js";

const router = express.Router();

router.route("/").post(register);
router.route("/register").post(register); // register
// router.route("/verify").get(success).get(fail);
router.route("/register/verify").get(checkVerify); // verifychecking
router.route("/register/resend").post(resendEmail);

// resendEmailRoute

router.post("/login", login);

export default router;
