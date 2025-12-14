import type { Request, Response } from 'express';
import { fetchCurrentWeather } from '../services/openWeatherService.ts';

export const getCurrentWeather = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    res.status(400).json({ message: 'Latitude and Longitude are required' });
  }

  const currentWeather = await fetchCurrentWeather(
    lat as unknown as number,
    lon as unknown as number,
  );

  res.json(currentWeather);
  return;
};

export const getForecastWeather = async (req: Request, res: Response) => {};
