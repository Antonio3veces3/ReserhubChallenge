import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  ENV: string;
  URL_DB_CONNECTION: string;
  JWT_SECRET: string;
  GEO_DB_CITIES_API_BASE_URL: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  ENV: process.env.NODE_ENV || 'development',
  URL_DB_CONNECTION: process.env.ATLAS_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
  GEO_DB_CITIES_API_BASE_URL: process.env.GEO_DB_CITIES_API_BASE_URL || '',
};

export default config;
