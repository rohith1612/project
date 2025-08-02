import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Login.css";

interface LoginProps {
  onLogin: (username: string, password: string) => boolean;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    // Simulate loading
    setTimeout(() => {
      const success = onLogin(username, password);
      if (!success) {
        setError("Invalid username or password");
      }
      setIsLoading(false);
    }, 500);
  };

  return (
    <div className="login-container">
      <div className="login-background">
        <div className="floating-emoji">🦊</div>
        <div className="floating-emoji">🐓</div>
        <div className="floating-emoji">💕</div>
        <div className="floating-emoji">🌈</div>
      </div>

      <div className="login-card">
        <div className="login-header">
          <h1 className="login-title">🦊💕🐓 Kurukkantem Kozhidem Kalyanam</h1>
          <p className="login-subtitle">
            Mazhayum Veyilum, Ohh Kurukkante kalyanam!!
          </p>
          <div className="weather-info">
            ☀️ It only works when the weather is confused !!
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="form-input"
            />
          </div>

          {error && <div className="error-message">❌ {error}</div>}

          <button
            type="submit"
            className={`login-btn ${isLoading ? "loading" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "🔄 Logging in..." : "💕 Find Love"}
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{" "}
            <Link to="/register" className="register-link">
              🎉 Register here
            </Link>
          </p>

          <div className="demo-accounts">
            <h4>🎮 Demo Accounts:</h4>
            <div className="demo-grid">
              <div className="demo-account">
                <span>🦊 kurukkan_fox / kurukkan123</span>
              </div>
              <div className="demo-account">
                <span>🐓 feather_queen / cluck123</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
