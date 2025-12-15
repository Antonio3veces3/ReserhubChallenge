import NodeCache from 'node-cache';

export const weatherCache = new NodeCache({
  stdTTL: 600, // 10 minutos
  checkperiod: 120, // 2 minutos
});

export const cityCache = new NodeCache({
  stdTTL: 86400, // 1 dia
  checkperiod: 43200, // 12 horas
});

export const reserhubCitiesCache = new NodeCache({
  stdTTL: 86400, // 1 dia
  checkperiod: 43200, // 12 horas
});
