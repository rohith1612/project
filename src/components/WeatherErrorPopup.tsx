import React, { useEffect, useState } from "react";
import "./WeatherErrorPopup.css";

interface WeatherData {
  rainy: boolean;
  sunny: boolean;
}

interface WeatherErrorPopupProps {
  weather: WeatherData | null;
  onClose: () => void;
}

const WeatherErrorPopup: React.FC<WeatherErrorPopupProps> = ({
  weather,
  onClose,
}) => {
  const [countdown, setCountdown] = useState(10);
  const [showRaindrops, setShowRaindrops] = useState(false);
  const [showSunrays, setShowSunrays] = useState(false);

  useEffect(() => {
    // Auto close popup after countdown
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          onClose();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    // Weather animation effects
    const rainTimer = setTimeout(() => setShowRaindrops(true), 500);
    const sunTimer = setTimeout(() => setShowSunrays(true), 1000);

    return () => {
      clearInterval(timer);
      clearTimeout(rainTimer);
      clearTimeout(sunTimer);
    };
  }, [onClose]);

  const getWeatherMessage = () => {
    if (!weather) {
      return {
        title: "🌤️ Weather Conditions Loading...",
        message:
          "Please wait while we check the cosmic alignment for your love journey!",
        status: "The stars are aligning...",
      };
    }

    const hasRain = weather.rainy;
    const hasSun = weather.sunny;

    if (hasRain && hasSun) {
      // This shouldn't happen if we're showing error popup, but just in case
      return {
        title: "🌈 Perfect Rainbow Weather!",
        message: "Amazing! Both sun and rain are present. Love is in the air!",
        status: "Ready for matchmaking!",
      };
    }

    if (!hasRain && !hasSun) {
      return {
        title: "⛅ Cloudy Skies Ahead",
        message:
          "The skies are too cloudy for love to bloom right now. We need both sunshine and gentle rain for the perfect romantic atmosphere!",
        status: "Waiting for sun ☀️ and rain 🌧️",
      };
    }

    if (hasRain && !hasSun) {
      return {
        title: "🌧️ Only Rain is Falling",
        message:
          "The gentle rain is perfect for romance, but we need some sunshine to complete the magical atmosphere for finding your soulmate!",
        status: "Need more sunshine ☀️",
      };
    }

    if (!hasRain && hasSun) {
      return {
        title: "☀️ Only Sunshine Today",
        message:
          "The sun is shining brightly, but we need some gentle rain drops to create the perfect rainbow moment for true love!",
        status: "Need some rain 🌧️",
      };
    }

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
        {/* Animated Background Elements */}
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

        <button className="close-popup-btn" onClick={onClose}>
          ❌
        </button>

        <div className="popup-content">
          <div className="weather-icon-large">
            {!weather
              ? "🌤️"
              : weather.rainy && weather.sunny
              ? "🌈"
              : weather.rainy
              ? "🌧️"
              : weather.sunny
              ? "☀️"
              : "⛅"}
          </div>

          <h2 className="popup-title">{weatherInfo.title}</h2>

          <div className="weather-status">
            <div className="status-indicators">
              <div
                className={`weather-indicator ${
                  weather?.sunny ? "active" : "inactive"
                }`}
              >
                <span className="indicator-icon">☀️</span>
                <span className="indicator-label">Sunshine</span>
                <span className="indicator-status">
                  {weather?.sunny ? "✅ Ready" : "❌ Needed"}
                </span>
              </div>

              <div className="plus-sign">+</div>

              <div
                className={`weather-indicator ${
                  weather?.rainy ? "active" : "inactive"
                }`}
              >
                <span className="indicator-icon">🌧️</span>
                <span className="indicator-label">Rain</span>
                <span className="indicator-status">
                  {weather?.rainy ? "✅ Ready" : "❌ Needed"}
                </span>
              </div>
            </div>
          </div>

          <p className="popup-message">{weatherInfo.message}</p>

          <div className="current-status">
            <strong>{weatherInfo.status}</strong>
          </div>

          <div className="love-quote">
            <div className="quote-icon">💕</div>
            <p>
              "True love blooms when the sun and rain dance together in perfect
              harmony, creating rainbows in the hearts of soulmates."
            </p>
            <div className="quote-icon">💕</div>
          </div>

          <div className="wait-message">
            <div className="magical-elements">
              <span className="sparkle">✨</span>
              <span className="heart">💖</span>
              <span className="sparkle">✨</span>
            </div>
            <p>
              Please wait for the magical moment when both elements align...
            </p>
            <div className="countdown-timer">Auto-close in {countdown}s</div>
          </div>

          <div className="action-buttons">
            <button
              className="retry-btn"
              onClick={() => window.location.reload()}
            >
              🔄 Check Weather Again
            </button>
            <button className="home-btn" onClick={onClose}>
              🏠 Return Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherErrorPopup;
