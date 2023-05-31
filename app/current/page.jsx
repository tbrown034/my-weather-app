"use client";

import { useEffect, useState } from "react";
import { GET } from "../api/weather";

function degToCardinal(deg) {
  const directions = [
    "North",
    "North-Northeast",
    "Northeast",
    "East-Northeast",
    "East",
    "East-Southeast",
    "Southeast",
    "South-Southeast",
    "South",
    "South-Southwest",
    "Southwest",
    "West-Southwest",
    "West",
    "West-Northwest",
    "Northwest",
    "North-Northwest",
    "North",
  ];

  const index = Math.round((deg % 360) / 22.5);
  return directions[index];
}

export default function Current() {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await GET();
        const data = JSON.parse(response.body);
        setWeatherData(data);
      } catch (error) {
        console.log("Failed to fetch weather data", error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen p-6 scroll bg-sky-800 text-slate-100">
      <h1 className="text-6xl text-center">OKC&apos;s Current Weather</h1>
      {weatherData && (
        <div className="flex flex-col gap-20 pt-10 text-2xl">
          <p>
            The current temperature is:{" "}
            <span className="px-2 font-bold underline text-7xl underline-offset-8">
              {weatherData.main.temp}°F
            </span>
          </p>
          <p>
            But it actually feels like:{" "}
            <span className="px-2 font-bold underline text-7xl underline-offset-8">
              {weatherData.main.feels_like}°F!
            </span>
          </p>
          <p>
            Our wind speed is:{" "}
            <span className="px-2 font-bold underline text-7xl underline-offset-8">
              {weatherData.wind.speed} mph
            </span>{" "}
            coming from the{" "}
            <span className="px-2 font-bold underline text-7xl underline-offset-8">
              {degToCardinal(weatherData.wind.deg)}!
            </span>
          </p>
        </div>
      )}
    </section>
  );
}
