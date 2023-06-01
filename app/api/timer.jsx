export default async function GET_Forecast() {
  const api_key = process.env.NEXT_PUBLIC_WEATHER_API;
  const baseURL = "http://api.weatherapi.com/v1";
  const city = "Oklahoma City";
  const days = 2; // Extended forecast to two days to ensure we always have the next sunrise and sunset

  const res = await fetch(
    `${baseURL}/forecast.json?key=${api_key}&q=${city}&days=${days}`
  );

  // Recommendation: handle errors
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const data = await res.json();

  // Extract sunrise and sunset times for the next two days
  const forecast = data.forecast.forecastday;

  const sunrise_sunset = forecast.map((day) => {
    return {
      date: day.date,
      sunrise: day.astro.sunrise,
      sunset: day.astro.sunset,
    };
  });

  return { statusCode: 200, body: JSON.stringify(sunrise_sunset) };
}
