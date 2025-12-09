import { useState } from "react";
import './App.css'

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");

  const apiKey = "eec42eef0c6ae68d3fe1f8140cb5df4a"; // ✅ Replace with your API key

  const getWeather = async () => {
    if (!city) {
      setError("Please enter a city name");
      return;
    }

    try {
      setError("");
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );
      const data = await res.json();

      if (data.cod === "404") {
        setError("City not found");
        setWeather(null);
      } else {
        setWeather(data);
      }
    } catch (err) {
      setError("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 to-indigo-600 p-4">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-6 text-center space-y-5">

        <h1 className="text-3xl font-bold text-indigo-600">🌤️ Weather App</h1>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Enter city..."
            className="flex-1 p-3 border rounded-lg outline-none focus:ring-2 focus:ring-indigo-400"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button
            onClick={getWeather}
            className="bg-indigo-600 text-white px-5 rounded-lg hover:bg-indigo-700 transition"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-500 font-medium">{error}</p>}

        {weather && (
          <div className="bg-indigo-50 rounded-xl p-5 space-y-2 animate-fade">
            <h2 className="text-2xl font-bold text-indigo-700">
              {weather.name}
            </h2>
            <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
            <p className="text-gray-600 capitalize">
              {weather.weather[0].description}
            </p>

            <div className="flex justify-between text-sm text-gray-600 mt-4">
              <p>💨 Wind: {weather.wind.speed} m/s</p>
              <p>💧 Humidity: {weather.main.humidity}%</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default App;

