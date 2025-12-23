import { Droplets, Eye, Gauge, Wind } from "lucide-react";
import type { WeatherData } from "@/types/weather";

export function WeatherDetailsGrid({ weather }: { weather: WeatherData }) {
  const details = [
    { label: "Humidity", value: `${weather.humidity}%`, icon: Droplets },
    { label: "Wind Speed", value: `${weather.windSpeed} m/s`, icon: Wind },
    { label: "Visibility", value: `${Math.round(weather.visibility / 1000)} km`, icon: Eye },
    { label: "Pressure", value: `${weather.pressure} hPa`, icon: Gauge },
  ];

  return (
    <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
      {details.map((item) => (
        <article
          key={item.label}
          className="glass rounded-2xl px-4 py-4 sm:px-5 sm:py-5 flex items-center gap-3"
        >
          <item.icon className="h-5 w-5 text-white/70" aria-hidden />
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-white/50">{item.label}</p>
            <p className="text-lg font-semibold">{item.value}</p>
          </div>
        </article>
      ))}
    </section>
  );
}

