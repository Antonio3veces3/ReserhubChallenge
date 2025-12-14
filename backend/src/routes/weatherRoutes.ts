import { Router } from 'express';
import {
  getCurrentWeather,
  getForecastWeather,
} from '../controllers/weatherController.ts';

const router = Router();

router.get('/current', getCurrentWeather);
router.get('/forecast', getForecastWeather);

export default router;
