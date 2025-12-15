import React from "react";
import { useGetRandomPlaces } from "../hooks/useGetRandomPlaces";
import type { CityWeatherDetails, Order } from "../types/commonTypes";
import { fetchCurrentWeather } from "../../weather/api/fetchCurrentWeather";
import { useQueries } from "@tanstack/react-query";
import { CityWeatherCard } from "../../weather/components/CityWeatherCard";



interface CitiesByPopulationProps {
    title?: string;
    orderBy?: Order;
}

const CitiesByPopulation: React.FC<CitiesByPopulationProps> = ({
    title = "Cities by population",
    orderBy = "DESC",
}) => {
    const { data: placesData, isLoading, isError, } = useGetRandomPlaces(orderBy);

    const weatherQueries = useQueries({
        queries: (placesData?.data ?? []).map((place: any) => ({
            queryKey: ["places", "weather", `${place.latitude},${place.longitude}`],
            queryFn: () => fetchCurrentWeather({ lat: place.latitude, lon: place.longitude }),
            staleTime: 10 * 60 * 1000, // 10 minutes
        })),
    })

    const weatherIsLoading = weatherQueries.some((query) => query.isLoading)
    const citiesWithWeather: CityWeatherDetails[] = (placesData?.data ?? []).map((place: any, index: any) => ({
        name: place.name,
        country: place.country,
        weather: weatherQueries[index].data!,
    }))


    if (weatherIsLoading) {
        return (
            <section>
                <h3>{title}</h3>
                <p>Loading...</p>
            </section>
        );
    }

    if (isError) {
        const message = "Something went wrong while fetching places.";
        return (
            <section>
                <h3>{title}</h3>
                <p style={{ color: "var(--color-danger, #b00020)" }}>Error: {message}</p>
            </section>
        );
    }



    return (
        <section>
            <h1 className="text-center text-6xl font-extrabold mb-20 text-green-900 mt-20">{title}</h1>
            {citiesWithWeather.length === 0 ? (
                <p>No cities found</p>
            ) : (
                <ul className="flex flex-wrap gap-4 list-none justify-center">
                    {citiesWithWeather.map((city: CityWeatherDetails, index: number) => (
                        <li key={`${city.name}-${index}`} className="p-3">
                            <CityWeatherCard data={{
                                country: city.country,
                                name: city.name,
                                weather: city.weather
                            }} />
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
};

export default CitiesByPopulation;
