import { LoadingIndicator } from "../../../components/LoadingIndicator"
import { useGetPlacesByCountryCode } from "../hooks/useGetPlacesByCountryCode"
import { CitiesWithWeather } from "./CitiesWithWeather"

export const CitiesByCountryCode = () => {
    const { data, isLoading, isError } = useGetPlacesByCountryCode('MX')
    if (isLoading) {
        return (
            <div className="flex justify-center">
                <LoadingIndicator />
            </div>)
    }

    if (isError) {
        return (
            <div className="flex justify-center">
                <h2>Something went wrong :c</h2>
            </div>
        )
    }

    return <CitiesWithWeather headerTitle="Cities in Mexico" placesData={data} />
}