"use client";
import { useEffect, useState } from "react";
import GET_Current from "../../utilities/Current";

export default function Current({ zipCode, onScrollToNext }) {
  const [weatherData, setWeatherData] = useState(null);
  const [updateTime, setUpdateTime] = useState(null); // New state for update time

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await GET_Current(zipCode);
        const data = JSON.parse(response.body);
        "data", data;
        const dt = data.current.last_updated_epoch;
        const date = new Date(dt * 1000);
        const localDateStr = date.toLocaleString();

        setUpdateTime(localDateStr);
        setWeatherData(data);
      } catch (error) {
        console.log("Failed to fetch weather data", error);
      }
    };

    fetchWeatherData();
  }, [zipCode]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 ">
      <h1 className="text-6xl text-center pb-14">Current Weather</h1>
      {weatherData && (
        <div className="flex flex-col gap-4 text-xl">
          <div>
            <p>
              The weather right now in{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.location.name}, {weatherData.location.region}
              </span>{" "}
              is{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.current.condition.text}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The current temperature is{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.current.temp_f}°F
              </span>{" "}
              but it actually feels like:{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.current.feelslike_f}°F
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The wind speed is:{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.current.wind_mph} mph
              </span>{" "}
              coming from the{" "}
              <span className="font-bold text-yellow-400">
                {weatherData.current.wind_dir}
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
          <div className="flex justify-center py-8">
            <button
              className="w-1/2 px-4 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-700"
              onClick={onScrollToNext}
            >
              See Tomorrow&apos;s Forecast
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
