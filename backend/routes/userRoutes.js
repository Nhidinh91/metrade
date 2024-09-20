import express from 'express';
import { profile, updateProfile, changeRole } from '../controllers/userController.js';
import { uploadUserAvatar } from '../middlewares/uploadPhotos.js';

const router = express.Router();

router.get('/profile/detail/:id', profile);

router.patch('/profile/update/:id', uploadUserAvatar.single('avatar'), updateProfile);

//Change user's role
router.patch('/changeRole/:id', changeRole);


export default router;