import React from "react";
import type { CityWeatherDetails, Order } from "../types/commonTypes";
import { fetchCurrentWeather } from "../../weather/api/fetchCurrentWeather";
import { useQueries } from "@tanstack/react-query";
import { CityWeatherCard } from "../../weather/components/CityWeatherCard";
import type { PlacesData } from "../api/fetchPlaces";
import { LoadingIndicator } from "../../../components/LoadingIndicator";



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

    if (weatherIsLoading) {
        return (
            <section>
                <Header />
                <div className="flex justify-center">
                    <LoadingIndicator />
                </div>
            </section>
        );
    }

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
            {citiesWithWeather.length === 0 ? (
                <p className="flex justify-center text-xl mb-20 font-semibold text-gray-600">No cities found</p>
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
