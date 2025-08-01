import React from 'react';
import Navigation from './Navigation';
import { User } from '../App';
import './Home.css';

interface HomeProps {
  user: User;
  onLogout: () => void;
}

const Home: React.FC<HomeProps> = ({ user, onLogout }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="home-container">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="home-content">
        <div className="welcome-section">
          <div className="welcome-header">
            <h1 className="welcome-title">
              Welcome back, {user.name}! {user.type === 'fox' ? '🦊' : '🐓'}
            </h1>
            <p className="welcome-subtitle">
              Ready to find your perfect {user.lookingFor.toLowerCase()}? Let's make some magic happen! ✨
            </p>
          </div>
        </div>

        <div className="profile-dashboard">
          <div className="profile-card">
            <div className="profile-image-container">
              <img src={user.profileImage} alt={user.name} className="profile-image" />
              <div className="status-badge">
                {user.status} 💖
              </div>
            </div>
            
            <div className="profile-info">
              <h2 className="profile-name">{user.name}</h2>
              <p className="profile-species">{user.species} • {user.age} years old</p>
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
                  <span className="stat-value">{user.incomePerMonthCorn} corn/month 🌽</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">Compatibility:</span>
                  <span className="stat-value">{user.compatibilityScore}% 💯</span>
                </div>
              </div>
            </div>
          </div>

          <div className="info-cards">
            <div className="info-card">
              <h3>🎓 Professional Info</h3>
              <div className="info-content">
                <p><strong>Education:</strong> {user.education}</p>
                <p><strong>Qualification:</strong> {user.qualification}</p>
                <p><strong>Job Title:</strong> {user.jobTitle}</p>
                <p><strong>Color:</strong> {user.furColor || user.featherColor}</p>
              </div>
            </div>

            <div className="info-card">
              <h3>🏠 Family Background</h3>
              <div className="info-content">
                <p><strong>Father:</strong> {user.fatherOccupation}</p>
                <p><strong>Mother:</strong> {user.motherOccupation}</p>
                <p><strong>Siblings:</strong> {user.siblings}</p>
                <p><strong>Family Type:</strong> {user.familyType}</p>
              </div>
            </div>

            <div className="info-card">
              <h3>🎯 Preferences</h3>
              <div className="info-content">
                <p><strong>Diet:</strong> {user.diet}</p>
                <p><strong>Looking for:</strong> {user.lookingFor}</p>
                <p><strong>Last Login:</strong> {formatDate(user.lastLogin)}</p>
              </div>
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
        </div>

        <div className="pair-recommendations">
          <h3>💞 Pair Recommendations for You</h3>
          <p className="recommendation-subtitle">
            Based on your {user.type === 'fox' ? 'fox' : 'hen'} vibes and seasonal charm, here are your top picks:
          </p>

          <div className="recommendations-grid">
            {[
              { name: "Rosie Hen", image: "/images/hen1.jpg", note: "Sunny season partner 🌞" },
              { name: "Clucky Belle", image: "/images/hen2.jpg", note: "Rainy season cuddle 🐥" },
              { name: "Scarlet Hen", image: "/images/hen3.jpg", note: "Loves evening walks 🌇" },
              { name: "Amber Hen", image: "/images/hen4.jpg", note: "Perfect festival companion 🎉" },
              { name: "Luna Hen", image: "/images/hen5.jpg", note: "Adventurous and charming ✨" },
            ].map((rec, index) => (
              <div key={index} className="recommendation-card">
                <img src={rec.image} alt={rec.name} className="recommendation-image" />
                <h4 className="recommendation-name">{rec.name}</h4>
                <p className="recommendation-note">{rec.note}</p>
                <button className="view-profile-btn">View Profile</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;