import { useQuery } from "@tanstack/react-query";
import { fetchPlaces } from "../api/fetchPlaces";
import type { Order } from "../types/commonTypes";

export const useGetRandomPlaces = (orderBy: Order) => {
  return useQuery({
    queryKey: ["places", "random", orderBy],
    queryFn: () => fetchPlaces(orderBy),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};
