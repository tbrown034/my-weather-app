"use client";
import { useState, useRef, useEffect } from "react";
import Current from "./current/page";
import Forecast from "./forecast/page";
import About from "./about/page";
import Timer from "./timer/page";
import Future from "./future/page";
import Header from "./Components/Header";

import CityInput from "./Components/CityInput";

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [apiDataFetched, setApiDataFetched] = useState(false);
  const currentRef = useRef(null);
  const forecastRef = useRef(null);
  const timerRef = useRef(null);
  const futureRef = useRef(null);

  const resetData = () => {
    setZipCode("");
    setApiDataFetched(false);
  };

  useEffect(() => {
    if (apiDataFetched && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [apiDataFetched]);

  const scrollToForecast = () => {
    forecastRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToTimer = () => {
    timerRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const scrolltoFuture = () => {
    futureRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleZipCodeSubmit = async (zipCode) => {
    setZipCode(zipCode);
    try {
      // Call your API function here to fetch the data
      // For example: const data = await getForecastData(zipCode);

      // Once the API call is successful and data is fetched
      // Set apiDataFetched to true
      setApiDataFetched(true);
    } catch (error) {
      // Handle error if API call fails
      console.log("Failed to fetch API data:", error);
    }
  };

  return (
    <div
      className="min-h-screen bg-center bg-cover"
      style={{
        backgroundImage: "url('https://source.unsplash.com/Omo-sEH6bCA')",
        backgroundSize: "cover", // ensures the background covers the whole div
        backgroundPosition: "center", // centers the image
        backgroundRepeat: "no-repeat", // prevents the image from repeating
      }}
    >
      <Header />
      <CityInput
        onSubmit={handleZipCodeSubmit}
        setZipCode={setZipCode}
        onReset={resetData}
        zipCode={zipCode}
      />

      {apiDataFetched && (
        <>
          <div ref={currentRef}>
            <Current zipCode={zipCode} onScrollToNext={scrollToForecast} />
          </div>
          <div ref={forecastRef}>
            <Forecast zipCode={zipCode} onScrollToNext={scrolltoFuture} />
          </div>{" "}
          <div ref={futureRef}>
            <Future zipCode={zipCode} onScrollToNext={scrollToTimer} />
          </div>
          <div ref={timerRef}>
            <Timer zipCode={zipCode} />
          </div>
          <About />
        </>
      )}
    </div>
  );
}
