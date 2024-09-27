import express from "express";
import { profile, updateProfile } from "../controllers/userController.js";
import { uploadUserAvatar } from "../middlewares/uploadPhotos.js";


const router = express.Router(); 

router.get('/profile/detail/:id', profile);

router.patch(
  "/profile/update/:id",
  uploadUserAvatar.single("avatar"),
  updateProfile
);

export default router;
