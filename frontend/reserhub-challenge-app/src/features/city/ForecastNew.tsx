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
                <div key={forecast.dt_txt} className="flex items-center justify-between bg-gray-50 rounded-md pl-4 pt-4 pb-4  border-gray-200 min-h-24">
                    <div className="flex flex-row w-1/2 justify-between">
                        {/* date */}
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                                <FaCloud />
                            </div>
                            <div className="flex flex-col gap-2">
                                <p className="text-sm font-medium text-gray-700 2xl:text-lg">{convertDatestampToHumanDate(forecast.dt, true).fullDate} </p>
                                <p className="text-sm font-medium text-gray-700">{convertDatestampToHumanDate(forecast.dt, true).time} </p>
                            </div>
                        </div>

                        {/* temperature */}
                        <div className="flex flex-col items-center content-end">
                            <p className="text-lg font-semibold text-blue-900 2xl:text-2xl">
                                {trunkTemperature(forecast.main.temp)} °c
                            </p>
                            <p className="text-sm font-medium text-blue-900 text-center">
                                {forecast.weather[0].description}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-row w-1/2 justify-around pl-2">
                        {/* details */}
                        <div className="border border-blue-300 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md">
                            <FaWater className="text-sm text-blue-600" />
                            <p className="text-center text-sm font-semibold text-blue-600">{forecast.main.humidity} %</p>
                        </div>
                        <div className="border border-orange-300 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md">
                            <FaEye className="text-sm text-orange-600" />
                            <p className="text-center text-sm font-semibold text-orange-600">{trunkTemperature(forecast.visibility / 1000)}k Km</p>
                        </div>
                        <div className="border border-sky-300 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md">
                            <FaWind className="text-sm text-sky-600" />
                            <p className="text-center text-sm font-semibold text-sky-600">{forecast.wind.speed} km/h</p>
                        </div>
                    </div>
                </div>
            )
            )
        )
    }



    return (
        <aside className="xl:w-1/2 bg-white rounded-xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-gray-600 mb-4">Forecast</h2>

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
                {body}
            </div>
        </aside>
    )
}