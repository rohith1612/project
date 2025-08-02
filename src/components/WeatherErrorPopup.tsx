import React, { useEffect, useState } from "react";
import "./WeatherErrorPopup.css";
import weatherDataJson from "../data/weather.json"; // adjust path if needed

interface WeatherData {
  rainy: boolean;
  sunny: boolean;
}

interface WeatherErrorPopupProps {
  onClose: () => void;
  onMatch?: () => void; // callback when user clicks Match button
}

const WeatherErrorPopup: React.FC<WeatherErrorPopupProps> = ({ onClose, onMatch }) => {
  const [countdown, setCountdown] = useState(10);
  const [showRaindrops, setShowRaindrops] = useState(false);
  const [showSunrays, setShowSunrays] = useState(false);
  const [weather, setWeather] = useState<WeatherData | null>(null);

  useEffect(() => {
    // Load weather from JSON
    const { rainy, sunny } = weatherDataJson;
    setWeather({ rainy, sunny });

    // Animations
    setTimeout(() => setShowRaindrops(rainy), 500);
    setTimeout(() => setShowSunrays(sunny), 1000);

    // Auto close countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onClose]);

  const getWeatherMessage = () => {
    if (!weather) {
      return {
        title: "🌤️ Weather Conditions Loading...",
        message: "Please wait while we check the cosmic alignment for your love journey!",
        status: "The stars are aligning...",
      };
    }

    const { rainy, sunny } = weather;

    if (rainy && sunny)
      return {
        title: "🌈 Perfect Rainbow Weather!",
        message: "Amazing! Both sun and rain are present. Love is in the air!",
        status: "Ready for matchmaking!",
      };
    if (!rainy && !sunny)
      return {
        title: "⛅ Cloudy Skies Ahead",
        message: "The skies are too cloudy for love to bloom. Waiting for sun and rain!",
        status: "Waiting for ☀️ + 🌧️",
      };
    if (rainy && !sunny)
      return {
        title: "🌧️ Only Rain is Falling",
        message: "Rain is romantic, but we need sunshine for magic!",
        status: "Need more ☀️",
      };
    if (!rainy && sunny)
      return {
        title: "☀️ Only Sunshine Today",
        message: "Bright sun, but love needs gentle raindrops!",
        status: "Need some 🌧️",
      };

    return {
      title: "🌤️ Weather Check Failed",
      message: "Something went wrong checking the weather conditions.",
      status: "Please try again later",
    };
  };

  const weatherInfo = getWeatherMessage();

  return (
    <div className="weather-error-overlay">
      <div className="weather-error-popup">
        {/* Background Animations */}
        <div className="weather-background">
          {showRaindrops && (
            <div className="raindrops">
              {[...Array(20)].map((_, i) => (
                <div
                  key={i}
                  className="raindrop"
                  style={{
                    left: `${Math.random() * 100}%`,
                    animationDelay: `${Math.random() * 2}s`,
                    animationDuration: `${0.5 + Math.random() * 1}s`,
                  }}
                />
              ))}
            </div>
          )}
          {showSunrays && (
            <div className="sunrays">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="sunray"
                  style={{
                    transform: `rotate(${i * 45}deg)`,
                    animationDelay: `${i * 0.1}s`,
                  }}
                />
              ))}
            </div>
          )}
        </div>

        <button className="close-popup-btn" onClick={onClose}>❌</button>

        <div className="popup-content">
          <div className="weather-icon-large">
            {!weather
              ? "🌤️"
              : weather.rainy && weather.sunny ? "🌈"
              : weather.rainy ? "🌧️"
              : weather.sunny ? "☀️"
              : "⛅"}
          </div>

          <h2 className="popup-title">{weatherInfo.title}</h2>
          <p className="popup-message">{weatherInfo.message}</p>
          <div className="current-status"><strong>{weatherInfo.status}</strong></div>

          {/* Match button only if both sun & rain */}
          {weather?.rainy && weather?.sunny && (
            <div className="match-section">
              <button className="match-btn" onClick={onMatch || (() => alert("Matching..."))}>
                💖 Match & Find Your Pair
              </button>
            </div>
          )}

          <div className="wait-message">
            <p>✨ Please wait for the magical moment when both elements align...</p>
            <div className="countdown-timer">Auto-close in {countdown}s</div>
          </div>

          <div className="action-buttons">
            <button className="retry-btn" onClick={() => window.location.reload()}>
              🔄 Check Weather Again
            </button>
            <button className="home-btn" onClick={onClose}>🏠 Return Home</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherErrorPopup;
