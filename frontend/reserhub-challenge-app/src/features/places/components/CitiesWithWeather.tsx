import React from "react";
import type { CityWeatherDetails } from "../types/commonTypes";
import { fetchCurrentWeather } from "../../weather/api/fetchCurrentWeather";
import { useQueries } from "@tanstack/react-query";
import type { PlacesData } from "../api/fetchPlaces";
import { CitiesSearchResult } from "./CitiesSearchResult";



interface CitiesWithWeatherProps {
    headerTitle: string;
    placesData?: PlacesData;
}

export const CitiesWithWeather: React.FC<CitiesWithWeatherProps> = ({
    headerTitle,
    placesData
}) => {
    const weatherQueries = useQueries({
        queries: (placesData?.data ?? []).map((place: any) => ({
            queryKey: ["places", "weather", `${place.latitude},${place.longitude}`],
            queryFn: () => fetchCurrentWeather({ lat: place.latitude, lon: place.longitude }),
            staleTime: 10 * 60 * 1000, // 10 minutes

        })),
    })

    const weatherIsLoading = weatherQueries.some((query) => query.isLoading)
    const weatherIsSomeError = weatherQueries.some((query) => query.isError)
    const citiesWithWeather: CityWeatherDetails[] = (placesData?.data ?? []).map((place: any, index: any) => ({
        name: place.name,
        country: place.country,
        weather: weatherQueries[index].data!,
    }))

    const Header = () => <h1 className="text-center text-6xl font-extrabold mb-20 text-green-900 mt-20">{headerTitle}</h1>


    if (weatherIsSomeError) {
        const message = "Something went wrong while fetching places.";
        return (
            <section>
                <Header />
                <p style={{ color: "var(--color-danger, #b00020)" }}>Error: {message}</p>
            </section>
        );
    }



    return (
        <section>
            <Header />
            <CitiesSearchResult
                citiesWithWeather={citiesWithWeather}
                isLoading={weatherIsLoading}
            />
        </section>
    );
};
