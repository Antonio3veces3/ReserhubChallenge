import axios from "axios";
import { config } from "../../../config/config";
import type { Order } from "../types/commonTypes";
import { getJwt } from "../../../auth/jwt";

interface Link {
  rel: string;
  href: string;
}

interface Place {
  id: number;
  wikiDataId: string;
  type: string;
  name: string;
  country: string;
  countryCode: string;
  latitude: number;
  longitude: number;
  population: number;
}
export interface PlacesData {
  links: Link[];
  data: Place[];
}

export const fetchPlaces = async (order: Order): Promise<PlacesData> => {
  const url = `${config.API_BASE_URL}/places`;
  const providedToken = getJwt();
  const headers = providedToken
    ? { Authorization: `Bearer ${providedToken}` }
    : undefined;

  const response = await axios.get<PlacesData>(url, {
    headers,
    params: { sortBy: order },
  });

  return response.data;
};

export const fetchPlaceByPrefix = async (prefix: string): Promise<any> => {
  const url = `${config.API_BASE_URL}/places`;
  const providedToken = getJwt();
  const headers = providedToken
    ? { Authorization: `Bearer ${providedToken}` }
    : undefined;

  const response = await axios.get<any>(url, {
    headers,
    params: { prefix },
  });

  return response.data;
};
