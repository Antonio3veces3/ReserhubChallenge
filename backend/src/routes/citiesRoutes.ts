import { Router } from 'express';
import { getCities } from '../controllers/citiesController.ts';

const router = Router();

router.get('/', getCities);

export default router;
