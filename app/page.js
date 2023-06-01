"use client";
import { useState } from "react";
import Current from "./current/page";
import Forecast from "./forecast/page";
import About from "./about/page";
import Timer from "./timer/page";
import CityInput from "./Components/CityInput";

export default function Home() {
  const [zipCode, setZipCode] = useState("");

  const handleZipCodeSubmit = (zipCode) => {
    setZipCode(zipCode);
  };

  return (
    <>
      <CityInput onSubmit={handleZipCodeSubmit} />
      <Current zipCode={zipCode} />
      <Forecast zipCode={zipCode} />
      <Timer />
      <About />
    </>
  );
}
