import express from "express";
import { getAccessToken } from "../controllers/getAccessToken.js";

const router = express.Router();

router.post("/get-access-token", getAccessToken);

export default router;