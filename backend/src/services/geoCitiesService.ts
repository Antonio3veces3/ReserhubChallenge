import { EXTERNAL_APIS } from '../config/external-apis.ts';
import { createHttpClient } from '../utils/httpClient.ts';
import { cityCache } from './nodeCacheInstance.ts';
import type { OrderBy } from './types/common.ts';

const geoDbCitiesApiClient = createHttpClient(
  EXTERNAL_APIS.GEO_DB_CITIES_API.BASE_URL,
);

export interface City {
  id: number;
  wikiDataId: string;
  type: string;
  name: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}

const commonParams = {
  offset: 0,
  types: 'CITY',
};

export const fetchCitiesByCountryCode = async (
  countryCode: string,
  limit: number = 10,
): Promise<City[]> => {
  try {
    const queryKey = `cityByCountryCode:${countryCode}:${limit}`;

    const cachedData = await cityCache.get<City[]>(queryKey);
    if (cachedData) {
      return cachedData;
    }

    const endpoint = `/v1/geo/countries/${countryCode}/places?`;
    const response = await geoDbCitiesApiClient.get(endpoint, {
      params: {
        limit: limit,
        sort: 'name',
        ...commonParams,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    cityCache.set(queryKey, response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching cities by country code');
    return [];
  }
};

export const fetchCitiesByNamePrefix = async (
  name: string,
  limit: number = 10,
): Promise<City[]> => {
  const endpoint = `/v1/geo/places`;
  try {
    const queryKey = `cityByNamePrefix:${name}:${limit}`;

    const cachedData = await cityCache.get<City[]>(queryKey);
    if (cachedData) {
      return cachedData;
    }

    const response = await geoDbCitiesApiClient.get(endpoint, {
      params: {
        limit: limit,
        namePrefix: name,
        sort: 'name',
        ...commonParams,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    cityCache.set(queryKey, response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching cities by name prefix');
    return [];
  }
};

export const fetchRandomCities = async (
  limit: number = 10,
  orderBy: OrderBy = 'DESC',
): Promise<City[]> => {
  const queryKey = `randomCities:${limit}:${orderBy}`;

  const cachedData = await cityCache.get<City[]>(queryKey);
  if (cachedData) {
    return cachedData;
  }

  const endpoint = `/v1/geo/places`;
  const sortBy = orderBy === 'ASC' ? 'population' : '-population';
  try {
    const response = await geoDbCitiesApiClient.get(endpoint, {
      params: {
        ...commonParams,
        limit: limit,
        sort: sortBy,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    cityCache.set(queryKey, response.data);
    return response.data;
  } catch (error) {
    console.log('Error fetching random cities');
    console.log(error);

    return [];
  }
};
