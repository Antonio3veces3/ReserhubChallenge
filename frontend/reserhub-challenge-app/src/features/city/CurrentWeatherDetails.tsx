import type { IconType } from "react-icons"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { convertDatestampToHumanDate } from "../../utils/dateConverter"
import { trunkTemperature } from "../../utils/weatherUtils"
import type { IWeather } from "../places/types/commonTypes"
import { FaTemperatureFull } from "react-icons/fa6"
import { FaCloudRain, FaEye, FaWind } from "react-icons/fa"

interface CurrentWeatherDetailsProps {
    isLoading: boolean,
    isError: boolean
    weather?: IWeather,
}

export const CurrentWeatherDetails = ({ weather, isError, isLoading }: CurrentWeatherDetailsProps) => {
    let body;
    if (isLoading) {
        body = <LoadingIndicator />
    }

    if (isError) {
        body = <p>Sorry, we can't fetch the data</p>
    }

    if (!isLoading && weather) {
        const date = convertDatestampToHumanDate(weather.dt)
        body = (
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
                <div className="flex-1 text-center md:text-left">
                    <div className="text-6xl font-extrabold text-gray-800">{trunkTemperature(weather.main.temp)} °C</div>
                    <p className="text-sm text-gray-500 mt-1">{weather.weather[0].description} </p>
                    <p className="text-sm text-gray-500 mt-1">{date.fullDate} </p>
                    <p className="text-sm text-gray-500 mt-1">{date.time}</p>
                </div>

                <div className="w-full md:w-1/2 bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-semibold text-gray-600 mb-3">Details</h3>
                    <div className="grid grid-cols-2 gap-3">
                        <DetailRow Icon={FaTemperatureFull} label="Feels like" value={`${trunkTemperature(weather.main.feels_like)} °C`} />
                        <DetailRow Icon={FaWind} label="Wind" value={`${trunkTemperature(weather.wind.speed)} km/h`} />
                        <DetailRow Icon={FaCloudRain} label="Humidity" value={`${trunkTemperature(weather.main.humidity)} %`} />
                        <DetailRow Icon={FaEye} label="Visibility" value={`${trunkTemperature(weather.visibility)} km`} />
                    </div>
                </div>
            </div>)
    }
    return (
        <section className="md:w-1/2 bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold text-gray-600 mb-4">Current weather</h2>

            {body}
        </section>
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


