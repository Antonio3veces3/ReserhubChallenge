import config from './config.ts';

export interface ExternalApiConfig {
  BASE_URL: string;
}

export interface ExternalApis {
  GEO_DB_CITIES_API: ExternalApiConfig;
  OPEN_WEATHER_API: ExternalApiConfig;
  RESERHUB_API_BASE_URL: ExternalApiConfig;
}

export const EXTERNAL_APIS: ExternalApis = {
  GEO_DB_CITIES_API: {
    BASE_URL: config.GEO_DB_CITIES_API_BASE_URL || '',
  },
  OPEN_WEATHER_API: {
    BASE_URL: config.OPEN_WEATHER_API_BASE_URL || '',
  },
  RESERHUB_API_BASE_URL: {
    BASE_URL: config.RESERHUB_API_BASE_URL || '',
  },
};
