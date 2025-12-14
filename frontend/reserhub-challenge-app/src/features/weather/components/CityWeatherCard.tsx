import React from "react";
import { FaCloud, FaCloudRain, FaEye, FaWind } from "react-icons/fa";


interface WeatherData {
  city: string;
  date: string;
  temperature: number;
  description: string;
  windSpeed: number;
  feelsLike: number;
  humidity: number;
  visibility: number;
  pressure: number;
}

interface CityWeatherCardProps {
  weather?: WeatherData;
}

export function CityWeatherCard({ weather }: CityWeatherCardProps) {
  const defaultWeather: WeatherData = {
    city: "Madrid",
    date: new Date().toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    temperature: 22,
    description: "Parcialmente nublado",
    windSpeed: 12,
    feelsLike: 20,
    humidity: 65,
    visibility: 10,
    pressure: 1013,
  };

  const data = weather || defaultWeather;

  return (
    <div className="bg-linear-to-br from-blue-400 to-blue-400 rounded-xl shadow-lg p-6 max-w-sm text-white">
      <h1 className="text-3xl font-bold text-center mb-2">{data.city}</h1>
      <p className="text-center text-blue-100 text-sm mb-6">{data.date}</p>


      <div className="text-center mb-8 rounded-lg py-6">
        <div className="text-6xl font-bold mb-2">{data.temperature}°C</div>
        <p className="text-lg text-blue-50 flex items-center justify-center gap-2">
          <FaCloud />
          {data.description}
        </p>
      </div>


      <div className="bg-blue-500 rounded-lg p-4 space-y-3">
        <h2 className="text-sm font-semibold uppercase text-blue-100 mb-4">
          Detalles
        </h2>

        <div className="grid grid-cols-2 gap-4">

          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg">
              <FaCloud />
            </div>
            <div>
              <p className="text-xs text-blue-100">Sensación térmica</p>
              <p className="font-semibold">{data.feelsLike}°C</p>
            </div>
          </div>


          <div className="flex items-center gap-3">
            <div className=" p-2 rounded-lg">
              <FaWind />
            </div>
            <div>
              <p className="text-xs text-blue-100">Viento</p>
              <p className="font-semibold">{data.windSpeed} km/h</p>
            </div>
          </div>


          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg">
              <FaCloudRain />
            </div>
            <div>
              <p className="text-xs text-blue-100">Humedad</p>
              <p className="font-semibold">{data.humidity}%</p>
            </div>
          </div>


          <div className="flex items-center gap-3">
            <div className="p-2 rounded-lg">
              <FaEye />
            </div>
            <div>
              <p className="text-xs text-blue-100">Visibilidad</p>
              <p className="font-semibold">{data.visibility} km</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
