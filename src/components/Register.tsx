import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { User } from '../App';
import './Register.css';

interface RegisterProps {
  onRegister: (userData: Omit<User, 'id' | 'lastLogin' | 'postImages'>) => boolean;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    name: '',
    type: 'fox' as 'fox' | 'chicken',
    age: '',
    hobbies: [] as string[],
    education: '',
    jobTitle: '',
    diet: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!formData.username || !formData.password || !formData.name || !formData.age) {
      setError('Please fill in all required fields');
      setIsLoading(false);
      return;
    }

    const userData: Omit<User, 'id' | 'lastLogin' | 'postImages'> = {
      username: formData.username,
      password: formData.password,
      type: formData.type,
      name: formData.name,
      species: formData.type === 'fox' ? 'Fox' : 'Chicken',
      age: parseInt(formData.age),
      profileImage: formData.type === 'fox' 
        ? 'https://images.pexels.com/photos/162140/fox-animal-nature-orange-162140.jpeg?auto=compress&cs=tinysrgb&w=400'
        : 'https://images.pexels.com/photos/1300375/pexels-photo-1300375.jpeg?auto=compress&cs=tinysrgb&w=400',
      heightCm: formData.type === 'fox' ? 115 : 40,
      weightKg: formData.type === 'fox' ? 25 : 3,
      furColor: formData.type === 'fox' ? 'Reddish Brown' : undefined,
      featherColor: formData.type === 'chicken' ? 'Mixed Colors' : undefined,
      style: 'Unique and charming',
      education: formData.education || 'School of Life',
      qualification: 'Certified Love Seeker',
      jobTitle: formData.jobTitle || 'Professional Companion Seeker',
      incomePerMonthCorn: Math.floor(Math.random() * 20) + 5,
      hobbies: formData.hobbies,
      diet: formData.diet || 'Balanced',
      fatherOccupation: 'Family Head',
      motherOccupation: 'Homemaker',
      siblings: Math.floor(Math.random() * 5) + 1,
      familyType: 'Loving Family',
      compatibilityScore: Math.floor(Math.random() * 40) + 60,
      lookingFor: formData.type === 'fox' ? 'Hen' : 'Fox',
      status: 'Single'
    };

    setTimeout(() => {
      const success = onRegister(userData);
      if (success) {
        navigate('/');
      } else {
        setError('Username already exists! Please choose a different one.');
      }
      setIsLoading(false);
    }, 500);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

    // ✅ Add hobby options here
  const hobbyOptions = [
    "Dancing",
    "Swimming",
    "Reading",
    "Cooking",
    "Traveling",
    "Photography",
    "Gaming",
    "Music",
    "Painting",
    "Cycling",
  ];

  return (
    <div className="register-container">
      <div className="register-background">
        <div className="floating-emoji">🦊</div>
        <div className="floating-emoji">🐓</div>
        <div className="floating-emoji">💕</div>
        <div className="floating-emoji">🌈</div>
      </div>
      
      <div className="register-card">
        <div className="register-header">
          <h1 className="register-title">🎉 Join X Match Finder</h1>
          <p className="register-subtitle">Create your profile and find your perfect match!</p>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="username">Username *</label>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
                placeholder="Choose a unique username"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password *</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Create a strong password"
                className="form-input"
                required
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="name">Full Name *</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Your full name"
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="type">I am a *</label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="fox">🦊 Fox</option>
                <option value="chicken">🐓 Chicken</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="age">Age *</label>
              <input
                type="number"
                id="age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
                placeholder="Your age"
                className="form-input"
                min="1"
                max="50"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="diet">Diet Preference</label>
              <input
                type="text"
                id="diet"
                name="diet"
                value={formData.diet}
                onChange={handleInputChange}
                placeholder="e.g., Vegetarian, Omnivore"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="education">Education</label>
            <input
              type="text"
              id="education"
              name="education"
              value={formData.education}
              onChange={handleInputChange}
              placeholder="Your educational background"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="jobTitle">Job Title</label>
            <input
              type="text"
              id="jobTitle"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleInputChange}
              placeholder="Your profession"
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="hobbies">Select Your Hobbies</label>
            <div className="hobbies-list">
              {hobbyOptions.map((hobby) => (
                <label key={hobby} className="hobby-checkbox">
                  <input
                    type="checkbox"
                    value={hobby}
                    checked={formData.hobbies.includes(hobby)}
                    onChange={(e) => {
                      const selectedHobby = e.target.value;
                      const newHobbies = formData.hobbies.includes(selectedHobby)
                        ? formData.hobbies.filter((h) => h !== selectedHobby)
                        : [...formData.hobbies, selectedHobby];

                      setFormData({ ...formData, hobbies: newHobbies });
                    }}
                  />
                  {hobby}
                </label>
              ))}
            </div>
          </div>


          {error && <div className="error-message">❌ {error}</div>}

          <button 
            type="submit" 
            className={`register-btn ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? '🔄 Creating Account...' : '💕 Join the Fun!'}
          </button>
        </form>

        <div className="register-footer">
          <p>Already have an account? <Link to="/" className="login-link">🔑 Login here</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;