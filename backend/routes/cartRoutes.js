import express from "express";
import {addCartItem, getCartItem} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-cart-item", addCartItem);
router.post("/get-cart-item", getCartItem)

export default router;