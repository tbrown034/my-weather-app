export default async function GET_Current() {
  const lat = 35.4676; // Latitude for OKC
  const lon = -97.5164; // Longitude for OKC

  const api_key = process.env.NEXT_PUBLIC_WEATHER_API;

  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=imperial`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data) };
}
