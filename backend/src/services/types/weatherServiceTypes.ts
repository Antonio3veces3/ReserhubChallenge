export interface Weather {
  id: number;
  main: string;
  description: string;
  icon: string;
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

export interface CurrentWeather {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Weather[];
  main: MainWeather;
  wind: {
    speed: number;
    deg: number;
  };
  rain: {
    '1h': number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    country: string;
    sunrise: number;
    sunset: number;
    pod: string;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface ForecastWeatherDetails extends CurrentWeather {
  pop: number;
  dt_txt: '2025-12-14 03:00:00';
}

export interface City {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: 'MX';
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
}

export interface ForecastWeather {
  list: ForecastWeatherDetails[];
  city: City;
}
