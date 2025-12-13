import express from 'express';
import homeRoutes from './routes/homeRoutes.ts';
import { errorHandler } from './middlewares/errorHandler.ts';

const app = express();
app.use(express.json());

app.use('/', homeRoutes);

app.use(errorHandler);

export default app;
