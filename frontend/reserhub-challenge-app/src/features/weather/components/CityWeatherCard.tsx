import React, { useEffect, useEffectEvent } from "react";
import { FaCloud, FaCloudRain, FaEye, FaWind } from "react-icons/fa";
import type { CityWeatherDetails } from "../../places/types/commonTypes";
import { FaTemperatureFull } from "react-icons/fa6";
import type { IconType } from "react-icons";

interface CityWeatherCardProps {
  data: CityWeatherDetails;
}

export function CityWeatherCard({ data }: CityWeatherCardProps) {
  const { country, name, weather } = data

  return (
    <div className="bg-linear-to-br from-blue-400 to-blue-400 rounded-xl shadow-lg p-6 max-w-sm text-white">
      <h1 className="text-3xl font-bold text-center mb-2">{name}</h1>
      <p className="text-center text-blue-100 text-sm mb-1">{weather.dt}</p>

      <div className="text-center mb-2 rounded-lg py-4">
        <div className="text-6xl font-bold mb-2">{removeDecimalValues(weather.main.feels_like)} °C</div>
        <p className="text-lg text-blue-50 flex items-center justify-center gap-2">
          <FaCloud />
          {weather.weather[0].main}
        </p>
      </div>

      <div className="flex justify-between w-full mb-4 px-1">
        <TemperatureRange
          name="Min"
          value={removeDecimalValues(weather.main.temp_min)}
        />
        <TemperatureRange
          name="Max"
          value={removeDecimalValues(weather.main.temp_max)}
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
            value={`${removeDecimalValues(weather.main.feels_like)} °C`}
          />
          <CategoryDetails
            Icon={FaWind}
            categoryName="Wind"
            value={`${removeDecimalValues(weather.wind.speed)} km/h`}
          />
          <CategoryDetails
            Icon={FaCloudRain}
            categoryName="Humidity"
            value={`${removeDecimalValues(weather.main.humidity)} %`}
          />
          <CategoryDetails
            Icon={FaEye}
            categoryName="Visibiliy"
            value={`${weather.visibility} km`}
          />
        </div>
      </div>
    </div>
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
      <p className="text-lg text-white font-bold">{value} °C</p>
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

const removeDecimalValues = (number: number): number => {
  return Math.trunc(number);
}