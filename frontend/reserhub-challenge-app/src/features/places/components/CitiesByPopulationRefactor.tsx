import { LoadingIndicator } from "../../../components/LoadingIndicator"
import { useGetPlacesByCountryCode } from "../hooks/useGetPlacesByCountryCode"
import { useGetRandomPlaces } from "../hooks/useGetRandomPlaces";
import type { Order } from "../types/commonTypes";
import { CitiesWithWeather } from "./CitiesWithWeather"

interface CitiesByPopulationRefactorProps {
    orderBy?: Order;
}

export const CitiesByPopulationRefactor = ({ orderBy = 'ASC' }: CitiesByPopulationRefactorProps) => {
    const { data: placesData, isLoading, isError, } = useGetRandomPlaces(orderBy);

    const orderName = orderBy === 'ASC' ? 'Less' : 'More'
    const title = `${orderName} populated cities`
    if (isLoading) {
        return (
            <div className="flex justify-center">
                <LoadingIndicator />
            </div>)
    }

    if (isError) {
        return (
            <div className="flex justify-center">
                <LoadingIndicator />
            </div>
        )
    }

    return <CitiesWithWeather headerTitle={title} placesData={placesData} />
}