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

export const CurrentWeatherNew = ({ weather, isError, isLoading }: CurrentWeatherDetailsProps) => {
    let body;
    if (isLoading) {
        body = <LoadingIndicator />
    }

    if (isError) {
        body = <p>Sorry, we can't fetch the data</p>
    }

    const date = weather?.dt ? convertDatestampToHumanDate(weather?.dt) : undefined
    if (!isLoading && weather) {
        body = (
            <div className="flex flex-row items-center gap-4 md:gap-25 w-auto mt-5">
                <div className="flex-1 text-center">
                    <div className="text-8xl font-bold text-white text-center mt-5">{trunkTemperature(weather.main.temp)} °c</div>
                    <p className="text-lg font-semibold text-white mt-1 text-center">{weather.weather[0].description}</p>
                    <div className="flex justify-between w-full mb-4 mt-6 pl-3 pr-3">
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

                <div className="p-4">
                    <div className="grid grid-cols-2 gap-8 justify-items-center items-center">
                        <DetailRow Icon={FaTemperatureFull} label="Feels like" value={`${trunkTemperature(weather.main.feels_like)} °c`} />
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
        <section className="w-full p-6 ">
            <div className="justify-items-center">
                <h3 className="text-lg font-semibold text-gray-200">{date?.fullDate || ''} </h3>
                <h3 className="text-lg font-semibold text-gray-200">{date?.time || ''} </h3>
            </div>
            <div className="w-full justify-items-center">
                {body}
            </div>
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
        <div className="grid grid-cols-1 items-center justify-items-center">
            <div className="flex grid-cols-2 items-center gap-1">
                <Icon className="text-gray-200" />
                <p className="text-md text-gray-200">{name}</p>
            </div>
            <p className="text-3xl text-gray-200 font-bold">{value} °c</p>
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
        <div className="p-1 text-yellow-500">
            <Icon />
        </div>
        <div>
            <div className="text-lg font-medium text-gray-300">{label}</div>
            <div className="text-2xl font-semibold text-gray-100">{value}</div>
        </div>
    </div>
)


