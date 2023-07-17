"use client";
import { useEffect, useState } from "react";
import GET_Forecast from "../../utilities/forecast";

function getFutureDate(timeStr) {
  const [hours, minutes, period] = timeStr.split(/[:\s]/);
  let [hourValue, minuteValue] = [Number(hours), Number(minutes)];
  if (period.toLowerCase() === "pm" && hourValue < 12) hourValue += 12;

  // Create a Date object for the next event
  const futureDate = new Date();
  futureDate.setHours(hourValue, minuteValue, 0, 0);

  // If the event time has passed for today, set the date to tomorrow
  if (futureDate < new Date()) {
    futureDate.setDate(futureDate.getDate() + 1);
  }

  return futureDate;
}

function formatCountdown(countdown) {
  const hours = Math.floor(countdown / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const seconds = countdown % 60;

  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

export default function Timer({ zipCode }) {
  const [astroData, setAstroData] = useState(null);
  const [sunriseCountdown, setSunriseCountdown] = useState(null);
  const [sunsetCountdown, setSunsetCountdown] = useState(null);

  useEffect(() => {
    const fetchAstroData = async () => {
      try {
        const response = await GET_Forecast(zipCode);
        const data = JSON.parse(response.body);
        console.log("data astro", data);

        setAstroData(data);
      } catch (error) {
        console.log("Failed to fetch astro here", error);
      }
    };

    fetchAstroData();
  }, [zipCode]);

  useEffect(() => {
    if (astroData) {
      const nextSunrise = getFutureDate(
        astroData.forecast.forecastday[1].astro.sunrise
      );
      const nextSunset = getFutureDate(
        astroData.forecast.forecastday[1].astro.sunset
      );

      const sunriseIntervalId = setInterval(() => {
        const now = new Date();
        const secondsRemaining = Math.floor((nextSunrise - now) / 1000);

        if (secondsRemaining < 0) {
          clearInterval(sunriseIntervalId);
          setSunriseCountdown(null);
        } else {
          setSunriseCountdown(secondsRemaining);
        }
      }, 1000);

      const sunsetIntervalId = setInterval(() => {
        const now = new Date();
        const secondsRemaining = Math.floor((nextSunset - now) / 1000);

        if (secondsRemaining < 0) {
          clearInterval(sunsetIntervalId);
          setSunsetCountdown(null);
        } else {
          setSunsetCountdown(secondsRemaining);
        }
      }, 1000);

      return () => {
        clearInterval(sunriseIntervalId);
        clearInterval(sunsetIntervalId);
      };
    }
  }, [astroData]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 text-white bg-gradient-to-r from-blue-600 to-purple-900">
      <h1 className="text-6xl text-center pb-14">Sunrise and Sunset</h1>
      {astroData ? (
        <div className="flex flex-col gap-16 text-xl">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-4xl font-semibold">
              The sun will rise at{" "}
              <span className="text-yellow-300">
                {astroData.forecast.forecastday[1].astro.sunrise}
              </span>{" "}
              in {astroData.location.name}.
            </p>
            {sunriseCountdown !== null && (
              <span className="ml-4 text-2xl text-yellow-300 ">
                Countdown: {formatCountdown(sunriseCountdown)}
              </span>
            )}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="text-4xl font-semibold">
              The sun will set at{" "}
              <span className="text-red-300">
                {astroData.forecast.forecastday[1].astro.sunset}
              </span>{" "}
              in {astroData.location.name}.
            </p>
            {sunsetCountdown !== null && (
              <span className="ml-4 text-2xl text-red-300">
                Countdown: {formatCountdown(sunsetCountdown)}
              </span>
            )}
          </div>
        </div>
      ) : (
        <div className="flex items-center justify-center">
          <div className="w-64 h-64 ease-linear border-8 border-t-8 border-gray-200 rounded-full loader"></div>
        </div>
      )}
    </section>
  );
}
