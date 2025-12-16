import React from "react";
import type { CityWeatherDetails } from "../types/commonTypes";
import { fetchCurrentWeather } from "../../weather/api/fetchCurrentWeather";
import { useQueries } from "@tanstack/react-query";
import type { PlacesData } from "../api/fetchPlaces";
import { CitiesSearchResult } from "./CitiesSearchResult";



interface CitiesWithWeatherProps {
    headerTitle: string;
    placesData?: PlacesData;
    description?: string;

}

export const CitiesWithWeather: React.FC<CitiesWithWeatherProps> = ({
    headerTitle,
    placesData,
    description
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


    if (weatherIsSomeError) {
        const message = "Something went wrong while fetching places.";
        return (
            <section>
                <Header title={headerTitle} description={description} />
                <p style={{ color: "var(--color-danger, #b00020)" }}>Error: {message}</p>
            </section>
        );
    }

    return (
        <div className="pl-10 pr-10">
            <Header title={headerTitle} description={description} />
            <section>
                <CitiesSearchResult
                    citiesWithWeather={citiesWithWeather}
                    isLoading={weatherIsLoading}
                    enableHideButton={false}
                />
            </section>
        </div>
    );
};

interface HeaderProps {
    title: string;
    description?: string;
}
const Header = ({ title, description }: HeaderProps) => {
    return (
        <div className="pl-5 mb-5">
            <h1 className="text-left text-2xl font-bold text-sky-900 mt-5">{title}</h1>
            {description && <p className="text-lg font-medium text-gray-600 mt-2">{description}</p>}
        </div>
    )
}
