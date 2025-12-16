import { LoadingIndicator } from "../../../components/LoadingIndicator"
import { useGetPlacesByCountryCode } from "../hooks/useGetPlacesByCountryCode"
import { CitiesWithWeather } from "./CitiesWithWeather"

export const CitiesByCountryCode = () => {
    const { data, isLoading, isError } = useGetPlacesByCountryCode('US')
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

    const title = "Explore Your Nation's Weather."
    const description = "Easily view real-time weather conditions and forecasts for key cities across your country. Click on any city to dive into the details!"
    return <CitiesWithWeather headerTitle={title} placesData={data} description={description} />
}