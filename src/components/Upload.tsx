import React, { useState, useEffect } from "react";
import Navigation from "./Navigation";
import { User } from "../App";
import "./Upload.css";

interface UploadedImage {
  id: string;
  userId: string;
  url: string;
  caption: string;
  timestamp: string;
}

interface UploadProps {
  user: User;
  onLogout: () => void;
  onUpload: (imageData: Omit<UploadedImage, "id" | "timestamp">) => void;
  uploadedImages: UploadedImage[];
}

const Upload: React.FC<UploadProps> = ({
  user,
  onLogout,
  onUpload,
  uploadedImages,
}) => {
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [randomImages, setRandomImages] = useState<string[]>([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [viewMode, setViewMode] = useState<"feed" | "grid">("feed");

  // Define all available images from your assets folder
  const foxImages = [
    "/assets/fox1.jpg",
    "/assets/fox2.jpeg",
    "/assets/fox3.jpeg",
    "/assets/fox4.jpeg",
    "/assets/fox5.jpeg",
    "/assets/fox6.jpg",
  ];

  const chickenImages = [
    "/assets/hen1.avif",
    "/assets/hen2.webp",
    "/assets/hen3.jpg",
    "/assets/hen4.jpeg",
    "/assets/hen5.jpg",
    "/assets/hen6.avif",
    "/assets/hen7.jpg",
  ];

  // Fun captions for random generation
  const foxCaptions = [
    "Feeling foxy today! 🦊✨",
    "Just caught the perfect sunset 🌅",
    "Wild and free in nature 🌲",
    "Hunting for the perfect shot 📸",
    "Orange you glad to see me? 🧡",
    "Living my best fox life! 🦊",
    "Sneaky selfie time 😏",
    "Autumn vibes matching my fur 🍂",
    "Pouncing into the weekend! 🦊💫",
    "Sly smile for the camera 😊",
  ];

  const chickenCaptions = [
    "Clucking amazing day! 🐓☀️",
    "Feathers looking fabulous today ✨",
    "Just laid the most beautiful egg! 🥚",
    "Pecking at life one grain at a time 🌾",
    "Strutting my stuff around the farm 💃",
    "Early bird catches the worm! 🐛",
    "Ruffling some feathers today 😎",
    "Hen-tertaining myself in the garden 🌻",
    "Feeling egg-ceptional! 🥚💖",
    "Flapping into Friday like... 🐓✨",
  ];

  // Generate random images on component mount
  useEffect(() => {
    generateRandomImages();
  }, [user.type]);

  const generateRandomImages = () => {
    const availableImages = user.type === "fox" ? foxImages : chickenImages;
    const shuffled = [...availableImages].sort(() => Math.random() - 0.5);
    setRandomImages(shuffled.slice(0, 6)); // Show 6 random images
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!imageUrl || !caption) {
      setMessage("❌ Please provide both image and caption");
      return;
    }

    setIsUploading(true);

    setTimeout(() => {
      onUpload({
        userId: user.id,
        url: imageUrl,
        caption: caption,
      });

      setCaption("");
      setImageUrl("");
      setMessage("✅ Post shared successfully! 🎉");
      setIsUploading(false);
      setShowUploadModal(false);

      setTimeout(() => setMessage(""), 3000);
    }, 1000);
  };

  const useSampleImage = (url: string) => {
    setImageUrl(url);
    // Auto-generate a fun caption
    const captions = user.type === "fox" ? foxCaptions : chickenCaptions;
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];
    setCaption(randomCaption);
  };

  const generateRandomPost = () => {
    const availableImages = user.type === "fox" ? foxImages : chickenImages;
    const captions = user.type === "fox" ? foxCaptions : chickenCaptions;

    const randomImage =
      availableImages[Math.floor(Math.random() * availableImages.length)];
    const randomCaption = captions[Math.floor(Math.random() * captions.length)];

    setImageUrl(randomImage);
    setCaption(randomCaption);
    setMessage("🎲 Random post generated! Edit and post it!");
    setTimeout(() => setMessage(""), 3000);
  };

  const refreshSamples = () => {
    generateRandomImages();
  };

  const formatDate = (dateString: string) => {
    const now = new Date();
    const postDate = new Date(dateString);
    const diffTime = Math.abs(now.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Today";
    if (diffDays === 2) return "Yesterday";
    if (diffDays <= 7) return `${diffDays - 1} days ago`;

    return postDate.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year:
        postDate.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    if (user.type === "fox") {
      target.src =
        "https://images.pexels.com/photos/162140/fox-animal-nature-orange-162140.jpeg?auto=compress&cs=tinysrgb&w=400";
    } else {
      target.src =
        "https://images.pexels.com/photos/1300375/pexels-photo-1300375.jpeg?auto=compress&cs=tinysrgb&w=400";
    }
  };

  const openUploadModal = () => {
    setShowUploadModal(true);
    setCaption("");
    setImageUrl("");
    setMessage("");
  };

  const closeUploadModal = () => {
    setShowUploadModal(false);
    setCaption("");
    setImageUrl("");
    setMessage("");
  };

  return (
    <div className="upload-container">
      <Navigation user={user} onLogout={onLogout} />

      <div className="upload-content">
        <div className="upload-header">
          <h1 className="upload-title">📸 Your Photo Feed</h1>
          <p className="upload-subtitle">
            Share your moments with the world, {user.name}!{" "}
            {user.type === "fox" ? "🦊" : "🐓"}
          </p>

          <div className="view-controls">
            <button
              className={`view-btn ${viewMode === "feed" ? "active" : ""}`}
              onClick={() => setViewMode("feed")}
            >
              📱 Feed View
            </button>
            <button
              className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
              onClick={() => setViewMode("grid")}
            >
              🔲 Grid View
            </button>
          </div>
        </div>

        {/* Global Message */}
        {message && !showUploadModal && (
          <div
            className={`global-message ${
              message.includes("❌") ? "error" : "success"
            }`}
          >
            {message}
          </div>
        )}

        {/* Stats Bar */}
        <div className="stats-bar">
          <div className="stat-item">
            <span className="stat-number">{uploadedImages.length}</span>
            <span className="stat-label">Posts</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">{randomImages.length}</span>
            <span className="stat-label">Sample Images</span>
          </div>
          <div className="stat-item">
            <span className="stat-number">
              {user.type === "fox"
                ? foxCaptions.length
                : chickenCaptions.length}
            </span>
            <span className="stat-label">Fun Captions</span>
          </div>
        </div>

        {/* Posts Display */}
        <div className="posts-section">
          {uploadedImages.length === 0 ? (
            <div className="no-posts">
              <div className="no-posts-icon">
                {user.type === "fox" ? "🦊" : "🐓"}
              </div>
              <h3>No posts yet!</h3>
              <p>Start sharing your amazing moments!</p>
              <button onClick={openUploadModal} className="first-post-btn">
                📸 Share Your First Post
              </button>
            </div>
          ) : (
            <div className={`posts-container ${viewMode}`}>
              {uploadedImages
                .sort(
                  (a, b) =>
                    new Date(b.timestamp).getTime() -
                    new Date(a.timestamp).getTime()
                )
                .map((image) => (
                  <div key={image.id} className={`post-card ${viewMode}`}>
                    {viewMode === "feed" && (
                      <div className="post-header">
                        <img
                          src={user.profileImage}
                          alt={user.name}
                          className="post-avatar"
                        />
                        <div className="post-user-info">
                          <h4>
                            {user.name} {user.type === "fox" ? "🦊" : "🐓"}
                          </h4>
                          <span className="post-date">
                            {formatDate(image.timestamp)}
                          </span>
                        </div>
                      </div>
                    )}

                    <div className="post-image-container">
                      <img
                        src={image.url}
                        alt="Posted content"
                        className="post-image"
                        onError={handleImageError}
                      />
                    </div>

                    <div className="post-content">
                      <p className="post-caption">{image.caption}</p>
                      {viewMode === "grid" && (
                        <span className="post-date-grid">
                          {formatDate(image.timestamp)}
                        </span>
                      )}
                    </div>

                    {viewMode === "feed" && (
                      <div className="post-actions">
                        <button className="action-btn">❤️ Like</button>
                        <button className="action-btn">💬 Comment</button>
                        <button className="action-btn">↗️ Share</button>
                      </div>
                    )}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Floating Add Button */}
        <button
          className="floating-add-btn"
          onClick={openUploadModal}
          title="Add new post"
        >
          ➕
        </button>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="upload-modal-overlay" onClick={closeUploadModal}>
            <div className="upload-modal" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h2>📸 Create New Post</h2>
                <button className="close-modal-btn" onClick={closeUploadModal}>
                  ✕
                </button>
              </div>

              <form onSubmit={handleSubmit} className="upload-form">
                <div className="form-group">
                  <label htmlFor="imageUrl">Image</label>
                  <input
                    type="text"
                    id="imageUrl"
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="Paste image URL or choose from samples..."
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="caption">Caption</label>
                  <textarea
                    id="caption"
                    value={caption}
                    onChange={(e) => setCaption(e.target.value)}
                    placeholder="What's on your mind?"
                    className="form-textarea"
                    rows={3}
                  />
                </div>

                {/* Image Preview */}
                {imageUrl && (
                  <div className="image-preview">
                    <img
                      src={imageUrl}
                      alt="Preview"
                      className="preview-image"
                      onError={handleImageError}
                    />
                  </div>
                )}

                <div className="form-actions">
                  <button
                    type="button"
                    onClick={generateRandomPost}
                    className="random-btn"
                  >
                    🎲 Random Post
                  </button>
                  <button
                    type="submit"
                    className={`post-btn ${isUploading ? "loading" : ""}`}
                    disabled={isUploading}
                  >
                    {isUploading ? "🔄 Posting..." : "📤 Post"}
                  </button>
                </div>

                {message && (
                  <div
                    className={`message ${
                      message.includes("❌") ? "error" : "success"
                    }`}
                  >
                    {message}
                  </div>
                )}

                {/* Sample Images */}
                <div className="sample-images-modal">
                  <div className="sample-header">
                    <h4>🎨 Sample Images</h4>
                    <button
                      type="button"
                      onClick={refreshSamples}
                      className="refresh-samples-btn"
                    >
                      🔄
                    </button>
                  </div>
                  <div className="sample-grid-modal">
                    {randomImages.map((url, index) => (
                      <div
                        key={`${url}-${index}`}
                        className="sample-image-item-modal"
                        onClick={() => useSampleImage(url)}
                      >
                        <img
                          src={url}
                          alt={`Sample ${index + 1}`}
                          className="sample-image-modal"
                          onError={handleImageError}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Upload;
