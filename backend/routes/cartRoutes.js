import express from "express";
import {addCartItem, getCartItem, getCartDetail, updateItemQuantity, deleteItem} from "../controllers/cartController.js";

const router = express.Router();

router.post("/add-cart-item", addCartItem);
router.post("/get-cart-item", getCartItem);
router.get("/get-cart-detail", getCartDetail);
router.post("/update-quantity", updateItemQuantity);
router.delete("/delete-cart-item/:id", deleteItem);

export default router;