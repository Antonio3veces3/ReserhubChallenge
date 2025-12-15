import { EXTERNAL_APIS } from '../config/external-apis.ts';
import { createHttpClient } from '../utils/httpClient.ts';
import { cityCache, reserhubCitiesCache } from './nodeCacheInstance.ts';
import type { OrderBy } from './types/common.ts';

const reserhubApiClient = createHttpClient(
  EXTERNAL_APIS.RESERHUB_API_BASE_URL.BASE_URL,
);

export interface ReserhubCity {
  id: number;
  display: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  result_type: string;
  popularity: string;
  sort_criteria: number;
}

export const fetchReserhubCitiesByPrefix = async (
  prefix?: string,
): Promise<ReserhubCity[]> => {
  try {
    const queryKey = `reserhub:places:${prefix}`;

    const cachedData = await reserhubCitiesCache.get<ReserhubCity[]>(queryKey);
    if (cachedData) {
      return cachedData;
    }

    const endpoint = `/api/v2/places`;
    const response = await reserhubApiClient.get<ReserhubCity[]>(endpoint, {
      params: {
        q: prefix,
      },
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const citiesOnly = response.data.filter(
      (city) => city.result_type === 'city',
    );

    reserhubCitiesCache.set(queryKey, citiesOnly);
    return citiesOnly;
  } catch (error) {
    console.log('Error fetching cities by country code');
    return [];
  }
};
