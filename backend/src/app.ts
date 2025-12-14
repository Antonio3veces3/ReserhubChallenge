import express from 'express';
import { errorHandler } from './middlewares/errorHandler.ts';
import {
  authRoutes,
  citiesRoutes,
  homeRoutes,
  weatherRoutes,
} from './routes/index.ts';

const app = express();
app.use(express.json());

app.use('/api/v1/', homeRoutes);
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/places', citiesRoutes);
app.use('/api/v1/weather', weatherRoutes);

app.use(errorHandler);

export default app;
