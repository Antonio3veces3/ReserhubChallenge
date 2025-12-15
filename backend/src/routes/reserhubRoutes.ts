import { Router } from 'express';
import { getReserhubCitiesByPrefix } from '../controllers/reserhubController.ts';

const router = Router();

router.get('/', getReserhubCitiesByPrefix);

export default router;
