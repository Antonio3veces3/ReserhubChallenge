import config from '../config/config.ts';
import { EXTERNAL_APIS } from '../config/external-apis.ts';
import { createHttpClient } from '../utils/httpClient.ts';
import { weatherCache } from './nodeCacheInstance.ts';

import type {
  CurrentWeather,
  ForecastWeather,
} from './types/weatherServiceTypes.ts';

const openWeatherApiClient = createHttpClient(
  EXTERNAL_APIS.OPEN_WEATHER_API.BASE_URL,
);

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeather | Object> => {
  try {
    const queryKey = `currentWeather:${lat}:${lon}`;

    const cachedData = await weatherCache.get<CurrentWeather | Object>(
      queryKey,
    );
    if (cachedData) {
      return cachedData;
    }

    const endpoint = `/data/2.5/weather`;
    const response = await openWeatherApiClient.get<CurrentWeather>(endpoint, {
      params: {
        lat,
        lon,
        appid: config.WEATHER_KEY,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    weatherCache.set(queryKey, response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching current weather');
    return {};
  }
};

export const fetchForecastWeather = async (
  lat: number,
  lon: number,
): Promise<ForecastWeather | Object> => {
  try {
    const queryKey = `forecastWeather:${lat}:${lon}`;

    const cachedData = await weatherCache.get(queryKey);
    if (cachedData) {
      return cachedData;
    }

    const endpoint = `/data/2.5/forecast`;
    const response = await openWeatherApiClient.get<ForecastWeather>(endpoint, {
      params: {
        lat,
        lon,
        appid: config.WEATHER_KEY,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    weatherCache.set(queryKey, response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching forecast weather');
    return {};
  }
};
