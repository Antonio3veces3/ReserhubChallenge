import { useSearchParams } from 'react-router-dom'
import { useGetForecastWeather } from '../features/weather/hooks/useGetForecastWeather'
import { useGetCurrentWeather } from '../features/weather/hooks/useGetCurrentWeather'
import { CurrentWeatherDetails } from '../features/city/CurrentWeatherDetails'
import { ForecastDetails } from '../features/city/ForecastDetails'

export function City() {
    const [searchParams] = useSearchParams()
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    const cityName = searchParams.get('cityName')
    const country = searchParams.get('country')

    const latNumber = lat ? parseFloat(lat) : 0;
    const lonNumber = lon ? parseFloat(lon) : 0;

    const { data: dataCurrentWeather, isLoading: currentWeatherIsLoading, isError: currentWeatherIsError } = useGetCurrentWeather({ lat: latNumber, lon: lonNumber });

    const { data: dataForecast, isLoading: forecastIsLoading, isError: forecastIsError } = useGetForecastWeather({ lat: latNumber, lon: lonNumber });


    return (
        <div className="p-6">
            <div className="max-w-8xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{cityName}, {country}</h1>

                <div className="flex flex-col md:flex-row gap-8 min-h-96 items-stretch">
                    <CurrentWeatherDetails
                        isError={currentWeatherIsError}
                        isLoading={currentWeatherIsLoading}
                        weather={dataCurrentWeather}
                    />

                    <ForecastDetails
                        isError={forecastIsError}
                        isLoading={forecastIsLoading}
                        forecastList={dataForecast?.list}
                    />
                </div>
            </div>
        </div>
    )
}
