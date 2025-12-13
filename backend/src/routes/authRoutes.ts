import { Router } from 'express';
import {
  signInController,
  signUpController,
  testingJwt,
} from '../controllers/authController.ts';

const router = Router();

router.post('/signup', signUpController);
router.post('/signin', signInController);
router.post('/test', testingJwt);

export default router;
