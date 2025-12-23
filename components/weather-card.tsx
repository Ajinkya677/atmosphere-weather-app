import type { ComponentType } from "react";
import { ArrowDown, ArrowUp, Cloud, CloudFog, CloudRain, CloudSnow, MoonStar, Sun } from "lucide-react";
import type { WeatherData, WeatherCondition } from "@/types/weather";
import { cn, formatTime } from "@/lib/utils";

const conditionIcon: Record<WeatherCondition, ComponentType<{ className?: string }>> = {
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
  Sunset: MoonStar,
};

export function WeatherCard({ weather }: { weather: WeatherData }) {
  const Icon = conditionIcon[weather.condition] ?? Sun;

  return (
    <section className="glass rounded-3xl p-6 sm:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.3em] text-white/60">Currently</p>
          <div className="flex items-center gap-4">
            <Icon className="h-12 w-12 text-white drop-shadow-glow" aria-hidden />
            <div>
              <p className="text-5xl sm:text-6xl font-semibold leading-tight">
                {Math.round(weather.temperature)}°
              </p>
              <p className="text-lg text-white/80">
                {weather.city}, {weather.country}
              </p>
              <p className="text-sm text-white/60">
                {weather.description} · Updated {formatTime(weather.updatedAt, weather.timezoneOffset)}
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-4 text-sm w-full sm:w-auto">
          <div className="rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
            <p className="text-white/60">Feels like</p>
            <p className="text-xl font-semibold">{Math.round(weather.feelsLike)}°</p>
          </div>
          <div className="rounded-2xl bg-white/5 px-4 py-3 border border-white/10">
            <p className="text-white/60">Wind</p>
            <p className="text-xl font-semibold">{weather.windSpeed} m/s</p>
          </div>
          <div className={cn("rounded-2xl bg-white/5 px-4 py-3 border border-white/10 flex items-center gap-2")}>
            <ArrowUp className="h-4 w-4 text-emerald-300" aria-hidden />
            <div>
              <p className="text-white/60 text-xs">High</p>
              <p className="text-lg font-semibold">{Math.round(weather.tempMax)}°</p>
            </div>
          </div>
          <div className={cn("rounded-2xl bg-white/5 px-4 py-3 border border-white/10 flex items-center gap-2")}>
            <ArrowDown className="h-4 w-4 text-sky-200" aria-hidden />
            <div>
              <p className="text-white/60 text-xs">Low</p>
              <p className="text-lg font-semibold">{Math.round(weather.tempMin)}°</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

