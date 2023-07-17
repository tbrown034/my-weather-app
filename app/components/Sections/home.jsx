"use client";

import React, { useState, useEffect } from "react";
import Globe from "react-globe.gl";
import GET_Current from "../../utilities/Current";

export default function Home() {
  const [input, setInput] = useState("");
  const [coord, setCoord] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (input) {
        try {
          const data = await GET_Current(input);
          const parsedData = JSON.parse(data.body);
          if (parsedData.location) {
            setCoord([parsedData.location.lon, parsedData.location.lat]);
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
        {coord.length === 2 && (
          <Globe
            width={800} // specify the width and height as per your needs
            height={600}
            pointsData={[
              {
                lat: coord[1],
                lng: coord[0],
                color: "red",
                altitude: 0.1,
                radius: 0.01,
              },
            ]}
            pointAltitude="altitude"
            pointColor="color"
            pointRadius="radius"
            globeImageUrl="//unpkg.com/three-globe/example/img/earth-night.jpg"
          />
        )}
      </div>
    </>
  );
}
