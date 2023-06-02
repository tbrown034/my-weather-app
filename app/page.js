"use client";
import { useState, useRef, useEffect } from "react";
import Current from "./current/page";
import Forecast from "./forecast/page";
import About from "./about/page";
import Timer from "./timer/page";

import CityInput from "./Components/CityInput";

export default function Home() {
  const [zipCode, setZipCode] = useState("");
  const [apiDataFetched, setApiDataFetched] = useState(false);
  const currentRef = useRef(null);

  const resetData = () => {
    setZipCode("");
    setApiDataFetched(false);
  };

  useEffect(() => {
    if (apiDataFetched && currentRef.current) {
      currentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [apiDataFetched]);

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
    <>
      <CityInput
        onSubmit={handleZipCodeSubmit}
        setZipCode={setZipCode}
        onReset={resetData}
        zipCode={zipCode}
      />
      {apiDataFetched && (
        <>
          <div ref={currentRef}>
            <Current zipCode={zipCode} />
          </div>
          <Forecast zipCode={zipCode} />
          <Timer zipCode={zipCode} />
          <About />
        </>
      )}
    </>
  );
}
