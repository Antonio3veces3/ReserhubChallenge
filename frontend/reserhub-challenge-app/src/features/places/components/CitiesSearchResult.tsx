import type { CityWeatherDetails } from '../types/commonTypes';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { CityWeatherCard } from '../../weather/components/CityWeatherCard';


interface CitiesSearchResultProps {
    isLoading: boolean;
    citiesWithWeather: CityWeatherDetails[]
}
export const CitiesSearchResult = ({ isLoading, citiesWithWeather }: CitiesSearchResultProps) => {

    const resultBody = !isLoading && citiesWithWeather.length > 0 ? (
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
        </ul>)
        : (<p className="flex justify-center text-xl mb-20 font-semibold text-gray-600">Cities not found</p>)

    return (
        <div className="w-full max-w-full mx-auto p-4">
            {isLoading ?
                (<div className="flex justify-center">
                    <LoadingIndicator />
                </div>)
                : (
                    resultBody
                )}
        </div>
    )
}