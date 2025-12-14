import { Router } from 'express';
import { getCities } from '../controllers/citiesController.ts';
import { authenticateJWT } from '../middlewares/auth.middleware.ts';

const router = Router();

router.use(authenticateJWT);
router.get('/', getCities);

export default router;
