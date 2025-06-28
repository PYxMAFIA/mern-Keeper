import express from 'express';
import {
  checkAuth,
  userLogin,
  userSignUp,
} from '../../controllers/auth.notesController.js';
import { protectRoute } from '../../middleWare/auth.middleware.js';

const router = express.Router();

router.post("/login", userLogin);
router.post("/signUp", userSignUp);

router.get("/check", protectRoute, checkAuth);

export default router;
