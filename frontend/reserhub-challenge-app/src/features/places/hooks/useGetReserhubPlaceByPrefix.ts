import { useQuery } from "@tanstack/react-query";
import { fetchReserhubPlacesByPrefix } from "../api/fetchReserhubPlaces";

type Options = {
  enabled?: boolean;
};

export const useGetReserhubPlacesByPrefix = (
  prefix: string,
  options?: Options
) => {
  return useQuery({
    queryKey: ["reserhub", "places", prefix],
    queryFn: () => fetchReserhubPlacesByPrefix(prefix),
    staleTime: 30 * 60 * 1000, // 30 minutes
    enabled: options?.enabled ?? true,
  });
};
