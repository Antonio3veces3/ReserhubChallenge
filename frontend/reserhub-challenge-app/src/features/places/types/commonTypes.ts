export type Order = "ASC" | "DESC";

interface Coord {
  lon: number;
  lat: number;
}

export interface WeatherDescription {
  main: string;
  description: string;
}

export interface MainWeather {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface IWeather {
  coord: Coord;
  weather: WeatherDescription[];
  main: MainWeather;
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  };
  sys: {
    country?: string;
  };
  dt: number;
  timezone: number;
  name: string;
}

export interface CityWeatherDetails {
  country: string;
  name: string;
  weather?: IWeather;
}
