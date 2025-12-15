import { useNavigate } from "react-router-dom";
import { FaCloud, FaCloudRain, FaEye, FaWind } from "react-icons/fa";
import type { CityWeatherDetails } from "../../places/types/commonTypes";
import { FaTemperatureFull } from "react-icons/fa6";
import type { IconType } from "react-icons";
import { trunkTemperature } from "../../../utils/weatherUtils";
import { convertDatestampToHumanDate } from "../../../utils/dateConverter";

interface CityWeatherCardProps {
  data: CityWeatherDetails;
}

export function CityWeatherCard({ data }: CityWeatherCardProps) {
  const { country, name, weather } = data
  const navigate = useNavigate()
  const lat = weather.coord.lat
  const lon = weather.coord.lon


  const date = convertDatestampToHumanDate(weather.dt)
  return (
    <button
      type="button"
      onClick={() => navigate(`/city?lat=${lat}&lon=${lon}&cityName=${name}&country=${country}`)}
      className="bg-linear-to-br from-blue-400 to-blue-400 rounded-xl shadow-lg p-6 max-w-sm text-white"
    >
      <h1 className="text-3xl font-bold text-center mb-2">{name}</h1>
      <p className="text-center text-white-100 font-semibold text-md mb-1">{date.fullDate}</p>
      <p className="text-center text-white-100 font-medium text-sm mb-1">{date.time}</p>

      <div className="text-center mb-2 rounded-lg py-4">
        <p className="text-6xl font-bold mb-2">{trunkTemperature(weather.main.temp)} °c</p>
        <p className="text-lg text-blue-50 flex items-center justify-center gap-2">
          <FaCloud />
          {weather.weather[0].description}
        </p>
      </div>

      <div className="flex justify-between w-full mb-4 px-1">
        <TemperatureRange
          name="Min"
          value={trunkTemperature(weather.main.temp_min)}
        />
        <TemperatureRange
          name="Max"
          value={trunkTemperature(weather.main.temp_max)}
        />
      </div>

      <div className="bg-blue-500 rounded-lg p-4 py-2">
        <h2 className="text-sm font-semibold uppercase text-blue-100 mb-4 text-center">
          Details
        </h2>

        <div className="grid grid-cols-2 gap-4">
          <CategoryDetails
            Icon={FaTemperatureFull}
            categoryName="Feels like"
            value={`${trunkTemperature(weather.main.feels_like)} °c`}
          />
          <CategoryDetails
            Icon={FaWind}
            categoryName="Wind"
            value={`${trunkTemperature(weather.wind.speed)} km/h`}
          />
          <CategoryDetails
            Icon={FaCloudRain}
            categoryName="Humidity"
            value={`${trunkTemperature(weather.main.humidity)} %`}
          />
          <CategoryDetails
            Icon={FaEye}
            categoryName="Visibiliy"
            value={`${weather.visibility} km`}
          />
        </div>
      </div>
    </button>
  );
};

interface TemperatureRangeProps {
  name: string;
  value: number
}

const TemperatureRange = ({ name, value }: TemperatureRangeProps) => {
  return (
    <div className="grid grid-cols-2 items-center">
      <p className="text-sm text-white">{name}:</p>
      <p className="text-lg text-white font-bold">{value} °c</p>
    </div>
  )
}

interface CategoryDetailsProps {
  Icon: IconType;
  categoryName: string;
  value: string;
}
const CategoryDetails = ({ Icon, categoryName, value }: CategoryDetailsProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="p-1">
        <Icon />
      </div>
      <div>
        <p className="text-sm text-blue-100">{categoryName}</p>
        <p className="font-bold text-lg"> {value}</p>
      </div>
    </div>
  )
}