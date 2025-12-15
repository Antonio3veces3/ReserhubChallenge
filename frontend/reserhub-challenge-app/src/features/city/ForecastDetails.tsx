import { FaCloud, FaEye, FaWater, FaWind } from "react-icons/fa";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import type { ForecastItem } from "../weather/types/types"
import { convertDatestampToHumanDate } from "../../utils/dateConverter";
import type { IconType } from "react-icons";
import { trunkTemperature } from "../../utils/weatherUtils";


interface ForecastWeatherDetailsProps {
    isLoading: boolean,
    isError: boolean
    forecastList?: ForecastItem[],
}

export const ForecastDetails = ({ isLoading, isError, forecastList }: ForecastWeatherDetailsProps) => {
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
                <div key={forecast.dt_txt} className="flex items-center justify-between bg-gray-50 rounded-md p-4 border border-gray-200 min-h-24">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                            <FaCloud />
                        </div>
                        <div className="flex flex-col gap-2">
                            <p className="text-md font-medium text-gray-700">{convertDatestampToHumanDate(forecast.dt).fullDate} </p>
                            <p className="text-sm font-medium text-gray-700">{convertDatestampToHumanDate(forecast.dt).time} </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-semibold text-blue-900">
                            {trunkTemperature(forecast.main.temp)} °C
                        </p>
                        <p className="text-sm font-medium text-blue-900">
                            {forecast.weather[0].description}
                        </p>
                    </div>
                    <div className="border border-blue-300 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md">
                        <FaWater className="text-sm text-blue-600" />
                        <p className="text-sm font-semibold text-blue-600">{forecast.main.humidity} %</p>
                    </div>
                    <div className="border border-orange-300 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md">
                        <FaEye className="text-sm text-orange-600" />
                        <p className="text-sm font-semibold text-orange-600">{forecast.visibility} km</p>
                    </div>
                    <div className="border border-sky-300 flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-md">
                        <FaWind className="text-sm text-sky-600" />
                        <p className="text-sm font-semibold text-sky-600">{forecast.wind.speed} km/h</p>
                    </div>

                </div>
            )
            )
        )
    }



    return (
        <aside className="md:w-1/2 bg-white rounded-xl shadow-2xl p-6">
            <h2 className="text-xl font-bold text-gray-600 mb-4">Forecast</h2>

            <div className="flex flex-col gap-3 max-h-96 overflow-y-auto pr-2">
                {body}
            </div>
        </aside>
    )
}