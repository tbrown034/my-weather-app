"use client";

import { useEffect, useState } from "react";
import GET_Forecast from "../api/forecast";

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

export default function Forecast() {
  const [forecastData, setForecastData] = useState(null);
  const [updateTime, setUpdateTime] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await GET_Forecast();
        const data = JSON.parse(response.body);
        const dt = data.list[0].dt;
        const date = new Date(dt * 1000);
        const localDateStr = date.toLocaleString();

        setUpdateTime(localDateStr);
        setForecastData(data);
      } catch (error) {
        console.log("Failed to fetch forecast data", error);
      }
    };

    fetchForecastData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-800 text-slate-100">
      <h1 className="text-6xl text-center pb-14">
        OKC&apos;s Weather Forecast
      </h1>
      {forecastData && (
        <div className="flex flex-col gap-4 text-xl">
          <div>
            <p>
              Tomorrow's forecast for{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.city.name}
              </span>{" "}
              is{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.list[0].weather[0].description}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The temperature is expected to be:{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.list[0].main.temp}°F
              </span>{" "}
              but it will feel like:{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.list[0].main.feels_like}°F
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The wind speed is expected to be:{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.list[0].wind.speed} mph
              </span>{" "}
              coming from the{" "}
              <span className="font-bold text-yellow-400">
                {degToCardinal(forecastData.list[0].wind.deg)}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              Forecast data last updated:{" "}
              <span className="font-bold text-yellow-400">{updateTime}</span>.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
