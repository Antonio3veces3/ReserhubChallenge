import type { Request, Response } from 'express';
import {
  fetchCurrentWeather,
  fetchForecastWeather,
} from '../services/openWeatherService.ts';

export const getCurrentWeather = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    sendBadRequestStatus(res);
    return;
  }

  const currentWeather = await fetchCurrentWeather(
    lat as unknown as number,
    lon as unknown as number,
  );

  res.json(currentWeather);
  return;
};

export const getForecastWeather = async (req: Request, res: Response) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    sendBadRequestStatus(res);
    return;
  }

  const forecastWeather = await fetchForecastWeather(
    lat as unknown as number,
    lon as unknown as number,
  );

  res.json(forecastWeather);
  return;
};

const sendBadRequestStatus = (res: Response): void => {
  res.status(400).json({ message: 'Latitude and Longitude are required' });
};
