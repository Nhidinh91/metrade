import express from "express";
import {addCartItem, getCartItem, getCartDetail} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-cart-item", addCartItem);
router.post("/get-cart-item", getCartItem);
router.get("/get-cart-detail", getCartDetail)

export default router;