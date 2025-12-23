import type {
  DailyForecast,
  WeatherApiCurrent,
  WeatherApiDaily,
  WeatherCondition,
  WeatherData,
} from "@/types/weather";
import { capitalize } from "./utils";

const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

const API_BASE = "https://api.openweathermap.org/data/2.5";
const ONE_CALL_BASE = "https://api.openweathermap.org/data/3.0/onecall";

export const isLiveApiAvailable = Boolean(API_KEY);

const MOCK_WEATHER: WeatherData = {
  city: "San Francisco",
  country: "US",
  description: "Gentle coastal breeze",
  condition: "Clouds",
  temperature: 18,
  tempMin: 15,
  tempMax: 21,
  feelsLike: 18,
  humidity: 72,
  windSpeed: 4.6,
  visibility: 9000,
  pressure: 1014,
  sunrise: 1724390400,
  sunset: 1724439600,
  timezoneOffset: -25200,
  updatedAt: Math.floor(Date.now() / 1000),
  coords: { lat: 37.7749, lon: -122.4194 },
  daily: [
    {
      date: 1724390400,
      min: 14,
      max: 19,
      description: "Low clouds clearing",
      condition: "Clouds",
      icon: "04d",
    },
    {
      date: 1724476800,
      min: 14,
      max: 20,
      description: "Sun breaks with breeze",
      condition: "Clear",
      icon: "01d",
    },
    {
      date: 1724563200,
      min: 15,
      max: 21,
      description: "Coastal fog at dawn",
      condition: "Fog",
      icon: "50d",
    },
    {
      date: 1724649600,
      min: 15,
      max: 22,
      description: "Bright and calm",
      condition: "Clear",
      icon: "01d",
    },
    {
      date: 1724736000,
      min: 16,
      max: 23,
      description: "High clouds drifting",
      condition: "Clouds",
      icon: "02d",
    },
    {
      date: 1724822400,
      min: 16,
      max: 22,
      description: "Light drizzle possible",
      condition: "Drizzle",
      icon: "09d",
    },
    {
      date: 1724908800,
      min: 15,
      max: 21,
      description: "Cooler marine layer",
      condition: "Mist",
      icon: "50d",
    },
  ],
  source: "mock",
};

const mapCondition = (value: string | undefined): WeatherCondition => {
  switch ((value || "").toLowerCase()) {
    case "clear":
      return "Clear";
    case "clouds":
      return "Clouds";
    case "rain":
      return "Rain";
    case "drizzle":
      return "Drizzle";
    case "thunderstorm":
      return "Thunderstorm";
    case "snow":
      return "Snow";
    case "mist":
    case "haze":
      return "Haze";
    case "smoke":
      return "Smoke";
    case "fog":
      return "Fog";
    default:
      return "Clouds";
  }
};

const fetchJson = async <T>(url: string): Promise<T> => {
  const res = await fetch(url);
  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || `Request failed with status ${res.status}`);
  }
  return res.json();
};

const toDailyForecasts = (payload: WeatherApiDaily, conditionOverride?: WeatherCondition) =>
  (payload.daily || []).slice(0, 7).map<DailyForecast>((day) => {
    const primary = day.weather?.[0];
    return {
      date: day.dt,
      min: Math.round(day.temp.min),
      max: Math.round(day.temp.max),
      description: capitalize(primary?.description || "Calm sky"),
      condition: conditionOverride ?? mapCondition(primary?.main),
      icon: primary?.icon || "02d",
    };
  });

const normalizeWeather = (
  current: WeatherApiCurrent,
  daily: WeatherApiDaily
): WeatherData => {
  const primary = current.weather?.[0];
  const condition = mapCondition(primary?.main);
  const timezoneOffset = daily.timezone_offset ?? current.timezone ?? 0;

  return {
    city: current.name,
    country: current.sys.country,
    description: capitalize(primary?.description || "Calm sky"),
    condition,
    temperature: Math.round(current.main.temp),
    tempMin: Math.round(current.main.temp_min),
    tempMax: Math.round(current.main.temp_max),
    feelsLike: Math.round(current.main.feels_like),
    humidity: current.main.humidity,
    windSpeed: current.wind.speed,
    visibility: current.visibility,
    pressure: current.main.pressure,
    sunrise: current.sys.sunrise,
    sunset: current.sys.sunset,
    timezoneOffset,
    updatedAt: Math.floor(Date.now() / 1000),
    coords: { lat: current.coord.lat, lon: current.coord.lon },
    daily: toDailyForecasts(daily, condition),
    source: "live",
  };
};

export const getMockWeather = () => ({ ...MOCK_WEATHER, updatedAt: Math.floor(Date.now() / 1000) });

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  if (!API_KEY) {
    return getMockWeather();
  }

  const currentUrl = `${API_BASE}/weather?q=${encodeURIComponent(
    city
  )}&units=metric&appid=${API_KEY}`;
  const current = await fetchJson<WeatherApiCurrent>(currentUrl);

  const dailyUrl = `${ONE_CALL_BASE}?lat=${current.coord.lat}&lon=${current.coord.lon}&exclude=hourly,minutely,alerts&units=metric&appid=${API_KEY}`;
  const daily = await fetchJson<WeatherApiDaily>(dailyUrl);

  return normalizeWeather(current, daily);
}

export async function fetchWeatherByCoords(lat: number, lon: number): Promise<WeatherData> {
  if (!API_KEY) {
    return getMockWeather();
  }

  const currentUrl = `${API_BASE}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
  const current = await fetchJson<WeatherApiCurrent>(currentUrl);

  const dailyUrl = `${ONE_CALL_BASE}?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=metric&appid=${API_KEY}`;
  const daily = await fetchJson<WeatherApiDaily>(dailyUrl);

  return normalizeWeather(current, daily);
}

