import type { Request, Response } from 'express';
import { fetchReserhubCitiesByPrefix } from '../services/reserhubService.ts';

export const getReserhubCitiesByPrefix = async (
  req: Request,
  res: Response,
) => {
  const { prefix } = req.query;

  const randomCities = await fetchReserhubCitiesByPrefix(prefix?.toString());
  res.json(randomCities);
  return;
};
