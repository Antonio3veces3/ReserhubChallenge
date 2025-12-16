import { FaCloud, FaEye, FaWater, FaWind } from "react-icons/fa";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import type { ForecastItem } from "../weather/types/types"
import { convertDatestampToHumanDate } from "../../utils/dateConverter";
import { trunkTemperature } from "../../utils/weatherUtils";


interface ForecastWeatherDetailsProps {
    isLoading: boolean,
    isError: boolean
    forecastList?: ForecastItem[],
}

export const ForecastNew = ({ isLoading, isError, forecastList }: ForecastWeatherDetailsProps) => {
    let body;
    if (isLoading) {
        body = <LoadingIndicator />
    }

    if (isError) {
        body = <p>Sorry, we can't fetch the data</p>
    }

    if (!isLoading && forecastList) {
        body = (
            forecastList?.map((forecast) => (
                <div key={forecast.dt_txt} className="flex items-center bg-gray-50 rounded-md pl-4 pr-4 pb-1 border-gray-200 min-h-24 w-fit border">
                    <div className="flex flex-col text-center pt-2">
                        <div className="flex flex-col">
                            <p className="text-sm font-medium text-gray-700 2xl:text-lg whitespace-nowrap">{convertDatestampToHumanDate(forecast.dt, true).fullDate} </p>
                            <p className="text-sm font-medium text-gray-500">{convertDatestampToHumanDate(forecast.dt, true).time} </p>
                        </div>

                        <div className="flex flex-col items-center gap-2 mt-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <FaCloud />
                            </div>
                            <div className="flex flex-col items-center content-end">
                                <p className="text-lg font-semibold text-blue-900 2xl:text-2xl">
                                    {trunkTemperature(forecast.main.temp)} °c
                                </p>
                                <p className="text-sm font-medium text-blue-900 text-center">
                                    {forecast.weather[0].description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between pt-4">
                            <div className="flex flex-col items-center justify-center gap-1 px-3 rounded-md">
                                <FaWater className="text-sm text-blue-600" />
                                <p className="text-center text-sm font-semibold text-blue-600 whitespace">{forecast.main.humidity} %</p>
                            </div>
                            <div className=" flex flex-col items-center justify-center gap-1 px-3 rounded-md">
                                <FaEye className="text-sm text-orange-600" />
                                <p className="text-center text-sm font-semibold text-orange-600 whitespace">{trunkTemperature(forecast.visibility / 1000)}k Km</p>
                            </div>
                            <div className=" flex flex-col items-center justify-center gap-1 px-3 rounded-md">
                                <FaWind className="text-sm text-sky-600" />
                                <p className="text-center text-sm font-semibold text-sky-600 whitespace">{forecast.wind.speed} km/h</p>
                            </div>
                        </div>
                    </div>
                </div>
            )
            )
        )
    }



    return (
        <aside className="w-full 2xl:w-6/7 mr-0 ml-0 lg:mr-10 lg:ml-10 bg-white rounded-xl shadow-2xl p-6">
            <div className="flex flex-row gap-5 max-h-96 overflow-x-auto pr-2 pb-4">
                {body}
            </div>
        </aside>
    )
}