import React from "react";
import { Link, useLocation } from "react-router-dom";
import { User } from "../App";
import "./Navigation.css";

interface NavigationProps {
  user: User;
  onLogout: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ user, onLogout }) => {
  const location = useLocation();

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="nav-logo">🦊💕🐓</span>
          <span className="nav-title"> Kurukkante Kalyaanam</span>
        </div>

        <div className="nav-links">
          <Link
            to="/home"
            className={`nav-link ${
              location.pathname === "/home" ? "active" : ""
            }`}
          >
            🏠 Home
          </Link>
          <Link
            to="/upload"
            className={`nav-link ${
              location.pathname === "/upload" ? "active" : ""
            }`}
          >
            📸 Upload
          </Link>
          <Link
            to="/pickup-corner"
            className={`nav-link ${
              location.pathname === "/pickup-corner" ? "active" : ""
            }`}
          >
            💌 Pickup Corner
          </Link>
          <Link
            to="/match"
            className={`nav-link ${
              location.pathname === "/match" ? "active" : ""
            }`}
          >
            💘 Find Matches
          </Link>
        </div>

        <div className="nav-user">
          <span className="user-greeting">
            {user.type === "fox" ? "🦊" : "🐓"} Hi, {user.name}!
          </span>
          <button onClick={onLogout} className="logout-btn">
            🚪 Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
