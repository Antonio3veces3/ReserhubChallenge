import { Router } from 'express';
import {
  getCurrentWeather,
  getForecastWeather,
} from '../controllers/weatherController.ts';
import { authenticateJWT } from '../middlewares/auth.middleware.ts';

const router = Router();
router.use(authenticateJWT);

router.get('/current', getCurrentWeather);
router.get('/forecast', getForecastWeather);

export default router;
