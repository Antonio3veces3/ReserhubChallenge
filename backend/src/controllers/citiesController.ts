import type { Request, Response } from 'express';
import {
  fetchCitiesByCountryCode,
  fetchCitiesByNamePrefix,
  fetchRandomCities,
} from '../services/geoCitiesService.ts';
import type { OrderBy } from '../services/types/common.ts';

export const getCities = async (req: Request, res: Response) => {
  const { prefix, country_code, limit, orderBy } = req.query;

  if (!prefix && !country_code) {
    const randomCities = await fetchRandomCities(
      limit as number | undefined,
      orderBy as OrderBy | undefined,
    );
    res.json(randomCities);
    return;
  }

  if (prefix) {
    const citiesByPrefix = await fetchCitiesByNamePrefix(
      prefix as string,
      limit as number | undefined,
    );
    res.json(citiesByPrefix);
    return;
  }

  if (country_code) {
    const citiesByCountry = await fetchCitiesByCountryCode(
      country_code as string,
      limit as number | undefined,
    );
    res.json(citiesByCountry);
    return;
  }
};
