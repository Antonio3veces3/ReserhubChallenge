import axios from "axios";
import { getJwt } from "../../../auth/jwt";
import { config } from "../../../config/config";
import type { CityCoordenates, ForecastData } from "../types/types";

export const fetchForecastWeather = async ({
  lat,
  lon,
}: CityCoordenates): Promise<ForecastData> => {
  const url = `${config.API_BASE_URL}/weather/forecast`;
  const providedToken = getJwt();
  const headers = providedToken
    ? { Authorization: `Bearer ${providedToken}` }
    : undefined;

  const response = await axios.get<any>(url, {
    headers,
    params: { lat, lon },
  });

  return response.data;
};
