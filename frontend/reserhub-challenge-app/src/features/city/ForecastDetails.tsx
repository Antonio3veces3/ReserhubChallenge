import { FaCloud } from "react-icons/fa";
import { LoadingIndicator } from "../../components/LoadingIndicator";
import type { ForecastItem } from "../weather/types/types"
import { convertDatestampToHumanDate } from "../../utils/dateConverter";


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
            )
        )
    }

    return (
        <aside className="md:w-1/2 bg-white rounded-xl shadow p-4">
            <h2 className="text-lg font-semibold text-gray-600 mb-3">Forecast</h2>

            <div className="flex flex-col gap-3 max-h-64 overflow-y-auto pr-2">
                {body}
            </div>
        </aside>
    )
}