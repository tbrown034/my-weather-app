"use client";
import { useEffect, useState } from "react";
import GET_Forecast from "../api/forecast";

export default function Forecast({ zipCode, onScrollToNext }) {
  const [forecastData, setForecastData] = useState(null);
  const [updateTime, setUpdateTime] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await GET_Forecast(zipCode);
        const data = JSON.parse(response.body);
        console.log("forecast data yu", data);
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
  }, [zipCode]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-700 text-slate-100">
      <h1 className="text-6xl text-center pb-14">Tomorrow&apos;s Weather</h1>
      {forecastData && (
        <div className="flex flex-col gap-4 text-xl">
          <div>
            <p>
              The weather tomorrow in{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.location.name}, {forecastData.location.region}
              </span>{" "}
              will be{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.forecast.forecastday[1].day.condition.text}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The average temperature will be{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.forecast.forecastday[1].day.avgtemp_f}°F
              </span>{" "}
              with a high of{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.forecast.forecastday[1].day.maxtemp_f}°F
              </span>{" "}
              and a low of{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.forecast.forecastday[1].day.mintemp_f}°F
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The max wind speed will be:{" "}
              <span className="font-bold text-yellow-400">
                {forecastData.forecast.forecastday[1].day.maxwind_mph} mph
              </span>
            </p>
          </div>
          <div>
            <p>
              This forecast was last last updated at{" "}
              <span className="font-bold text-yellow-400">{updateTime}</span>.
            </p>
          </div>
          <div className="flex justify-center py-8">
            <button
              className="w-1/2 px-4 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-700"
              onClick={onScrollToNext}
            >
              Get Extended Forecast
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
