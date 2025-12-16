import { LoadingIndicator } from "../../../components/LoadingIndicator"
import { useGetRandomPlaces } from "../hooks/useGetRandomPlaces";
import type { Order } from "../types/commonTypes";
import { CitiesWithWeather } from "./CitiesWithWeather"

interface CitiesByPopulationRefactorProps {
    orderBy?: Order;
}

export const CitiesByPopulationRefactor = ({ orderBy = 'ASC' }: CitiesByPopulationRefactorProps) => {
    const { data: placesData, isLoading, isError, } = useGetRandomPlaces(orderBy);

    const orderName = orderBy === 'ASC' ? 'Small in Size, Rich in Character.' : 'Weather in the Global Hubs.'
    const title = `${orderName} populated cities`
    const descriptionMorePopulation = "We have curated a list of the most densely populated and fastest-growing cities across the globe. Click on any city, to get the precise current weather details and plan your hypothetical next visit!"
    const descriptionLessPopulation = "Step away from the crowds and discover the planet's least populated urban centers. This curated list features smaller, officially designated cities that offer unique geographies and quieter ways of life. Find the current weather and forecast for these charming, less-traveled locales."

    const description = orderBy === "ASC" ? descriptionLessPopulation : descriptionMorePopulation

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

    return <CitiesWithWeather headerTitle={title} placesData={placesData} description={description} />
}