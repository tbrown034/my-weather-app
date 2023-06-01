"use client";
import { useEffect, useState } from "react";
import GET_Astro from "../api/timer";

export default function Timer() {
  const [astroData, setAstroData] = useState(null);

  useEffect(() => {
    const fetchAstroData = async () => {
      try {
        const response = await GET_Astro();
        const data = JSON.parse(response.body);
        console.log("data astro", data);

        setAstroData(data);
      } catch (error) {
        console.log("Failed to fetch astro", error);
      }
    };

    fetchAstroData();
  }, []);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-6 bg-sky-600 text-slate-200">
      <h1 className="text-6xl text-center pb-14">Sunrise and Sunset</h1>
      {astroData && (
        <div className="flex flex-col gap-4 text-xl">
          <div>
            <p>
              The sun will rise at{" "}
              <span className="font-bold text-yellow-400">
                {astroData.astronomy.astro.sunrise}
              </span>
              .
            </p>
          </div>
          <div>
            <p>
              The sun will set at{" "}
              <span className="font-bold text-yellow-400">
                {astroData.astronomy.astro.sunset}
              </span>
              .
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
