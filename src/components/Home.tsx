import React, { useState } from "react";
import Navigation from "./Navigation";
import { User } from "../App";
import "./Home.css";

interface HomeProps {
  user: User;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  const [showProfile, setShowProfile] = useState(false);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="home-container">
      <Navigation user={user} onLogout={onLogout} />

      {/* Profile Icon Top-Left */}
      <div className="profile-icon" onClick={() => setShowProfile(true)}>
        {user.profileImage ? (
          <img src={user.profileImage} alt="Profile" />
        ) : (
          <div className="profile-letter">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>

      <div className="home-content">
        <div className="welcome-section">
          <div className="welcome-header">
            <h1 className="welcome-title">
              Welcome back, {user.name}! {user.type === "fox" ? "🦊" : "🐓"}
            </h1>
            <p className="welcome-subtitle">
              Check out our successful matches & special promotions! ✨
            </p>
          </div>
        </div>

        {/* Testimonials Section */}
        <div className="testimonials-section">
          <h3>💍 Successful Love Stories</h3>
          <div className="testimonials-grid">
            {[
              {
                name: "Foxy & Rosie",
                img: "/images/couple1.jpg",
                story:
                  "Met during the spring festival, now happily raising 3 chicks! 🐣",
              },
              {
                name: "Cluckster & Bella",
                img: "/images/couple2.jpg",
                story: "A monsoon romance that turned into lifelong love 🌧❤️",
              },
              {
                name: "Amber & Rusty",
                img: "/images/couple3.jpg",
                story: "Bonded over corn trading and evening walks 🌽✨",
              },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <img src={t.img} alt={t.name} />
                <h4>{t.name}</h4>
                <p>{t.story}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Promotions Section */}
        <div className="promotions-section">
          <h3>🎉 Special Promotions</h3>
          <div className="promotion-banner">
            💌 Rainy Season Offer: Send free pickup lines to 5 matches today!
          </div>
          <div className="promotion-banner">
            🌞 Sunny Season Match Boost: Double your profile visibility for 24
            hrs.
          </div>
        </div>

        {/* Pair Recommendations (as we built earlier) */}
        <div className="pair-recommendations">
          <h3>💞 Pair Recommendations for You</h3>
          <p className="recommendation-subtitle">
            Based on your {user.type === "fox" ? "fox" : "hen"} vibes and
            seasonal charm, here are your top picks:
          </p>

          <div className="recommendations-grid">
            {[
              {
                name: "Rosie Hen",
                image: "/src/assets/fox1.jpg",
                note: "Sunny season partner 🌞",
              },
              {
                name: "Clucky Belle",
                image: "/src/assets/fox1.jpg",
                note: "Rainy season cuddle 🐥",
              },
              {
                name: "Scarlet Hen",
                image: "/src/assets/fox1.jpg",
                note: "Loves evening walks 🌇",
              },
              {
                name: "Amber Hen",
                image: "/src/assets/fox1.jpg",
                note: "Perfect festival companion 🎉",
              },
              {
                name: "Luna Hen",
                image: "/src/assets/fox1.jpg",
                note: "Adventurous and charming ✨",
              },
            ].map((rec, index) => (
              <div key={index} className="recommendation-card">
                <img
                  src={rec.image}
                  alt={rec.name}
                  className="recommendation-image"
                />
                <h4 className="recommendation-name">{rec.name}</h4>
                <p className="recommendation-note">{rec.note}</p>
                <button className="view-profile-btn">View Profile</button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Profile Popup Modal */}
      {showProfile && (
        <div className="profile-modal">
          <div className="profile-modal-content">
            <button className="close-btn" onClick={() => setShowProfile(false)}>
              ×
            </button>

            <div className="profile-card">
              <div className="profile-image-container">
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="profile-image"
                  />
                ) : (
                  <div className="profile-letter-big">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="status-badge">{user.status} 💖</div>
              </div>

              <div className="profile-info">
                <h2 className="profile-name">{user.name}</h2>
                <p className="profile-species">
                  {user.species} • {user.age} years old
                </p>
                <p className="profile-style">{user.style}</p>

                <div className="profile-stats">
                  <div className="stat-item">
                    <span className="stat-label">Height:</span>
                    <span className="stat-value">{user.heightCm} cm</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Weight:</span>
                    <span className="stat-value">{user.weightKg} kg</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Income:</span>
                    <span className="stat-value">
                      {user.incomePerMonthCorn} corn/month 🌽
                    </span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-label">Compatibility:</span>
                    <span className="stat-value">
                      {user.compatibilityScore}% 💯
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="info-cards">
              <div className="info-card">
                <h3>🎓 Professional Info</h3>
                <p>
                  <strong>Education:</strong> {user.education}
                </p>
                <p>
                  <strong>Qualification:</strong> {user.qualification}
                </p>
                <p>
                  <strong>Job Title:</strong> {user.jobTitle}
                </p>
                <p>
                  <strong>Color:</strong> {user.furColor || user.featherColor}
                </p>
              </div>
              <div className="info-card">
                <h3>🏠 Family Background</h3>
                <p>
                  <strong>Father:</strong> {user.fatherOccupation}
                </p>
                <p>
                  <strong>Mother:</strong> {user.motherOccupation}
                </p>
                <p>
                  <strong>Siblings:</strong> {user.siblings}
                </p>
                <p>
                  <strong>Family Type:</strong> {user.familyType}
                </p>
              </div>
              <div className="info-card">
                <h3>🎯 Preferences</h3>
                <p>
                  <strong>Diet:</strong> {user.diet}
                </p>
                <p>
                  <strong>Looking for:</strong> {user.lookingFor}
                </p>
                <p>
                  <strong>Last Login:</strong> {formatDate(user.lastLogin)}
                </p>
              </div>
              <div className="info-card hobbies-card">
                <h3>🎨 My Hobbies</h3>
                <div className="hobbies-list">
                  {user.hobbies.map((hobby, index) => (
                    <span key={index} className="hobby-tag">
                      {hobby}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <button className="edit-profile-btn">✏️ Edit Profile</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
