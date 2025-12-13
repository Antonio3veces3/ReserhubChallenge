import { Router } from 'express';
import { getHomeController } from '../controllers/homeControllers.ts';

const router = Router();

router.get('/', getHomeController);

export default router;
