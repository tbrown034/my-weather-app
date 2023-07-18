"use client";

import React, { useState, useEffect } from "react";
import GET_Current from "@/app/utilities/current";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

export default function Home({ onSubmit, setZipCode, onReset, zipCode }) {
  const [input, setInput] = useState("");
  const [coord, setCoord] = useState({ lat: 0, lng: 0 });
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (input) {
        try {
          const data = await GET_Current(input);
          const parsedData = JSON.parse(data.body);
          if (parsedData.location) {
            setCoord({
              lat: parsedData.location.lat,
              lng: parsedData.location.lon,
            });
          } else {
            setError(`No location found for ${input}`);
            console.error(`No location found for ${input}`);
          }
        } catch (error) {
          setError(error.message);
          console.error("Error:", error);
        }
      }
    };
    fetchData();
  }, [input]);

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(input);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-2">
        <h1 className="text-4xl font-bold text-white">WeatherApp</h1>
        <h2 className="text-lg font-semibold text-white">
          Subhead subhead subhead subhead
        </h2>

        {error && <p className="text-red-600">{error}</p>}

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 p-6 bg-white rounded-lg bg-opacity-30 backdrop-filter backdrop-blur-md"
        >
          <div>
            <label
              htmlFor="location"
              className="block mb-2 text-xl font-bold text-white"
            >
              Enter City or Zip Code:
            </label>
            <input
              id="location"
              name="location"
              className="w-full px-4 py-2 text-black bg-white rounded-md bg-opacity-30 focus:outline-none"
              type="text"
              required
              value={input}
              onChange={handleInputChange}
            />
          </div>
          <button
            type="submit"
            className="px-4 py-2 text-xl font-bold text-white bg-blue-600 rounded-md focus:outline-none"
          >
            Find
          </button>
        </form>
        {coord && (
          <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
            <GoogleMap
              mapContainerStyle={{ width: "800px", height: "600px" }}
              center={coord}
              zoom={10}
            >
              <Marker position={coord} />
            </GoogleMap>
          </LoadScript>
        )}
      </div>
    </>
  );
}
