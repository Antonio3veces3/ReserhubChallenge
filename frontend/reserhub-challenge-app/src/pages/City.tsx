import { useSearchParams } from 'react-router-dom'
import { useGetForecastWeather } from '../features/weather/hooks/useGetForecastWeather'
import { useGetCurrentWeather } from '../features/weather/hooks/useGetCurrentWeather'
import { CurrentWeatherDetails } from '../features/city/CurrentWeatherDetails'
import { ForecastDetails } from '../features/city/ForecastDetails'
import { FaMapMarked, FaMapMarkedAlt, FaMapMarker, FaMapMarkerAlt, FaMapPin } from 'react-icons/fa'
import { FaMapLocationDot } from 'react-icons/fa6'
import { ForecastNew } from '../features/city/ForecastNew'
import { CurrentWeatherNew } from '../features/city/CurrentWeatherNew'
import { ScrollToTop } from '../components/ScrollToTop'

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
        <div className="p-6 relative min-h-screen">
            <ScrollToTop />
            <div className="absolute inset-0 bg-[url(/src/image/cloudySky.jpg)] bg-cover bg-center opacity-100" />
            <div className="max-w-8xl mx-auto relative z-10">
                <h1 className="text-6xl font-bold text-white mt-10 text-center tracking-wider">{cityName}, {country}</h1>
                <div className='flex flex-col gap-8 min-h-96 items-center'>
                    <CurrentWeatherNew
                        isError={currentWeatherIsError}
                        isLoading={currentWeatherIsLoading}
                        weather={dataCurrentWeather}
                    />
                    <ForecastNew
                        isError={forecastIsError}
                        isLoading={forecastIsLoading}
                        forecastList={dataForecast?.list}
                    />
                </div>
            </div>
        </div>
    )
}
