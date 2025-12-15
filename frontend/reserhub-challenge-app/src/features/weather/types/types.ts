import type {
  MainWeather,
  WeatherDescription,
  Wind,
} from "../../places/types/commonTypes";

export interface CityCoordenates {
  lat: number;
  lon: number;
}

export interface ForecastItem {
  dt: number;
  main: MainWeather;
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: Wind;
  visibility: number;
  pop: number;
  dt_txt: string;
}

export interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: "MX";
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastData {
  list: ForecastItem[];
  city: City;
}
