"use client";

import { useEffect, useState } from "react";
import GET_Forecast from "../api/forecast";

export default function Forecast() {
  const [forecastData, setForecastData] = useState(null);
  const [updateTime, setUpdateTime] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await GET_Forecast();
        const data = JSON.parse(response.body);
        console.log("forecast data", data);
        const dt = data.current.last_updated_epoch;
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
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-700 text-slate-100">
      <h1 className="text-6xl text-center pb-14">Tomorrow&apos;s Weather</h1>
      {forecastData && (
        <div className="flex flex-col gap-4 text-xl">
          <div>
            <p>
              The weather tomorrow in{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.location.name}
              </span>{" "}
              will be{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.current.condition.text}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The temperature will be{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.current.temp_f}°F
              </span>{" "}
              but it actually will feel like{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.current.feelslike_f}°F
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The wind speed will be:{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.current.wind_mph} mph
              </span>{" "}
              coming from the{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.current.wind_dir}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              This forecast was last last updated at{" "}
              <span className="font-bold text-yellow-400">{updateTime}</span>.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
