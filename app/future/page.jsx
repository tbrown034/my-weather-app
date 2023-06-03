"use client";
import { useEffect, useState } from "react";
import GET_FullForecast from "../api/future";
export default function Forecast({ zipCode }) {
  const [forecastData, setForecastData] = useState(null);

  useEffect(() => {
    const fetchForecastData = async () => {
      try {
        const response = await GET_FullForecast(zipCode);
        const data = JSON.parse(response.body);

        setForecastData(data);
      } catch (error) {
        console.log("Failed to fetch forecast data", error);
      }
    };

    fetchForecastData();
  }, [zipCode]);

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-700 text-slate-100">
      <h1 className="text-6xl text-center pb-14">10-Day Forecast</h1>
      <div>
        {forecastData &&
          forecastData.forecast.forecastday &&
          forecastData.forecast.forecastday.map((day) => {
            const dateObject = new Date(day.date);
            const dayOfWeek = daysOfWeek[dateObject.getDay()];
            return (
              <div key={day.date}>
                <ul>
                  <li className="list-disc">
                    On{" "}
                    <span className="font-bold text-yellow-400">
                      {dayOfWeek}
                    </span>{" "}
                    the average temperature will be{" "}
                    <span className="font-bold text-yellow-400">
                      {day.day.avgtemp_f}°F{" "}
                    </span>{" "}
                    with likely{" "}
                    <span className="font-bold text-yellow-400">
                      {day.day.condition.text.toLowerCase()}
                    </span>
                    .
                    {day.day.daily_chance_of_rain > 0 && (
                      <span>
                        {" "}
                        There is a{" "}
                        <span className="font-bold text-yellow-400">
                          {day.day.daily_chance_of_rain}% chance of rain
                        </span>
                      </span>
                    )}
                    {day.day.daily_chance_of_snow > 0 && (
                      <span>
                        {" "}
                        and a{" "}
                        <span className="font-bold text-yellow-400">
                          {day.day.daily_chance_of_snow}% chance of snow
                        </span>
                      </span>
                    )}
                  </li>
                </ul>
              </div>
            );
          })}
      </div>
    </section>
  );
}
