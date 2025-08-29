import React, { useState } from "react";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const getWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    setWeather(null);

    try {
      // 1. Get coordinates for city
      const geoRes = await fetch(
        `https://nominatim.openstreetmap.org/search?city=${city}&format=json&limit=1`
      );
      const geoData = await geoRes.json();

      if (geoData.length === 0) {
        setError("City not found!");
        setLoading(false);
        return;
      }

      const { lat, lon } = geoData[0];

      // 2. Fetch weather from Open-Meteo
      const weatherRes = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`
      );
      const weatherData = await weatherRes.json();

      setWeather(weatherData.current_weather);
    } catch (err) {
      setError("Failed to fetch weather.");
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-blue-500 p-6">
      <h1 className="text-3xl font-bold mb-6 text-white drop-shadow">
        🌤️ Weather Now
      </h1>

      <div className="flex gap-2">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={getWeather}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Search
        </button>
      </div>

      {loading && <p className="mt-4 text-white">Loading...</p>}
      {error && <p className="mt-4 text-red-200">{error}</p>}

      {weather && (
        <div className="mt-6 p-6 bg-white rounded-xl shadow-lg text-center">
          <h2 className="text-xl font-semibold capitalize">{city}</h2>
          <p className="text-gray-700 mt-2">🌡️ {weather.temperature}°C</p>
          <p className="text-gray-700">💨 {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}

export default App;
