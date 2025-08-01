import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { User } from "../App";
import "./Match.css";

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
  lastUpdated?: string;
  description?: string;
  magicalBonus?: boolean;
  compatibility?: {
    bonus: number;
    message: string;
  };
}

const Match: React.FC<MatchProps> = ({ user, users, onLogout }) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [weatherLoading, setWeatherLoading] = useState(true);
  const [showCertificate, setShowCertificate] = useState(false);
  const [certificateMatch, setCertificateMatch] = useState<MatchResult | null>(
    null
  );

  useEffect(() => {
    loadWeatherData();
  }, []);

  useEffect(() => {
    // Only find matches after weather data is loaded
    if (!weatherLoading) {
      findMatches();
    }
  }, [user, users, weather, weatherLoading]);

  const loadWeatherData = async () => {
    setWeatherLoading(true);
    try {
      // Try to fetch from public folder first
      let response = await fetch("/data/weather.json");

      if (!response.ok) {
        // If that fails, try from assets folder
        response = await fetch("/assets/data/weather.json");
      }

      if (!response.ok) {
        // If still fails, use fallback data
        console.warn("Could not load weather.json, using fallback data");
        setWeather({
          rainy: true,
          sunny: true,
          description:
            "Perfect rainbow weather - both sun and rain are present for magical matchmaking!",
          magicalBonus: true,
          compatibility: {
            bonus: 10,
            message: "Rainbow blessing enhances all love matches by 10%",
          },
        });
      } else {
        const weatherData: WeatherData = await response.json();
        console.log("Weather data loaded:", weatherData); // Debug log
        setWeather(weatherData);
      }
    } catch (error) {
      console.error("Failed to load weather data:", error);
      // Use fallback weather data
      setWeather({
        rainy: true,
        sunny: true,
        description:
          "Perfect rainbow weather - both sun and rain are present for magical matchmaking!",
        magicalBonus: true,
        compatibility: {
          bonus: 10,
          message: "Rainbow blessing enhances all love matches by 10%",
        },
      });
    } finally {
      setWeatherLoading(false);
    }
  };

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

          // Enhanced compatibility calculation
          let compatibilityScore = sharedHobbies.length * 20;

          // Age compatibility bonus
          const ageDiff = Math.abs(user.age - matchUser.age);
          if (ageDiff <= 1) compatibilityScore += 25;
          else if (ageDiff <= 2) compatibilityScore += 15;
          else if (ageDiff <= 3) compatibilityScore += 10;

          // Diet compatibility
          if (
            user.diet.toLowerCase().includes("vegetarian") &&
            matchUser.diet.toLowerCase().includes("vegetarian")
          ) {
            compatibilityScore += 20;
          }

          // Education level bonus
          if (user.education === matchUser.education) {
            compatibilityScore += 15;
          }

          // Weather bonus - special conditions
          if (weather?.rainy && weather?.sunny) {
            const bonus = weather.compatibility?.bonus || 10;
            compatibilityScore += bonus;
            console.log(`Applied rainbow bonus: +${bonus} points`); // Debug log
          }

          // Cap at 100%
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

  const openCertificate = (match: MatchResult) => {
    setCertificateMatch(match);
    setShowCertificate(true);
    setSelectedMatch(null);
  };

  const closeCertificate = () => {
    setShowCertificate(false);
    setCertificateMatch(null);
  };

  const downloadCertificatePDF = (match: MatchResult) => {
    // Create PDF content as HTML string
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="UTF-8">
          <title>Love Match Certificate</title>
          <style>
            body {
              font-family: 'Georgia', serif;
              background: linear-gradient(135deg, #ffeaa7, #fab1a0, #fd79a8, #a29bfe);
              margin: 0;
              padding: 40px;
              min-height: 100vh;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .certificate {
              background: white;
              padding: 60px;
              border-radius: 20px;
              box-shadow: 0 20px 60px rgba(0,0,0,0.15);
              border: 8px solid #gold;
              max-width: 800px;
              text-align: center;
              position: relative;
            }
            .certificate::before {
              content: '';
              position: absolute;
              top: 20px;
              left: 20px;
              right: 20px;
              bottom: 20px;
              border: 3px solid #fd79a8;
              border-radius: 15px;
            }
            .header {
              font-size: 3rem;
              color: #2c3e50;
              margin-bottom: 20px;
              text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
            }
            .subtitle {
              font-size: 1.5rem;
              color: #fd79a8;
              margin-bottom: 40px;
              font-style: italic;
            }
            .names {
              font-size: 2.5rem;
              color: #2c3e50;
              margin: 30px 0;
              font-weight: bold;
            }
            .compatibility {
              font-size: 2rem;
              color: #00b894;
              margin: 20px 0;
              font-weight: bold;
            }
            .details {
              margin: 30px 0;
              font-size: 1.2rem;
              line-height: 1.8;
              color: #2c3e50;
            }
            .footer {
              margin-top: 50px;
              font-size: 1rem;
              color: #666;
              font-style: italic;
            }
            .weather-bonus {
              background: linear-gradient(135deg, #74b9ff, #0984e3);
              color: white;
              padding: 15px 30px;
              border-radius: 25px;
              margin: 20px 0;
              font-weight: bold;
            }
          </style>
        </head>
        <body>
          <div class="certificate">
            <div class="header">💕 LOVE MATCH CERTIFICATE 💕</div>
            <div class="subtitle">Official Compatibility Declaration</div>
            
            <div class="names">
              ${user.name} ${user.type === "fox" ? "🦊" : "🐓"} 
              & 
              ${match.user.name} ${match.user.type === "fox" ? "🦊" : "🐓"}
            </div>
            
            <div class="compatibility">
              ${match.compatibilityScore}% Compatible! ❤️
            </div>
            
            ${
              weather?.rainy && weather?.sunny
                ? '<div class="weather-bonus">🌈 Rainbow Blessing Bonus! 🌈</div>'
                : ""
            }
            
            <div class="details">
              <strong>Shared Interests:</strong> ${match.sharedHobbies.join(
                ", "
              )}<br>
              <strong>Match Date:</strong> ${new Date().toLocaleDateString()}<br>
              <strong>Certified by:</strong> Cupid's Digital Matchmaking Service
            </div>
            
            <div class="footer">
              "When the sun shines and rain falls together, 
              true love blooms like a rainbow in the heart"
              <br><br>
              Certificate #${Math.random()
                .toString(36)
                .substring(2, 15)
                .toUpperCase()}
            </div>
          </div>
        </body>
      </html>
    `;

    // Create and download PDF
    const blob = new Blob([certificateHTML], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Love_Certificate_${user.name}_${match.user.name}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const sendMessage = (matchUser: User) => {
    alert(`💌 Message sent to ${matchUser.name}! (This is a demo feature)`);
  };

  const getWeatherIcon = () => {
    if (weather?.rainy && weather?.sunny) return "🌈";
    if (weather?.rainy) return "🌧️";
    if (weather?.sunny) return "☀️";
    return "⛅";
  };

  const getWeatherMessage = () => {
    if (weather?.description) {
      return weather.description;
    }
    if (weather?.rainy && weather?.sunny) {
      return "Perfect Rainbow Weather - Love is in the air! 🌈✨";
    }
    if (weather?.rainy) return "Rainy Day Romance 🌧️💕";
    if (weather?.sunny) return "Sunny Day Love ☀️💖";
    return "Cloudy but Cozy ⛅💝";
  };

  if (weatherLoading) {
    return (
      <div className="match-container">
        <Navigation user={user} onLogout={onLogout} />
        <div className="match-content">
          <div className="loading-section">
            <div className="loading-spinner">🔄</div>
            <p>Loading weather conditions...</p>
            <div className="loading-hearts">💕 💖 💕 💖 💕</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="match-container">
      <Navigation user={user} onLogout={onLogout} />

      <div className="match-content">
        <div className="match-header">
          <div className="weather-indicator">
            <span className="weather-icon">{getWeatherIcon()}</span>
            <span className="weather-text">{getWeatherMessage()}</span>
          </div>

          <h1 className="match-title">💘 Find Your Perfect Match</h1>
          <p className="match-subtitle">
            Discover {user.type === "fox" ? "chickens" : "foxes"} who share your
            interests, {user.name}! {user.type === "fox" ? "🦊" : "🐓"}
          </p>
        </div>

        {isLoading ? (
          <div className="loading-section">
            <div className="loading-spinner">🔄</div>
            <p>Finding your perfect matches...</p>
            <div className="loading-hearts">💕 💖 💕 💖 💕</div>
            <div className="weather-loading">
              {getWeatherIcon()} Checking cosmic alignment...
            </div>
          </div>
        ) : (
          <>
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

            {matches.length === 0 ? (
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
                  <li>
                    {getWeatherIcon()} Wait for perfect weather conditions
                  </li>
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

                    {weather?.rainy && weather?.sunny && (
                      <div className="rainbow-badge">🌈 Rainbow Blessed</div>
                    )}

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

                    <div className="match-actions">
                      <button className="view-profile-btn">
                        👁️ View Profile
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>

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
                  {weather?.rainy && weather?.sunny && (
                    <div className="rainbow-blessing">
                      🌈 Rainbow Blessed Match!
                    </div>
                  )}
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
                  className="certificate-btn"
                  onClick={() => openCertificate(selectedMatch)}
                >
                  📜 Get Love Certificate
                </button>
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

      {/* Certificate Modal */}
      {showCertificate && certificateMatch && (
        <div className="certificate-modal-overlay" onClick={closeCertificate}>
          <div
            className="certificate-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="close-modal-btn" onClick={closeCertificate}>
              ❌
            </button>

            <div className="certificate-content">
              <div className="certificate-header">
                <h1>💕 LOVE MATCH CERTIFICATE 💕</h1>
                <p className="certificate-subtitle">
                  Official Compatibility Declaration
                </p>
              </div>

              <div className="certificate-body">
                <div className="couple-info">
                  <div className="person">
                    <img
                      src={user.profileImage}
                      alt={user.name}
                      className="cert-image"
                    />
                    <h3>
                      {user.name} {user.type === "fox" ? "🦊" : "🐓"}
                    </h3>
                  </div>
                  <div className="love-heart">💖</div>
                  <div className="person">
                    <img
                      src={certificateMatch.user.profileImage}
                      alt={certificateMatch.user.name}
                      className="cert-image"
                    />
                    <h3>
                      {certificateMatch.user.name}{" "}
                      {certificateMatch.user.type === "fox" ? "🦊" : "🐓"}
                    </h3>
                  </div>
                </div>

                <div className="compatibility-display">
                  <div className="compatibility-circle">
                    <span className="compatibility-percentage">
                      {certificateMatch.compatibilityScore}%
                    </span>
                    <span className="compatibility-label">Compatible</span>
                  </div>
                </div>

                {weather?.rainy && weather?.sunny && (
                  <div className="rainbow-blessing-cert">
                    🌈 RAINBOW BLESSING BONUS! 🌈
                  </div>
                )}

                <div className="certificate-details">
                  <p>
                    <strong>Shared Interests:</strong>{" "}
                    {certificateMatch.sharedHobbies.join(", ")}
                  </p>
                  <p>
                    <strong>Match Date:</strong>{" "}
                    {new Date().toLocaleDateString()}
                  </p>
                  <p>
                    <strong>Weather Conditions:</strong> {getWeatherMessage()}
                  </p>
                  <p>
                    <strong>Certificate ID:</strong> #
                    {Math.random().toString(36).substring(2, 15).toUpperCase()}
                  </p>
                </div>

                <div className="certificate-quote">
                  "When the sun shines and rain falls together, true love blooms
                  like a rainbow in the heart"
                </div>
              </div>

              <div className="certificate-actions">
                <button
                  className="download-pdf-btn"
                  onClick={() => downloadCertificatePDF(certificateMatch)}
                >
                  📄 Download PDF Certificate
                </button>
                <button className="close-cert-btn" onClick={closeCertificate}>
                  Close Certificate
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
