import { useState } from "react"
import { SearchBar } from "./SearchBar"
import { useGetReserhubPlacesByPrefix } from "../hooks/useGetReserhubPlaceByPrefix"
import { useQueries } from "@tanstack/react-query"
import type { ReserHubPlace } from "../api/fetchReserhubPlaces"
import { fetchCurrentWeather } from "../../weather/api/fetchCurrentWeather"
import type { CityWeatherDetails } from "../types/commonTypes"
import { CitiesSearchResult } from "./CitiesSearchResult"

export const ReserhubCities = () => {
    const [prefix, setPrefix] = useState('')
    const [searchPrefix, setSearchPrefix] = useState<string>("")
    const queryEnabled = searchPrefix.trim().length > 0

    const { data: placesData, isLoading: placesIsLoading } = useGetReserhubPlacesByPrefix(searchPrefix, { enabled: queryEnabled })

    const weatherQueries = useQueries({
        queries: (placesData ?? []).map((place: ReserHubPlace) => ({
            queryKey: ["places", "weather", `${place.lat},${place.long}`],
            queryFn: () => fetchCurrentWeather({ lat: parseFloat(place.lat), lon: parseFloat(place.long) }),
            staleTime: 10 * 60 * 1000, // 10 minutes
        })),
    })

    const weatherIsLoading = weatherQueries.some((query) => query.isLoading)

    const citiesWithWeather: CityWeatherDetails[] = (placesData ?? []).map((place: any, index: any) => ({
        name: place.display,
        country: place.country,
        weather: weatherQueries[index].data,
    }))

    const handleSearch = (e?: React.FormEvent) => {
        e?.preventDefault()
        setSearchPrefix(prefix)
    }
    return (
        <div className="h-auto">
            <div className="pt-20 pb-10 relative">
                <div className="absolute inset-0 bg-[url(/src/image/travel.jpg)] bg-cover bg-center opacity-75" />
                <div className="relative z-10">
                    <h1 className="text-center text-4xl font-bold mb-5 text-gray-700">Hi, where will be your next trip?</h1>
                    <h3 className="text-center text-2xl font-normal text-gray-700">Type the city you are looking for</h3>
                    <h3 className="text-center text-2xl font-normal mb-10 text-gray-700">and find how is the weather</h3>
                    <SearchBar value={prefix} setValue={setPrefix} handleSearch={handleSearch} />
                    <CitiesSearchResult
                        citiesWithWeather={citiesWithWeather}
                        isLoading={placesIsLoading || weatherIsLoading}
                    />
                </div>

            </div>
        </div>
    )
}