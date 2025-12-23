import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { WeatherCondition } from "@/types/weather";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getGradientByCondition(condition?: WeatherCondition) {
  switch (condition) {
    case "Clear":
      return "bg-gradient-to-br from-sky-500/70 via-cyan-500/70 to-blue-800";
    case "Clouds":
      return "bg-gradient-to-br from-slate-600/80 via-slate-800 to-slate-950";
    case "Rain":
    case "Drizzle":
      return "bg-gradient-to-br from-slate-700 via-slate-900 to-slate-950";
    case "Thunderstorm":
      return "bg-gradient-to-br from-slate-800 via-slate-900 to-black";
    case "Snow":
      return "bg-gradient-to-br from-slate-200/30 via-slate-500/40 to-slate-800";
    case "Mist":
    case "Fog":
    case "Haze":
    case "Smoke":
      return "bg-gradient-to-br from-slate-500/60 via-slate-700/70 to-slate-900";
    case "Sunset":
    case "Sunrise":
      return "bg-gradient-to-br from-orange-400/80 via-pink-500/70 to-purple-800/90";
    default:
      return "bg-gradient-to-br from-slate-900 via-slate-950 to-black";
  }
}

const applyOffset = (date: Date, timezoneOffsetSeconds = 0) => {
  // Convert the original UTC timestamp to the target local time using its offset,
  // independent of the viewer's local timezone.
  const utc = date.getTime() + date.getTimezoneOffset() * 60_000;
  return new Date(utc + timezoneOffsetSeconds * 1000);
};

export function formatDayName(timestamp: number, timezoneOffset = 0) {
  const date = new Date(timestamp * 1000);
  const local = applyOffset(date, timezoneOffset);
  return local.toLocaleDateString(undefined, { weekday: "short" });
}

export function formatTime(timestamp: number, timezoneOffset = 0) {
  const date = new Date(timestamp * 1000);
  const local = applyOffset(date, timezoneOffset);
  return local.toLocaleTimeString(undefined, {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function capitalize(text: string) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

