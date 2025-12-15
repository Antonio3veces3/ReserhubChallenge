import { useSearchParams } from 'react-router-dom'
import { FaCloud, FaCloudRain, FaEye, FaWind } from 'react-icons/fa'
import { FaTemperatureFull } from 'react-icons/fa6'
import type { IconType } from 'react-icons'
import { useGetForecastWeather } from '../features/weather/hooks/useGetForecastWeather'
import { LoadingIndicator } from '../components/LoadingIndicator'
import { convertDatestampToHumanDate } from '../utils/dateConverter'
import { useGetCurrentWeather } from '../features/weather/hooks/useGetCurrentWeather'
import { trunkTemperature } from '../utils/weatherUtils'

export function City() {
    const [searchParams] = useSearchParams()
    const lat = searchParams.get('lat')
    const lon = searchParams.get('lon')
    const cityName = searchParams.get('cityName')
    const country = searchParams.get('country')

    const latNumber = lat ? parseFloat(lat) : 0;
    const lonNumber = lon ? parseFloat(lon) : 0;

    const { data: dataCurrentWeather, isLoading: currentWeatherIsLoading } = useGetCurrentWeather({ lat: latNumber, lon: lonNumber });

    const { data, isLoading } = useGetForecastWeather({ lat: latNumber, lon: lonNumber });



    // Hardcoded design data
    const current = {
        city: 'Barcelona',
        country: 'ES',
        datetime: 'Dec 14, 2025 — 16:00',
        temp: 21.3,
        main: 'Partly Cloudy',
        feels_like: 20.8,
        temp_min: 18.0,
        temp_max: 22.5,
        humidity: 60,
        wind: 14,
        visibility: 12,
    }

    return (
        <div className="p-6">
            <div className="max-w-5xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">{cityName}, {country}</h1>

                {/* Main content: left current weather, right forecast */}
                <div className="flex flex-col md:flex-row gap-6">
                    {/* Left: Current weather block */}
                    {currentWeatherIsLoading ? (<LoadingIndicator />) : (

                        <section className="md:w-2/3 bg-white rounded-xl shadow p-6">
                            <h2 className="text-lg font-semibold text-gray-600 mb-4">Current weather</h2>

                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                                <div className="flex-1 text-center md:text-left">
                                    <div className="text-6xl font-extrabold text-gray-800">{trunkTemperature(dataCurrentWeather!.main.temp)} °C</div>
                                    <p className="text-sm text-gray-500 mt-1">{dataCurrentWeather!.weather[0].description} · {convertDatestampToHumanDate(dataCurrentWeather!.dt).fullDate}</p>
                                </div>

                                <div className="w-full md:w-1/2 bg-blue-50 rounded-lg p-4">
                                    <h3 className="text-sm font-semibold text-gray-600 mb-3">Details</h3>
                                    <div className="grid grid-cols-2 gap-3">
                                        <DetailRow Icon={FaTemperatureFull} label="Feels like" value={`${trunkTemperature(dataCurrentWeather!.main.feels_like)} °C`} />
                                        <DetailRow Icon={FaWind} label="Wind" value={`${trunkTemperature(dataCurrentWeather!.wind.speed)} km/h`} />
                                        <DetailRow Icon={FaCloudRain} label="Humidity" value={`${trunkTemperature(dataCurrentWeather!.main.humidity)} %`} />
                                        <DetailRow Icon={FaEye} label="Visibility" value={`${trunkTemperature(dataCurrentWeather!.visibility)} km`} />
                                    </div>
                                </div>
                            </div>
                        </section>
                    )}

                    <aside className="md:w-1/3 bg-white rounded-xl shadow p-4">
                        <h2 className="text-lg font-semibold text-gray-600 mb-3">Forecast</h2>

                        <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2">
                            {isLoading ? (<LoadingIndicator />) : data?.list.map((forecast) => (
                                <div key={forecast.dt_txt} className="flex items-center justify-between bg-gray-50 rounded-md p-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                            <FaCloud />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-700">{convertDatestampToHumanDate(forecast.dt).fullDate} </p>
                                            <p className="text-sm font-medium text-gray-700">{convertDatestampToHumanDate(forecast.dt).time} </p>
                                            <div className="text-xs text-gray-500">{forecast.weather[0].main}</div>
                                        </div>
                                    </div>
                                    <div className="text-lg font-semibold text-gray-800">{forecast.main.temp} °C</div>
                                </div>
                            )
                            )}
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    )
}

interface DetailRowProps {
    Icon: IconType
    label: string
    value: string
}

const DetailRow = ({ Icon, label, value }: DetailRowProps) => (
    <div className="flex items-center gap-2">
        <div className="p-1 text-gray-600">
            <Icon />
        </div>
        <div>
            <div className="text-xs text-gray-500">{label}</div>
            <div className="font-semibold text-sm text-gray-700">{value}</div>
        </div>
    </div>
)
