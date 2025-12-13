import config from './config.ts';

export interface ExternalApiConfig {
  BASE_URL: string;
}

export interface ExternalApis {
  GEO_DB_CITIES_API: ExternalApiConfig;
}

export const EXTERNAL_APIS: ExternalApis = {
  GEO_DB_CITIES_API: {
    BASE_URL: config.GEO_DB_CITIES_API_BASE_URL || '',
  },
};
