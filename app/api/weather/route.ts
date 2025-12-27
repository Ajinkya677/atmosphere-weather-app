import { NextResponse } from "next/server";

const API_KEY = process.env.WEATHER_API_KEY;

export async function GET() {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&appid=${API_KEY}`
    );

    if (!res.ok) {
      return NextResponse.json(
        { error: "Failed to fetch weather" },
        { status: 500 }
      );
    }

    const data = await res.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Server error" },
      { status: 500 }
    );
  }
}
