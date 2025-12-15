import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  ENV: string;
  URL_DB_CONNECTION: string;
  JWT_SECRET: string;
  GEO_DB_CITIES_API_BASE_URL: string;
  OPEN_WEATHER_API_BASE_URL: string;
  RESERHUB_API_BASE_URL: string;
  WEATHER_KEY: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  ENV: process.env.NODE_ENV || 'development',
  URL_DB_CONNECTION: process.env.ATLAS_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  GEO_DB_CITIES_API_BASE_URL: process.env.GEO_DB_CITIES_API_BASE_URL || '',
  OPEN_WEATHER_API_BASE_URL: process.env.OPEN_WEATHER_API_BASE_URL || '',
  RESERHUB_API_BASE_URL: process.env.RESERHUB_API_BASE_URL || '',
  WEATHER_KEY: process.env.WEATHER_KEY || '',
};

export default config;
