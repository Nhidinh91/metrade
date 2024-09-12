import express from 'express';
import {productDetail} from '../controllers/productController.js';

const router = express.Router();

router.get('/:id', productDetail);

export default router;