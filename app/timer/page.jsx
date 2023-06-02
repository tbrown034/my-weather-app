"use client";
import { useEffect, useState } from "react";
import GET_Forecast from "../api/forecast";

export default function Timer({ zipCode }) {
  const [astroData, setAstroData] = useState(null);
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

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-600 text-slate-200">
      <h1 className="text-6xl text-center pb-14">Sunrise and Sunset</h1>
      {astroData && (
        <div className="flex flex-col gap-4 text-xl">
          <div>
            <p>
              The sun will rise at{" "}
              <span className="font-bold text-yellow-400">
                {astroData.forecast.forecastday[1].astro.sunrise}
              </span>{" "}
              in {astroData.location.name}.
            </p>
          </div>
          <div>
            <p>
              The sun will set at{" "}
              <span className="font-bold text-yellow-400">
                {astroData.forecast.forecastday[1].astro.sunset}
              </span>{" "}
              in {astroData.location.name}.
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
