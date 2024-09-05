import express from "express";
import { login, register } from "../controllers/authController.js";

const router = express.Router();
console.log(router);
router.route("/").post(register);
router.route("/register").post(register);
// router.post("/register", register);
router.post("/login", login);

export default router;
