"use client";
import { useEffect, useState } from "react";
import GET_Current from "../api/current";

export default function Timer() {
  const [nextSunrise, setNextSunrise] = useState(null);
  const [nextSunset, setNextSunset] = useState(null);
  const [sunriseCountdown, setSunriseCountdown] = useState(null);
  const [sunsetCountdown, setSunsetCountdown] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await GET_Current();
        const data = JSON.parse(response.body);

        const sunriseDate = new Date(data.sys.sunrise * 1000);
        const sunsetDate = new Date(data.sys.sunset * 1000);
        const now = new Date();

        const sunriseDiff = sunriseDate - now;
        const sunsetDiff = sunsetDate - now;

        setNextSunrise(formatTime(sunriseDate));
        setNextSunset(formatTime(sunsetDate));

        if (sunriseDiff > 0) {
          setSunriseCountdown(formatCountdown(sunriseDiff));
        }

        if (sunsetDiff > 0) {
          setSunsetCountdown(formatCountdown(sunsetDiff));
        }
      } catch (error) {
        console.log("Failed to fetch weather data at timer", error);
      }
    };

    fetchWeatherData();
    const interval = setInterval(fetchWeatherData, 1000); // Update every second

    return () => clearInterval(interval); // Clean up on component unmount
  }, []);

  function formatTime(date) {
    return date.toLocaleTimeString(); // This will format the Date object to a time string like "12:34:56 PM"
  }

  function formatCountdown(ms) {
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);

    return `${hours}h ${minutes}m ${seconds}s`;
  }

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-600 text-slate-200">
      <h1 className="text-6xl text-center">Sunset and Sunrise Timer</h1>
      <p>Next Sunrise at: {nextSunrise}</p>
      <p>Countdown: {sunriseCountdown}</p>
      <p>Next Sunset at: {nextSunset}</p>
      <p>Countdown: {sunsetCountdown}</p>
    </section>
  );
}
