import { useQuery } from "@tanstack/react-query";
import { fetchPlaceByPrefix } from "../api/fetchPlaces";

type Options = {
  enabled?: boolean;
};

export const useGetPlaceByPrefix = (prefix: string, options?: Options) => {
  return useQuery({
    queryKey: ["places", "prefix", prefix],
    queryFn: () => fetchPlaceByPrefix(prefix),
    staleTime: 10 * 60 * 1000, // 10 minutes
    enabled: options?.enabled ?? true,
  });
};
