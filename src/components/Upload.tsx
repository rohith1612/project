import React, { useState } from 'react';
import Navigation from './Navigation';
import { User } from '../App';
import './Upload.css';

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
  onUpload: (imageData: Omit<UploadedImage, 'id' | 'timestamp'>) => void;
  uploadedImages: UploadedImage[];
}

const Upload: React.FC<UploadProps> = ({ user, onLogout, onUpload, uploadedImages }) => {
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [message, setMessage] = useState('');

  // Sample image URLs for demo
  const sampleImages = user.type === 'fox' 
    ? [
        'https://images.pexels.com/photos/162140/fox-animal-nature-orange-162140.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/247502/pexels-photo-247502.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1319515/pexels-photo-1319515.jpeg?auto=compress&cs=tinysrgb&w=400'
      ]
    : [
        'https://images.pexels.com/photos/1300375/pexels-photo-1300375.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1300374/pexels-photo-1300374.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1444648/pexels-photo-1444648.jpeg?auto=compress&cs=tinysrgb&w=400',
        'https://images.pexels.com/photos/1834642/pexels-photo-1834642.jpeg?auto=compress&cs=tinysrgb&w=400'
      ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!imageUrl || !caption) {
      setMessage('❌ Please provide both image URL and caption');
      return;
    }

    setIsUploading(true);
    
    setTimeout(() => {
      onUpload({
        userId: user.id,
        url: imageUrl,
        caption: caption
      });
      
      setCaption('');
      setImageUrl('');
      setMessage('✅ Image uploaded successfully! 🎉');
      setIsUploading(false);
      
      setTimeout(() => setMessage(''), 3000);
    }, 1000);
  };

  const useSampleImage = (url: string) => {
    setImageUrl(url);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="upload-container">
      <Navigation user={user} onLogout={onLogout} />
      
      <div className="upload-content">
        <div className="upload-header">
          <h1 className="upload-title">📸 Share Your Moments</h1>
          <p className="upload-subtitle">
            Show the world your best side, {user.name}! {user.type === 'fox' ? '🦊' : '🐓'}
          </p>
        </div>

        <div className="upload-section">
          <div className="upload-form-container">
            <h2>📤 Upload New Image</h2>
            
            <form onSubmit={handleSubmit} className="upload-form">
              <div className="form-group">
                <label htmlFor="imageUrl">Image URL</label>
                <input
                  type="url"
                  id="imageUrl"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  placeholder="Paste image URL here..."
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label htmlFor="caption">Caption</label>
                <textarea
                  id="caption"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder="Write a fun caption for your image..."
                  className="form-textarea"
                  rows={3}
                />
              </div>

              {message && (
                <div className={`message ${message.includes('❌') ? 'error' : 'success'}`}>
                  {message}
                </div>
              )}

              <button 
                type="submit" 
                className={`upload-btn ${isUploading ? 'loading' : ''}`}
                disabled={isUploading}
              >
                {isUploading ? '🔄 Uploading...' : '📸 Share Image'}
              </button>
            </form>

            <div className="sample-images">
              <h3>🎨 Quick Sample Images</h3>
              <div className="sample-grid">
                {sampleImages.map((url, index) => (
                  <div key={index} className="sample-image-item">
                    <img 
                      src={url} 
                      alt={`Sample ${index + 1}`} 
                      className="sample-image"
                      onClick={() => useSampleImage(url)}
                    />
                    <button 
                      onClick={() => useSampleImage(url)}
                      className="use-sample-btn"
                    >
                      Use This
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="uploaded-images-section">
          <h2>🖼️ Your Photo Gallery ({uploadedImages.length})</h2>
          
          {uploadedImages.length === 0 ? (
            <div className="no-images">
              <div className="no-images-icon">{user.type === 'fox' ? '🦊' : '🐓'}</div>
              <p>No images uploaded yet!</p>
              <p>Share your first photo to get started 📸</p>
            </div>
          ) : (
            <div className="images-grid">
              {uploadedImages.map((image) => (
                <div key={image.id} className="image-card">
                  <div className="image-container">
                    <img src={image.url} alt="Uploaded" className="uploaded-image" />
                  </div>
                  <div className="image-info">
                    <p className="image-caption">{image.caption}</p>
                    <p className="image-date">
                      📅 {formatDate(image.timestamp)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Upload;