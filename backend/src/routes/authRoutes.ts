import { Router } from 'express';
import {
  signInController,
  signUpController,
} from '../controllers/authController.ts';

const router = Router();

router.post('/signup', signUpController);
router.post('/signin', signInController);

export default router;
