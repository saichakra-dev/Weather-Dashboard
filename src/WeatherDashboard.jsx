import React, { useState, useEffect } from "react";
import searchIcon from "./assets/search.png";
import humidityIcon from "./assets/humidity.png";
import windIcon from "./assets/wind.png";
import "./WeatherDashboard.css";

const WeatherDashboard = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [city, setCity] = useState("Hyderabad");

  useEffect(() => {
    getWeatherData(city);
  }, [city]);

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  const getWeatherData = async (city) => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=4cf43edd2d4f3f1dc28074da1e63c68b&units=metric`
      );
      const data = await response.json();
      setWeatherData({
        temperature: data.main.temp,
        windSpeed: data.wind.speed,
        city: data.name,
        pressure: data.main.pressure,
        humidity: data.main.humidity,
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        country: data.sys.country,
        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <p className="roboto-bold-heading">Weather Dashboard</p>
      <div className="searchbar">
        <input
          className="input"
          value={city}
          onChange={handleChange}
          type="text"
          placeholder="Enter City"
        />
        <img
          src={searchIcon}
          alt="Search"
          onClick={() => getWeatherData(city)}
        />
      </div>
      {weatherData && (
        <div className="weather-card">
          <div className="first">
            <div className="weather-icon">
              <img
                src={`https://openweathermap.org/img/wn/${weatherData.icon}@4x.png`}
                alt={weatherData.description}
              />
            </div>
            <div className="weather-info">
              <h2 className="roboto-bold">
                {weatherData.city}, {weatherData.country}
              </h2>
              <p className="roboto-temp">{weatherData.temperature}°C</p>
              <p className="pressure">{weatherData.description}</p>
            </div>
          </div>

          <div className="weather-details">
            <div className="first">
              <div className="detail-item sub-image">
                <img src={humidityIcon} alt="Humidity" />
                <p className="roboto-sub-heading">
                  Humidity:{weatherData.humidity}%
                </p>
              </div>
              <div className="detail-item sub-image">
                <img src={windIcon} alt="Wind Speed" />
                <p className="roboto-sub-heading">
                  Wind: {weatherData.windSpeed} m/s
                </p>
              </div>
            </div>
            <div className="detail-item">
              <p className="pressure">Pressure: {weatherData.pressure} hPa</p>
            </div>

            <div className="footer">
              <div className="detail-item ">
                <p className="roboto-sub">Min Temp: {weatherData.temp_min}°C</p>
                <p className="roboto-sub">Max Temp: {weatherData.temp_max}°C</p>
              </div>

              <div className="detail-item ">
                <p className="roboto-sub-heading">
                  Sunrise: {weatherData.sunrise}
                </p>
                <p className="roboto-sub-heading">
                  Sunset: {weatherData.sunset}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WeatherDashboard;
