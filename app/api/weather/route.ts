import { NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY;

export async function GET(req: Request) {
  try {
    if (!API_KEY) {
      return NextResponse.json(
        { error: "API key missing on server" },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(req.url);
    const lat = searchParams.get("lat");
    const lon = searchParams.get("lon");
    const city = searchParams.get("city");

    let url = "";

    if (lat && lon) {
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
    } else if (city) {
      url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;
    } else {
      return NextResponse.json(
        { error: "Missing location parameters" },
        { status: 400 }
      );
    }

    const res = await fetch(url);
    const data = await res.json();

    if (!res.ok) {
      console.error("OpenWeather error:", data);
      return NextResponse.json(
        { error: "Weather API failed" },
        { status: res.status }
      );
    }

    return NextResponse.json({
      location: data.name,
      country: data.sys.country,
      temperature: Math.round(data.main.temp),
      condition: data.weather[0].main,
      high: Math.round(data.main.temp_max),
      low: Math.round(data.main.temp_min),
      feelsLike: Math.round(data.main.feels_like),
      sunrise: data.sys.sunrise,
      sunset: data.sys.sunset,
    });
  } catch (err) {
    console.error("Server error:", err);
    return NextResponse.json(
      { error: "Failed to fetch weather" },
      { status: 500 }
    );
  }
}
