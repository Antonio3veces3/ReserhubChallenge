import { useQuery } from "@tanstack/react-query";
import type { CityCoordenates } from "../types/types";
import { fetchCurrentWeather } from "../api/fetchCurrentWeather";

export const useGetCurrentWeather = ({ lat, lon }: CityCoordenates) => {
  return useQuery({
    queryKey: ["places", "weather", `${lat},${lon}`],
    queryFn: () => fetchCurrentWeather({ lat, lon }),
    enabled: lat && lon ? true : false,
    // staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
