import React, { useEffect, useState } from "react";
import fetchWeather from "./fetchWeather";
import "./Weather.css";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Weather() {
  const [weather, setWeather] = useState();
  useEffect(() => {
    async function fetchData() {
      const data = await fetchWeather();
      setWeather(data);
    }
    fetchData();
  }, []);

  if (!weather) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </Box>
    );
  }
  return (
    <view className="weather-container">
      <div className="weather-text-container">
        <text className="weather-title">Weather</text>
      </div>
      <div className="city">
        <h2 className="city-name">
          <span>{weather.name}</span>
          <sup>{weather.sys.country}</sup>
        </h2>

        <div className="info">
          <img
            className="city-icon"
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].desccription}
          ></img>
          <p className="weather-p">{weather.weather[0].description}</p>
        </div>
      </div>
      <div className="weather-text-container">
        <text className="weather-value">{Math.round(weather.main.temp)}</text>
        <sup>&deg;C</sup>
      </div>
    </view>
  );
}

export default Weather;
