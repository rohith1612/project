import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { User } from "../App";
import "./Match.css";
import weatherDataJson from "../data/weather.json";
import Chat from "./Chat"; // ✅ New file for chat page

interface MatchProps {
  user: User;
  users: User[];
  onLogout: () => void;
}

interface MatchResult {
  user: User;
  sharedHobbies: string[];
  compatibilityScore: number;
}

interface WeatherData {
  rainy: boolean;
  sunny: boolean;
}

const Match: React.FC<MatchProps> = ({ user, users, onLogout }) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);

  // Weather state
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [showWeatherPopup, setShowWeatherPopup] = useState(false);
  const [showRaindrops, setShowRaindrops] = useState(false);
  const [showSunrays, setShowSunrays] = useState(false);

  // ✅ NEW state to manage chat page
  const [chatUser, setChatUser] = useState<User | null>(null);

  useEffect(() => {
    const updateWeather = () => {
      const rainy = Math.random() < 0.5;
      const sunny = Math.random() < 0.5;
      setWeather({ rainy, sunny });

      setShowRaindrops(rainy);
      setShowSunrays(sunny);

      if (rainy && sunny) {
        setShowWeatherPopup(false);
        findMatches();
      } else {
        setMatches([]); // clear old matches
        setShowWeatherPopup(true);
        setIsLoading(false);
      }
    };

    updateWeather(); // initial run

    const interval = setInterval(updateWeather, 25000); // every 25 seconds

    return () => clearInterval(interval);
  }, [user, users]);

  const findMatches = () => {
    setIsLoading(true);

    setTimeout(() => {
      const oppositeType = user.type === "fox" ? "chicken" : "fox";
      const potentialMatches = users.filter(
        (u) => u.type === oppositeType && u.id !== user.id
      );

      const matchResults: MatchResult[] = potentialMatches
        .map((matchUser) => {
          const sharedHobbies = user.hobbies.filter((hobby) =>
            matchUser.hobbies.includes(hobby)
          );

          let compatibilityScore = sharedHobbies.length * 25;

          const ageDiff = Math.abs(user.age - matchUser.age);
          if (ageDiff <= 1) compatibilityScore += 20;
          else if (ageDiff <= 2) compatibilityScore += 10;

          if (
            user.diet.toLowerCase().includes("vegetarian") &&
            matchUser.diet.toLowerCase().includes("vegetarian")
          ) {
            compatibilityScore += 15;
          }

          compatibilityScore = Math.min(100, compatibilityScore);

          return {
            user: matchUser,
            sharedHobbies,
            compatibilityScore,
          };
        })
        .filter((match) => match.sharedHobbies.length > 0)
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore);

      setMatches(matchResults);
      setIsLoading(false);
    }, 1000);
  };

  const openMatchDetails = (match: MatchResult) => {
    setSelectedMatch(match);
  };

  const closeMatchDetails = () => {
    setSelectedMatch(null);
  };

  const sendMessage = (matchUser: User) => {
    setChatUser(matchUser); // ✅ Opens the chat page for that user
  };

  // Weather popup message
  const getWeatherMessage = () => {
    if (!weather)
      return { title: "🌤️ Checking Weather...", message: "Loading..." };
    if (weather.rainy && weather.sunny)
      return {
        title: "🌈 Perfect Weather!",
        message: "Time for love to bloom!",
      };
    if (!weather.rainy && !weather.sunny)
      return {
        title: "⛅ Cloudy Skies Ahead",
        message: "We need both ☀️ and 🌧️ for love!",
      };
    if (weather.rainy && !weather.sunny)
      return {
        title: "🌧️ Only Rain",
        message: "Need some sunshine for magic!",
      };
    if (!weather.rainy && weather.sunny)
      return {
        title: "☀️ Only Sun",
        message: "Need gentle rain for rainbows!",
      };
    return { title: "🌤️ Weather Unknown", message: "Try again later." };
  };

  const weatherInfo = getWeatherMessage();

  if (chatUser) {
    return (
      <Chat
        currentUser={user}
        matchUser={chatUser}
        onBack={() => setChatUser(null)} // Go back to matches
      />
    );
  }

  return (
    <div className="match-container">
      <Navigation user={user} onLogout={onLogout} />

      {/* Weather Popup */}
      {showWeatherPopup && (
        <div className="weather-error-overlay">
          <div className="weather-error-popup">
            <div className="weather-background">
              {showRaindrops && (
                <div className="raindrops">
                  {[...Array(20)].map((_, i) => (
                    <span key={i} className="raindrop">
                      💧
                    </span>
                  ))}
                </div>
              )}
              {showSunrays && (
                <div className="sunrays">
                  {[...Array(8)].map((_, i) => (
                    <span key={i} className="sunray">
                      ☀️
                    </span>
                  ))}
                </div>
              )}
            </div>

            <button
              className="close-popup-btn"
              onClick={() => setShowWeatherPopup(false)}
            >
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
              <p className="popup-message">{weatherInfo.message}</p>
              <div className="manual-close-msg">❌ Close to continue</div>
            </div>
          </div>
        </div>
      )}

      {/* Only render matches if weather is perfect */}
      {!showWeatherPopup && (
        <div className="match-content">
          <div className="match-header">
            <h1 className="match-title">💘 Find Your Perfect Match</h1>
            <p className="match-subtitle">
              Discover {user.type === "fox" ? "chickens" : "foxes"} who share
              your interests, {user.name}! {user.type === "fox" ? "🦊" : "🐓"}
            </p>
          </div>

          {/* INSERT MATCH STATS HERE */}
          <div className="match-stats">
            <div className="stat-item">
              <span className="stat-number">{matches.length}</span>
              <span className="stat-label">Compatible Matches Found</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{user.hobbies.length}</span>
              <span className="stat-label">Your Hobbies</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">
                {matches.length > 0
                  ? Math.max(...matches.map((m) => m.compatibilityScore))
                  : 0}
                %
              </span>
              <span className="stat-label">Highest Compatibility</span>
            </div>
          </div>

          {isLoading ? (
            <div className="loading-section">
              <div className="loading-spinner">🔄</div>
              <p>Finding your perfect matches...</p>
              <div className="loading-hearts">💕 💖 💕 💖 💕</div>
            </div>
          ) : matches.length === 0 ? (
            <div className="no-matches">
              <div className="no-matches-icon">
                {user.type === "fox" ? "🐓" : "🦊"}
              </div>
              <h3>No matches found yet!</h3>
              <p>Don't worry, {user.name}! Here are some tips:</p>
              <ul>
                <li>✨ Add more hobbies to your profile</li>
                <li>🔄 Check back later for new members</li>
                <li>💌 Try the Pickup Corner for conversation starters</li>
              </ul>
            </div>
          ) : (
            <div className="matches-grid">
              {matches.map((match, index) => (
                <div
                  key={match.user.id}
                  className="match-card"
                  onClick={() => openMatchDetails(match)}
                >
                  <div className="match-rank">#{index + 1}</div>
                  <div className="match-image-container">
                    <img
                      src={match.user.profileImage}
                      alt={match.user.name}
                      className="match-image"
                    />
                    <div className="compatibility-badge">
                      {match.compatibilityScore}% ❤️
                    </div>
                  </div>
                  <div className="match-info">
                    <h3 className="match-name">
                      {match.user.name}{" "}
                      {match.user.type === "fox" ? "🦊" : "🐓"}
                    </h3>
                    <p className="match-age">{match.user.age} years old</p>
                    <p className="match-job">{match.user.jobTitle}</p>
                    <div className="shared-hobbies">
                      <h4>
                        💫 Shared Interests ({match.sharedHobbies.length})
                      </h4>
                      <div className="hobby-tags">
                        {match.sharedHobbies.slice(0, 3).map((hobby, i) => (
                          <span key={i} className="hobby-tag shared">
                            {hobby}
                          </span>
                        ))}
                        {match.sharedHobbies.length > 3 && (
                          <span className="hobby-tag more">
                            +{match.sharedHobbies.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Match Details Modal */}
      {selectedMatch && (
        <div className="match-modal-overlay" onClick={closeMatchDetails}>
          <div className="match-modal" onClick={(e) => e.stopPropagation()}>
            <button className="close-modal-btn" onClick={closeMatchDetails}>
              ❌
            </button>
            <div className="modal-content">
              <div className="modal-header">
                <img
                  src={selectedMatch.user.profileImage}
                  alt={selectedMatch.user.name}
                  className="modal-image"
                />
                <div className="modal-info">
                  <h2>
                    {selectedMatch.user.name}{" "}
                    {selectedMatch.user.type === "fox" ? "🦊" : "🐓"}
                  </h2>
                  <p>
                    {selectedMatch.user.age} years old •{" "}
                    {selectedMatch.user.jobTitle}
                  </p>
                  <div className="compatibility-score">
                    💖 {selectedMatch.compatibilityScore}% Compatible
                  </div>
                </div>
              </div>
              <div className="modal-details">
                <div className="detail-section">
                  <h3>🎯 About {selectedMatch.user.name}</h3>
                  <p>
                    <strong>Education:</strong> {selectedMatch.user.education}
                  </p>
                  <p>
                    <strong>Diet:</strong> {selectedMatch.user.diet}
                  </p>
                  <p>
                    <strong>Style:</strong> {selectedMatch.user.style}
                  </p>
                  <p>
                    <strong>Family:</strong> {selectedMatch.user.familyType}{" "}
                    with {selectedMatch.user.siblings} siblings
                  </p>
                </div>
                <div className="detail-section">
                  <h3>
                    💫 Shared Hobbies ({selectedMatch.sharedHobbies.length})
                  </h3>
                  <div className="shared-hobbies-list">
                    {selectedMatch.sharedHobbies.map((hobby, i) => (
                      <span key={i} className="hobby-tag shared-large">
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="detail-section">
                  <h3>🎨 All Their Hobbies</h3>
                  <div className="all-hobbies-list">
                    {selectedMatch.user.hobbies.map((hobby, i) => (
                      <span
                        key={i}
                        className={`hobby-tag ${
                          selectedMatch.sharedHobbies.includes(hobby)
                            ? "shared-large"
                            : "different"
                        }`}
                      >
                        {hobby}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="modal-actions">
                <button
                  className="send-message-btn"
                  onClick={() => sendMessage(selectedMatch.user)}
                >
                  💌 Send Message
                </button>
                <button className="close-btn" onClick={closeMatchDetails}>
                  👋 Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Match;
