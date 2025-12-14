import config from '../config/config.ts';
import { EXTERNAL_APIS } from '../config/external-apis.ts';
import { createHttpClient } from '../utils/httpClient.ts';

const openWeatherApiClient = createHttpClient(
  EXTERNAL_APIS.OPEN_WEATHER_API.BASE_URL,
);

export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface CurrentWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  main: MainWeather;
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export const fetchCurrentWeather = async (
  lat: number,
  lon: number,
): Promise<CurrentWeather | Object> => {
  try {
    const endpoint = `/data/2.5/weather`;
    const response = await openWeatherApiClient.get(endpoint, {
      params: {
        lat,
        lon,
        appid: config.WEATHER_KEY,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response.data;
  } catch (error) {
    console.log('Error fetching current weather');
    return {};
  }
};
