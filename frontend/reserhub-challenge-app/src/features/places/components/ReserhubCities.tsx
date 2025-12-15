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
        <div>
            <SearchBar value={prefix} setValue={setPrefix} handleSearch={handleSearch} />
            <CitiesSearchResult
                citiesWithWeather={citiesWithWeather}
                isLoading={placesIsLoading || weatherIsLoading}
            />
        </div>
    )
}