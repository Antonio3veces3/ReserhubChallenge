import { useQuery } from "@tanstack/react-query";
import { fetchPlacesByCountryCode } from "../api/fetchPlaces";

type Options = {
  enabled?: boolean;
};

export const useGetPlacesByCountryCode = (
  countryCode: string,
  options?: Options
) => {
  return useQuery({
    queryKey: ["places", "country_code", countryCode],
    queryFn: () => fetchPlacesByCountryCode(countryCode),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
  });
};
