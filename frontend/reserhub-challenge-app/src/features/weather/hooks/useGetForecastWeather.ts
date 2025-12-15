import { useQuery } from "@tanstack/react-query";
import type { CityCoordenates } from "../types/types";
import { fetchForecastWeather } from "../api/fetchForecastWeather";

export const useGetForecastWeather = ({ lat, lon }: CityCoordenates) => {
  return useQuery({
    queryKey: ["places", "weather", "forecast", `${lat},${lon}`],
    queryFn: () => fetchForecastWeather({ lat, lon }),
    enabled: lat && lon ? true : false,
    // staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
