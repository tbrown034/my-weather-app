export default async function GET_Forecast(zipCode) {
  const api_key = process.env.NEXT_PUBLIC_WEATHERAPP_API;
  const baseURL = "https://api.weatherapi.com/v1";
  const days = 2;

  const res = await fetch(
    `${baseURL}/forecast.json?key=${api_key}&q=${zipCode}&days=${days}`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();
  return { statusCode: 200, body: JSON.stringify(data) };
}
