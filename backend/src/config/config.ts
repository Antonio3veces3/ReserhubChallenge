import dotenv from 'dotenv';

dotenv.config();

interface Config {
  PORT: number;
  ENV: string;
  URL_DB_CONNECTION: string;
  JWT_SECRET: string;
}

const config: Config = {
  PORT: Number(process.env.PORT) || 3000,
  ENV: process.env.NODE_ENV || 'development',
  URL_DB_CONNECTION: process.env.ATLAS_URI || '',
  JWT_SECRET: process.env.JWT_SECRET || '',
};

export default config;
