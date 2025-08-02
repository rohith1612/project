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

const Match: React.FC<MatchProps> = ({ user, users, onLogout }) => {
  const [matches, setMatches] = useState<MatchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMatch, setSelectedMatch] = useState<MatchResult | null>(null);

  useEffect(() => {
    findMatches();
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

          // Calculate compatibility based on shared hobbies and other factors
          let compatibilityScore = sharedHobbies.length * 25;

          // Add bonus points for similar age
          const ageDiff = Math.abs(user.age - matchUser.age);
          if (ageDiff <= 1) compatibilityScore += 20;
          else if (ageDiff <= 2) compatibilityScore += 10;

          // Add bonus for similar diet
          if (
            user.diet.toLowerCase().includes("vegetarian") &&
            matchUser.diet.toLowerCase().includes("vegetarian")
          ) {
            compatibilityScore += 15;
          }

          // Cap at 100%
          compatibilityScore = Math.min(100, compatibilityScore);

          return {
            user: matchUser,
            sharedHobbies,
            compatibilityScore,
          };
        })
        .filter((match) => match.sharedHobbies.length > 0) // Only show matches with shared hobbies
        .sort((a, b) => b.compatibilityScore - a.compatibilityScore); // Sort by compatibility

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
    // This would typically open a messaging interface
    alert(`💌 Message sent to ${matchUser.name}! (This is a demo feature)`);
  };

  return (
    <div className="match-container">
      <Navigation user={user} onLogout={onLogout} />

      <div className="match-content">
        <div className="match-header">
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
