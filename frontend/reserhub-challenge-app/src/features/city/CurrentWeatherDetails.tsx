import type { IconType } from "react-icons"
import { LoadingIndicator } from "../../components/LoadingIndicator"
import { convertDatestampToHumanDate } from "../../utils/dateConverter"
import { trunkTemperature } from "../../utils/weatherUtils"
import type { IWeather } from "../places/types/commonTypes"
import { FaTemperatureFull } from "react-icons/fa6"
import { FaCloud, FaEye, FaThermometerEmpty, FaThermometerFull, FaUmbrellaBeach, FaWater, FaWind } from "react-icons/fa"

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
                    <p className="text-lg font-semibold text-gray-600">{date.fullDate} </p>
                    <p className="text-lg font-semibold text-gray-600">{date.time}</p>
                    <div className="text-8xl font-bold text-blue-900 text-center mt-5">{trunkTemperature(weather.main.temp)} °C</div>
                    <p className="text-lg font-semibold text-blue-900 mt-1 text-center">{weather.weather[0].description}</p>
                    <div className="flex justify-between w-full mb-4  mt-5 pl-3 pr-3">
                        <TemperatureRange
                            name="Min"
                            value={trunkTemperature(weather.main.temp_min)}
                            Icon={FaThermometerEmpty}
                        />
                        <TemperatureRange
                            name="Max"
                            value={trunkTemperature(weather.main.temp_max)}
                            Icon={FaThermometerFull}
                        />
                    </div>
                </div>

                <div className="w-full md:w-1/2 bg-blue-50 rounded-lg p-4">
                    <h3 className="text-sm font-bold text-gray-600 mb-3">Details</h3>
                    <div className="grid grid-cols-2 gap-8">
                        <DetailRow Icon={FaTemperatureFull} label="Feels like" value={`${trunkTemperature(weather.main.feels_like)} °C`} />
                        <DetailRow Icon={FaWind} label="Wind" value={`${trunkTemperature(weather.wind.speed)} km/h`} />
                        <DetailRow Icon={FaWater} label="Humidity" value={`${trunkTemperature(weather.main.humidity)} %`} />
                        <DetailRow Icon={FaEye} label="Visibility" value={`${trunkTemperature(weather.visibility)} km`} />
                        <DetailRow Icon={FaUmbrellaBeach} label="Sea level" value={`${weather.main.sea_level} hPa`} />
                        <DetailRow Icon={FaCloud} label="Cloud %" value={`${weather.clouds.all} %`} />

                    </div>
                </div>
            </div>)
    }
    return (
        <section className="md:w-1/2 bg-white rounded-xl shadow-2xl p-6 ">
            <h2 className="text-xl font-bold text-gray-600 mb-4 mt-">Current weather</h2>
            {body}
        </section>
    )
}

interface TemperatureRangeProps {
    Icon: IconType;
    name: string;
    value: number
}

const TemperatureRange = ({ name, value, Icon }: TemperatureRangeProps) => {
    return (
        <div className="grid grid-cols-1 items-center">
            <div className="flex grid-cols-2 items-center gap-1">
                <Icon className="text-sky-800" />
                <p className="text-lg text-sky-800">{name}</p>
            </div>
            <p className="text-3xl text-sky-900 font-bold">{value} °C</p>
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
        <div className="p-1 text-gray-800">
            <Icon />
        </div>
        <div>
            <div className="text-lg font-medium text-gray-500">{label}</div>
            <div className="text-2xl font-semibold text-gray-700">{value}</div>
        </div>
    </div>
)


