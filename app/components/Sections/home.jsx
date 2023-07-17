"use client";
import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import dynamic from "next/dynamic";
import "leaflet/dist/leaflet.css";

function SetViewOnClick({ city }) {
  const map = useMap();
  useEffect(() => {
    if (city) {
      fetch(
        `http://nominatim.openstreetmap.org/search?format=json&limit=1&q=${city}`
      )
        .then((data) => data.json())
        .then((data) => {
          if (data && data.length > 0) {
            map.setView([data[0].lat, data[0].lon], 13);
          } else {
            console.error(`No location found for ${city}`);
          }
        })
        .catch((error) => console.error("Error:", error));
    }
  }, [city]);

  return null;
}

export default function Home(props) {
  const { onSubmit, zipCode, setZipCode, onReset } = props;
  const [city, setCity] = useState("");

  const handleInputChange = (e) => {
    setCity(e.target.value);
    setZipCode(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(zipCode);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4 p-2">
      <h1 className="text-4xl font-bold text-white">WeatherApp</h1>
      <h2 className="text-lg font-semibold text-white">
        Subhead subhead subhead subhead
      </h2>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-6 bg-white rounded-lg bg-opacity-30 backdrop-filter backdrop-blur-md"
      >
        <div>
          <label
            htmlFor="zipCode"
            className="block mb-2 text-xl font-bold text-white"
          >
            Enter Zip Code:
          </label>
          <input
            id="zipCode"
            name="zipCode"
            className="w-full px-4 py-2 text-black bg-white rounded-md bg-opacity-30 focus:outline-none"
            type="text"
            required
            value={zipCode}
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
      <div className="mt-4 overflow-hidden rounded-lg opacity-95 w-80 h-60">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={1}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <SetViewOnClick city={city} />
        </MapContainer>
      </div>
    </div>
  );
}
