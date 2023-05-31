"use client";

import { useEffect, useState } from "react";
import GET_Current from "../api/current";

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
  const [updateTime, setUpdateTime] = useState(null); // New state for update time

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await GET_Current();
        const data = JSON.parse(response.body);
        const dt = data.dt;
        const date = new Date(dt * 1000);
        const localDateStr = date.toLocaleString();

        setUpdateTime(localDateStr);
        setWeatherData(data);
      } catch (error) {
        console.log("Failed to fetch weather data", error);
        åå;
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-800 text-slate-100">
      <h1 className="text-6xl text-center pb-14">OKC&apos;s Current Weather</h1>
      {weatherData && (
        <div className="flex flex-col gap-4 text-xl">
          <div>
            <p>
              The weather right now in{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.name}
              </span>{" "}
              is{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.weather[0].description}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The current temperature is:{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.main.temp}°F
              </span>{" "}
              but it actually feels like:{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.main.feels_like}°F
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The wind speed is:{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.wind.speed} mph
              </span>{" "}
              coming from the{" "}
              <span className="font-bold text-yellow-400">
                {degToCardinal(weatherData.wind.deg)}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              Weather data last updated:{" "}
              <span className="font-bold text-yellow-400">{updateTime}</span>.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
