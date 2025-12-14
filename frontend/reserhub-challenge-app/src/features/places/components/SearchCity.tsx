import React, { useState } from "react"
import { useQueries } from "@tanstack/react-query"
import { fetchCurrentWeather } from "../../weather/api/fetchCurrentWeather"
import { useGetPlaceByPrefix } from "../hooks/useGetPlaceByPrefix"
import { CityWeatherCard } from "../../weather/components/CityWeatherCard"

export function SearchCity() {
    const [input, setInput] = useState<string>("")
    const [searchPrefix, setSearchPrefix] = useState<string>("Col")

    const { data: placeData, isLoading: placeIsLoading } = useGetPlaceByPrefix(searchPrefix, { enabled: searchPrefix.trim().length > 0 })

    const weatherQueries = useQueries({
        queries: (placeData?.data ?? []).map((place: any) => ({
            queryKey: ["places", "weather", `${place.latitude},${place.longitude}`],
            queryFn: () => fetchCurrentWeather({ lat: place.latitude, lon: place.longitude }),
            staleTime: 10 * 60 * 1000, // 10 minutes
        })),
    })

    const weatherIsLoading = weatherQueries.some((query) => query.isLoading)

    const citiesWithWeather = (placeData?.data ?? []).map((place: any, index: any) => ({
        name: place.name,
        country: place.country,
        weather: weatherQueries[index].data,
    }))

    if (!placeIsLoading && !weatherIsLoading) {
        console.log('citiesWithWeather: ', citiesWithWeather);
    }

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault()
        setSearchPrefix(input.trim())
    }

    return (
        <div className="w-full mx-auto">
            <form onSubmit={handleSearch} className="flex gap-2 mb-4 w-full justify-center">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type city prefix"
                    className="border rounded p-2 w-xl"
                />
                <button
                    type="submit"
                    onClick={(e) => handleSearch(e)}
                    className="text-black px-4 py-2 rounded flex-none"
                >
                    Search
                </button>
            </form>

            <div className="w-full max-w-full mx-auto p-4">
                <ul className="flex flex-wrap gap-4 list-none">
                    {citiesWithWeather.map((city: any, idx: number) => (
                        <li key={city.name + idx} className="p-3">
                            <CityWeatherCard weather={{
                                city: city.name,
                                temperature: 30.2
                            }} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}