export default async function GET_Astro() {
  const api_key = process.env.NEXT_PUBLIC_WEATHER_API;
  const baseURL = "https://api.weatherapi.com/v1";
  const city = "Oklahoma City";

  const res = await fetch(`${baseURL}/astronomy.json?key=${api_key}&q=${city}`);

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch astro data");
  }

  const data = await res.json();

  return { statusCode: 200, body: JSON.stringify(data) };
}
