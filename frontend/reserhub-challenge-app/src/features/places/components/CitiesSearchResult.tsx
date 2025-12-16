import type { CityWeatherDetails } from '../types/commonTypes';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { CityWeatherCard } from '../../weather/components/CityWeatherCard';
import { useState } from 'react';


interface CitiesSearchResultProps {
    isLoading: boolean;
    citiesWithWeather: CityWeatherDetails[];
    enableHideButton?: boolean;
}
export const CitiesSearchResult = ({ isLoading, citiesWithWeather, enableHideButton = true }: CitiesSearchResultProps) => {
    const [hidden, setHidden] = useState(false)
    const hiddenProp = hidden ? 'hidden' : ''

    const resultBody = !isLoading && citiesWithWeather.length > 0 ? (
        <ul className={`flex flex-wrap gap-4 list-none justify-center ${hiddenProp}`}>
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
            {citiesWithWeather.length > 0 && enableHideButton && <div className='pl-36 mb-4'>
                <button
                    onClick={() => setHidden(!hidden)}
                    type='button'>
                    {hidden ? "Show Results" : "Hide Results"}
                </button>
            </div>}
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