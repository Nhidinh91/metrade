import express from "express";
const router = express.Router();

//Import category controllers
import {getProductsByCategory} from '../controllers/productControllers.js'

//ROUTES
router.get('/:categoryId', getProductsByCategory)


export default router;