import axios from "axios";
import { config } from "../../../config/config";

export interface ReserHubPlace {
  id: number;
  country: string;
  display: string;
  lat: string;
  long: string;
}

export const fetchReserhubPlacesByPrefix = async (
  prefix?: string
): Promise<ReserHubPlace[]> => {
  const url = `${config.API_BASE_URL}/reserhub/places`;
  //   const providedToken = getJwt();
  //   const headers = providedToken
  //     ? { Authorization: `Bearer ${providedToken}` }
  //     : undefined;

  const response = await axios.get<ReserHubPlace[]>(url, {
    // headers,
    params: { prefix },
  });

  return response.data;
};
