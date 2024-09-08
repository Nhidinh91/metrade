import express from "express";
import { login, register, verifyToken } from "../controllers/authController.js";

const router = express.Router();

router.route("/").post(register);
router.route("/register").post(register);
// router.route("/verify").get(success).get(fail);
router.route("/verify/").get(verifyToken);

router.post("/login", login);

export default router;
