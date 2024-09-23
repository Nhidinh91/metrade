import express from "express";
import {addCartItem} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-card-item", addCartItem);

export default router;