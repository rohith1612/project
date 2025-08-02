import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { User } from "../App";
import "./PickupCorner.css";

interface PickupCornerProps {
  user: User;
  onLogout: () => void;
}

interface PickupPost {
  id: string;
  author: {
    id: string;
    name: string;
    type: "fox" | "chicken";
    profileImage: string;
  };
  content: string;
  timestamp: string;
  likes: number;
  isLiked: boolean;
}

const PickupCorner: React.FC<PickupCornerProps> = ({ user, onLogout }) => {
  const [currentLine, setCurrentLine] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [pickupPosts, setPickupPosts] = useState<PickupPost[]>([]);
  const [hallOfFame, setHallOfFame] = useState<
    {
      id: string;
      name: string;
      type: "fox" | "chicken";
      profileImage: string;
      count: number;
    }[]
  >([]);

  const foxImages = [
    "/src/assets/fox1.jpg",
    "/src/assets/fox2.jpeg",
    "/src/assets/fox3.jpeg",
    "/src/assets/fox4.jpeg",
    "/src/assets/fox5.jpeg",
    "/src/assets/fox6.jpg",
  ];

  const henImages = [
    "/src/assets/hen1.avif",
    "/src/assets/hen2.webp",
    "/src/assets/hen3.jpg",
    "/src/assets/hen4.jpeg",
    "/src/assets/hen5.jpg",
    "/src/assets/hen6.avif",
    "/src/assets/hen7.jpg",
  ];

  const mockUsers = [
    {
      id: "fox_1",
      name: "Aayas Kurukkan",
      type: "fox" as const,
      profileImage: foxImages[0],
    },
    {
      id: "chicken_1",
      name: "Diya Kozhi",
      type: "chicken" as const,
      profileImage: henImages[3],
    },
    {
      id: "fox_2",
      name: "Adwaith Kozhi",
      type: "fox" as const,
      profileImage: foxImages[2],
    },
    {
      id: "chicken_2",
      name: "Sreemrudu Kozhi",
      type: "chicken" as const,
      profileImage: henImages[1],
    },
    {
      id: "fox_3",
      name: "Glenys Kurukkan",
      type: "fox" as const,
      profileImage: foxImages[5],
    },
    {
      id: "chicken_3",
      name: "Jovin Kozhi",
      type: "chicken" as const,
      profileImage: henImages[6],
    },
    {
      id: "fox_4",
      name: "Sreehari Kurukkan",
      type: "fox" as const,
      profileImage: foxImages[1],
    },
    {
      id: "chicken_4",
      name: "Adil Kozhi",
      type: "chicken" as const,
      profileImage: henImages[4],
    },
  ];

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
    "I've raided many coops, but none had treasure like you! 💎",
    "You don't need wings to fly—you already soared into my heart! 💓",
    "Are you a sunrise? Because my world lights up when I see you. 🌅",
    "Even a fox needs love—and baby, you're my favorite prey. 😏💘",
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
    "You're more dazzling than the morning sun on dewdrops. ☀️💧",
    "Every cluck of mine now beats for you. 🐔❤️",
    "Your eyes shine brighter than the grains in my dream feed. 🌾✨",
    "They say foxes are trouble, but you're the kind I'd cluck with forever. 😚",
    "I'm no scarecrow, but I'll protect our love from anything. 🧡",
  ];

  const allPickupLines = [...foxPickupLines, ...chickenPickupLines];

  useEffect(() => {
    generatePickupFeed();
    generateHallOfFame();
  }, []);

  const generatePickupFeed = () => {
    const numberOfPosts = Math.floor(Math.random() * 3) + 5; // 5-7 posts
    const posts: PickupPost[] = [];

    for (let i = 0; i < numberOfPosts; i++) {
      const randomUser =
        mockUsers[Math.floor(Math.random() * mockUsers.length)];
      const randomLine =
        allPickupLines[Math.floor(Math.random() * allPickupLines.length)];
      const randomTimestamp = new Date(
        Date.now() - Math.random() * 86400000 * 7
      ); // Within last week

      posts.push({
        id: `post_${i}_${Date.now()}`,
        author: randomUser,
        content: randomLine,
        timestamp: randomTimestamp.toISOString(),
        likes: Math.floor(Math.random() * 50) + 1,
        isLiked: Math.random() > 0.7,
      });
    }

    // Sort by timestamp (newest first)
    posts.sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    setPickupPosts(posts);
  };

  const generateHallOfFame = () => {
    const fame = mockUsers
      .map((u) => ({
        ...u,
        count: Math.floor(Math.random() * 25) + 5, // 5-30 pickup lines
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setHallOfFame(fame);
  };

  const generateRandomLine = () => {
    setIsGenerating(true);
    setTimeout(() => {
      const lines = user.type === "fox" ? foxPickupLines : chickenPickupLines;
      const randomIndex = Math.floor(Math.random() * lines.length);
      setCurrentLine(lines[randomIndex]);
      setIsGenerating(false);
    }, 1000);
  };

  const toggleLike = (postId: string) => {
    setPickupPosts((posts) =>
      posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    );
  };

  const formatTimeAgo = (timestamp: string) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInHours = Math.floor(
      (now.getTime() - time.getTime()) / (1000 * 60 * 60)
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  return (
    <div className="pickup-container">
      <Navigation user={user} onLogout={onLogout} />

      <div className="pickup-content">
        <div className="pickup-header">
          <h1>💌 Pickup Corner</h1>
          <p>Share and discover the best pickup lines!</p>
        </div>

        <div className="pickup-layout">
          {/* Main Feed */}
          <div className="pickup-main">
            {/* Generator Section */}
            <div className="generator-section">
              <h2>🎲 Line Generator</h2>
              <div className="generator-box">
                {currentLine ? (
                  <div className="generated-line">
                    <p>"{currentLine}"</p>
                    <button
                      onClick={() => navigator.clipboard.writeText(currentLine)}
                      className="copy-btn"
                    >
                      📋 Copy
                    </button>
                  </div>
                ) : (
                  <p className="placeholder">
                    Click below to generate your perfect line!
                  </p>
                )}
                <button
                  onClick={generateRandomLine}
                  disabled={isGenerating}
                  className="generate-btn"
                >
                  {isGenerating ? "🔄 Generating..." : "✨ Generate Line"}
                </button>
              </div>
            </div>

            {/* Feed Section */}
            <div className="feed-section">
              <div className="feed-header">
                <h2>📱 Latest Lines</h2>
                <button onClick={generatePickupFeed} className="refresh-btn">
                  🔄 Refresh
                </button>
              </div>

              <div className="pickup-feed">
                {pickupPosts.map((post) => (
                  <div key={post.id} className="pickup-post">
                    <div className="post-header">
                      <img
                        src={post.author.profileImage}
                        alt={post.author.name}
                        className="post-avatar"
                      />
                      <div className="post-info">
                        <h4>{post.author.name}</h4>
                        <span className="post-type">
                          {post.author.type === "fox" ? "🦊" : "🐓"}{" "}
                          {post.author.type}
                        </span>
                        <span className="post-time">
                          {formatTimeAgo(post.timestamp)}
                        </span>
                      </div>
                    </div>

                    <div className="post-content">
                      <p>"{post.content}"</p>
                    </div>

                    <div className="post-actions">
                      <button
                        onClick={() => toggleLike(post.id)}
                        className={`like-btn ${post.isLiked ? "liked" : ""}`}
                      >
                        {post.isLiked ? "❤️" : "🤍"} {post.likes}
                      </button>
                      <button className="share-btn">📤 Share</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="pickup-sidebar">
            {/* Hall of Fame */}
            <div className="hall-of-fame">
              <h3>🏆 Hall of Fame</h3>
              <div className="fame-list">
                {hallOfFame.map((entry, index) => (
                  <div key={entry.id} className="fame-entry">
                    <div className="fame-rank">#{index + 1}</div>
                    <img
                      src={entry.profileImage}
                      alt={entry.name}
                      className="fame-avatar"
                    />
                    <div className="fame-info">
                      <h4>{entry.name}</h4>
                      <p>{entry.count} lines</p>
                    </div>
                    <div className="fame-badge">
                      {index === 0
                        ? "🥇"
                        : index === 1
                        ? "🥈"
                        : index === 2
                        ? "🥉"
                        : "⭐"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="quick-stats">
              <h3>📊 Quick Stats</h3>
              <div className="stat-item">
                <span className="stat-icon">💘</span>
                <span>
                  Total Lines: {Math.floor(Math.random() * 500) + 200}
                </span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">👥</span>
                <span>Active Users: {mockUsers.length}</span>
              </div>
              <div className="stat-item">
                <span className="stat-icon">🔥</span>
                <span>
                  Success Rate: {Math.floor(Math.random() * 20) + 75}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PickupCorner;
