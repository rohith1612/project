import React, { useState } from "react";
import Navigation from "./Navigation";
import { User } from "../App";
import "./PickupCorner.css";

interface PickupCornerProps {
  user: User;
  onLogout: () => void;
}

const PickupCorner: React.FC<PickupCornerProps> = ({ user, onLogout }) => {
  const [currentLine, setCurrentLine] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const foxPickupLines = [
    "Are you a chicken? Because you've got me clucking crazy! 🦊💕",
    "I must be a sly fox, because I've been hunting for someone like you all my life! 🔥",
    "Are you made of corn? Because you're a-maize-ing and I can't stop thinking about you! 🌽",
    "They say foxes are cunning, but I'm completely defenseless against your charm! 😍",
    "Is your coop missing someone? Because I think I found my perfect hen! 🏠💕",
    "Are you a golden egg? Because you're priceless and I want to protect you forever! 🥚✨",
    "I may be a predator, but you've captured my heart instead! 💘",
    "Are you the sun? Because you make this fox want to come out during the day! ☀️",
    "They say opposites attract, and baby, we're living proof! 🧲💕",
    "I'd cross any farmyard just to see you strut! 🚶‍♂️💖",
    "If charm were feathers, you'd be the fluffiest hen in the land! 🪶",
    "I’ve raided many coops, but none had treasure like you! 💎",
    "You don’t need wings to fly—you already soared into my heart! 💓",
    "Are you a sunrise? Because my world lights up when I see you. 🌅",
    "Even a fox needs love—and baby, you’re my favorite prey. 😏💘",
    "Wanna dance under the barn lights and howl at the stars with me? 🌌",
    "You must be corn-fed royalty, because I’ve never seen such grace. 👑",
    "My instincts say ‘hunt’, but my heart says ‘hug’. 🤗",
    "You’ve got more sparkle than a full moon over the meadow. 🌝✨",
    "I don’t chase hens—I wait for the one worth waiting for. That’s you. 💫",
  ];

  const chickenPickupLines = [
    "Are you a fox? Because you've stolen my heart and I don't want it back! 🐓💕",
    "I may be a chicken, but I'm not chicken about telling you how I feel! 💪",
    "Are you hungry? Because I've got all the love you can eat! 🍽️💖",
    "They say I should be afraid of foxes, but you make me feel safe and warm! 🤗",
    "Is your den missing someone? Because I think I've found my perfect fox! 🏠💕",
    "Are you magic? Because every time I see you, my feathers ruffle with excitement! ✨",
    "I may lay eggs, but you've laid claim to my heart! 🥚💘",
    "Are you the moon? Because you make this chicken want to stay up all night! 🌙",
    "They say we're natural enemies, but I think we're naturally meant to be! 💕",
    "I'd flap my wings across any field just to be near you! 🪶💖",
    // NEW:
    "You’re more dazzling than the morning sun on dewdrops. ☀️💧",
    "Every cluck of mine now beats for you. 🐔❤️",
    "Your eyes shine brighter than the grains in my dream feed. 🌾✨",
    "They say foxes are trouble, but you’re the kind I’d cluck with forever. 😚",
    "I’m no scarecrow, but I’ll protect our love from anything. 🧡",
    "If I had a golden egg for every time you made me smile, I’d be a millionaire! 💰",
    "Foxes might be clever, but you outsmarted my defenses with just one grin. 🦊😁",
    "Forget pecking order—I’d follow you anywhere. 👣",
    "You’re the whisper in the wind, the fluff in my feathers, the dream in my coop. 🌬️🪶",
    "Your love turns my coop into a castle. 👑💞",
  ];

  const generateRandomLine = () => {
    setIsGenerating(true);

    setTimeout(() => {
      const lines = user.type === "fox" ? foxPickupLines : chickenPickupLines;
      const randomIndex = Math.floor(Math.random() * lines.length);
      setCurrentLine(lines[randomIndex]);
      setIsGenerating(false);
    }, 800);
  };

  const copyToClipboard = () => {
    if (currentLine) {
      navigator.clipboard.writeText(currentLine);
      // Could add a toast notification here
    }
  };

  return (
    <div className="pickup-container">
      <Navigation user={user} onLogout={onLogout} />

      <div className="pickup-content">
        <div className="pickup-header">
          <h1 className="pickup-title">💌 Pickup Corner</h1>
          <p className="pickup-subtitle">
            Get the perfect lines to woo your {user.lookingFor.toLowerCase()}s!{" "}
            {user.type === "fox" ? "🦊" : "🐓"}
          </p>
        </div>

        <div className="pickup-main">
          <div className="pickup-generator">
            <div className="generator-card">
              <div className="generator-header">
                <h2>
                  ✨ {user.type === "fox" ? "Foxy" : "Clucky"} Pickup Line
                  Generator
                </h2>
                <p>
                  Perfect lines for{" "}
                  {user.type === "fox"
                    ? "charming chickens"
                    : "impressing foxes"}
                  !
                </p>
              </div>

              <div className="line-display">
                {currentLine ? (
                  <div className="pickup-line">
                    <div className="line-text">{currentLine}</div>
                    <button
                      onClick={copyToClipboard}
                      className="copy-btn"
                      title="Copy to clipboard"
                    >
                      📋 Copy
                    </button>
                  </div>
                ) : (
                  <div className="no-line">
                    <div className="line-placeholder">
                      {user.type === "fox" ? "🦊" : "🐓"} Click the button below
                      to get your perfect pickup line!
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={generateRandomLine}
                className={`generate-btn ${isGenerating ? "loading" : ""}`}
                disabled={isGenerating}
              >
                {isGenerating ? "🔄 Generating Magic..." : "🎲 Get New Line"}
              </button>
            </div>
          </div>

          <div className="pickup-tips">
            <div className="tips-card">
              <h3>
                💡 Pro Tips for {user.type === "fox" ? "Foxes" : "Chickens"}
              </h3>
              <div className="tips-list">
                {user.type === "fox" ? (
                  <>
                    <div className="tip-item">
                      <span className="tip-icon">🎯</span>
                      <span>
                        Be confident but respectful - chickens love a gentleman
                        fox!
                      </span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">🌟</span>
                      <span>
                        Show your softer side - not all foxes are sly!
                      </span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">💬</span>
                      <span>
                        Listen actively - chickens have great stories to share!
                      </span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">🎭</span>
                      <span>
                        Use humor wisely - a good laugh can break any ice!
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="tip-item">
                      <span className="tip-icon">🌈</span>
                      <span>Be yourself - foxes love authentic chickens!</span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">💪</span>
                      <span>
                        Show your brave side - confidence is attractive!
                      </span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">🎶</span>
                      <span>
                        Share your interests - common hobbies create bonds!
                      </span>
                    </div>
                    <div className="tip-item">
                      <span className="tip-icon">💝</span>
                      <span>
                        Be genuine with compliments - sincerity always wins!
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="weather-card">
              <h3>🌦️ Perfect Dating Weather</h3>
              <div className="weather-info">
                <div className="weather-icon">☀️🌧️</div>
                <p>
                  Remember: Foxes and chickens marry when it's both sunny and
                  rainy!
                </p>
                <p>Keep an eye out for those magical rainbow moments! 🌈</p>
              </div>
            </div>
          </div>
        </div>

        <div className="pickup-stats">
          <div className="stat-card">
            <div className="stat-number">💘</div>
            <div className="stat-label">Lines Generated Today</div>
            <div className="stat-value">
              {Math.floor(Math.random() * 50) + 10}
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">🎯</div>
            <div className="stat-label">Success Rate</div>
            <div className="stat-value">
              {Math.floor(Math.random() * 30) + 70}%
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-number">💕</div>
            <div className="stat-label">Happy Couples</div>
            <div className="stat-value">
              {Math.floor(Math.random() * 100) + 200}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupCorner;
