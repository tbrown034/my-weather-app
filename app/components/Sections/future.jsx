"use client";
import { useEffect, useState } from "react";
import GET_FullForecast from "../../utilities/future";
export default function Forecast({ zipCode, onScrollToNext }) {
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
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-600 text-slate-200">
      <h1 className="text-6xl text-center pb-14">10-Day Forecast</h1>
      <div className="flex flex-col gap-2">
        {forecastData &&
          forecastData.forecast.forecastday &&
          forecastData.forecast.forecastday.map((day) => {
            const dateObject = new Date(day.date);
            const dayOfWeek = daysOfWeek[dateObject.getDay()];
            return (
              <div key={day.date}>
                <ul>
                  <li className="list-disc ">
                    On{" "}
                    <span className="font-bold text-yellow-400">
                      {dayOfWeek}
                    </span>{" "}
                    the weather should be{" "}
                    <span className="font-bold text-yellow-400">
                      {day.day.condition.text.toLowerCase()}
                    </span>{" "}
                    with an average temperature of{" "}
                    <span className="font-bold text-yellow-400">
                      {day.day.avgtemp_f}°F
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
        <div className="flex justify-center py-8">
          <button
            className="w-1/2 px-4 py-2 font-semibold text-white transition-colors bg-blue-500 rounded-md hover:bg-blue-700"
            onClick={onScrollToNext}
          >
            See Sunrise and Sunset Times
          </button>
        </div>
      </div>
    </section>
  );
}
