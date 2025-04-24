import React, { useState, useEffect } from 'react';

const getWeatherDescription = (code) => {
  if (code === 0) return "Clear sky";
  if (code >= 1 && code <= 3) return "Partly cloudy";
  if (code === 45 || code === 48) return "Fog";
  if (code >= 51 && code <= 57) return "Drizzle";
  if (code >= 61 && code <= 67) return "Rain";
  if (code >= 71 && code <= 77) return "Snow fall";
  if (code >= 80 && code <= 82) return "Rain showers";
  if (code === 85 || code === 86) return "Snow showers";
  if (code === 95) return "Thunderstorm";
  if (code >= 96 && code <= 99) return "Thunderstorm with hail";
  return "Unknown weather";
};

const Header = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  // Update clock every second
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch weather from Open-Meteo (using Seattle coordinates)
  useEffect(() => {
    const fetchWeather = async () => {
      const latitude = 47.6062;
      const longitude = -122.3321;
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`;
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        const data = await response.json();
        setWeather(data);
      } catch (err) {
        console.error("Error fetching weather:", err);
        setError(err);
      }
    };

    fetchWeather();
  }, []);

  return (
    <header className="header">
      <div>
        <h1>PlanNet</h1>
        <p>{currentTime.toLocaleString()}</p>
      </div>
      <div>
        {error ? (
          <p>Error loading weather: {error.message}</p>
        ) : weather && weather.current_weather ? (
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{ marginLeft: '8px' }}>
              <p style={{ margin: 0 }}>
                {weather.current_weather.temperature}°C
              </p>
              <p style={{ margin: 0 }}>
                {getWeatherDescription(weather.current_weather.weathercode)}
              </p>
              <p style={{ margin: 0 }}>
                Wind: {weather.current_weather.windspeed} km/h
              </p>
            </div>
          </div>
        ) : (
          <p>Loading weather...</p>
        )}
      </div>
    </header>
  );
};

export default Header;
