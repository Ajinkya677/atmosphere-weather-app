import { Cloud, CloudFog, CloudRain, CloudSnow, Sun } from "lucide-react";
import type { DailyForecast } from "@/types/weather";
import { formatDayName } from "@/lib/utils";

const iconMap = {
  Clear: Sun,
  Clouds: Cloud,
  Rain: CloudRain,
  Drizzle: CloudRain,
  Thunderstorm: CloudRain,
  Snow: CloudSnow,
  Mist: CloudFog,
  Fog: CloudFog,
  Haze: CloudFog,
  Smoke: CloudFog,
  Sunrise: Sun,
  Sunset: Sun,
};

interface ForecastRowProps {
  day: DailyForecast;
  timezoneOffset: number;
}

export function ForecastRow({ day, timezoneOffset }: ForecastRowProps) {
  const Icon = iconMap[day.condition] ?? Cloud;

  return (
    <div className="glass fade-border flex items-center justify-between rounded-2xl px-4 py-3 sm:px-5 sm:py-4 transition hover:bg-white/15">
      <div className="flex items-center gap-3">
        <Icon className="h-6 w-6 text-white/80" aria-hidden />
        <div>
          <p className="text-sm font-semibold">{formatDayName(day.date, timezoneOffset)}</p>
          <p className="text-xs text-white/60">{day.description}</p>
        </div>
      </div>
      <div className="flex items-center gap-3 text-sm sm:text-base">
        <span className="font-semibold">{Math.round(day.max)}°</span>
        <span className="text-white/60">{Math.round(day.min)}°</span>
      </div>
    </div>
  );
}

