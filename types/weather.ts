export type WeatherCondition =
  | "Clear"
  | "Clouds"
  | "Rain"
  | "Drizzle"
  | "Thunderstorm"
  | "Snow"
  | "Mist"
  | "Fog"
  | "Haze"
  | "Smoke"
  | "Sunset"
  | "Sunrise";

export interface DailyForecast {
  date: number;
  min: number;
  max: number;
  description: string;
  condition: WeatherCondition;
  icon: string;
}

export interface WeatherData {
  city: string;
  country: string;
  description: string;
  condition: WeatherCondition;
  temperature: number;
  tempMin: number;
  tempMax: number;
  feelsLike: number;
  humidity: number;
  windSpeed: number;
  visibility: number;
  pressure: number;
  sunrise: number;
  sunset: number;
  timezoneOffset: number;
  updatedAt: number;
  coords: {
    lat: number;
    lon: number;
  };
  daily: DailyForecast[];
  source: "live" | "mock";
}

export interface WeatherApiCurrent {
  coord: { lat: number; lon: number };
  weather: { main: string; description: string; icon: string }[];
  main: { temp: number; feels_like: number; temp_min: number; temp_max: number; pressure: number; humidity: number };
  visibility: number;
  wind: { speed: number };
  sys: { country: string; sunrise: number; sunset: number };
  timezone: number;
  name: string;
}

export interface WeatherApiDaily {
  daily: {
    dt: number;
    temp: { min: number; max: number };
    weather: { main: string; description: string; icon: string }[];
  }[];
  timezone_offset: number;
}

