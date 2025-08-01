import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Home from './components/Home';
import Upload from './components/Upload';
import PickupCorner from './components/PickupCorner';
import Match from './components/Match';
import usersData from './data/users.json';
import './App.css';

export interface User {
  id: string;
  username: string;
  password: string;
  type: 'fox' | 'chicken';
  name: string;
  species: string;
  age: number;
  profileImage: string;
  heightCm: number;
  weightKg: number;
  furColor?: string;
  featherColor?: string;
  style: string;
  education: string;
  qualification: string;
  jobTitle: string;
  incomePerMonthCorn: number;
  hobbies: string[];
  diet: string;
  fatherOccupation: string;
  motherOccupation: string;
  siblings: number;
  familyType: string;
  compatibilityScore: number;
  lookingFor: string;
  status: string;
  lastLogin: string;
  postImages: string[];
}

interface UploadedImage {
  id: string;
  userId: string;
  url: string;
  caption: string;
  timestamp: string;
}

function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(usersData.users);
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);

  useEffect(() => {
    // Clear user session on refresh
    setCurrentUser(null);
  }, []);

  const login = (username: string, password: string): boolean => {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const register = (userData: Omit<User, 'id' | 'lastLogin' | 'postImages'>): boolean => {
    const existingUser = users.find(u => u.username === userData.username);
    if (existingUser) {
      return false;
    }

    const newUser: User = {
      ...userData,
      id: `${userData.type}_${Date.now()}`,
      lastLogin: new Date().toISOString(),
      postImages: []
    };

    setUsers([...users, newUser]);
    return true;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const uploadImage = (imageData: Omit<UploadedImage, 'id' | 'timestamp'>) => {
    const newImage: UploadedImage = {
      ...imageData,
      id: `img_${Date.now()}`,
      timestamp: new Date().toISOString()
    };
    setUploadedImages([...uploadedImages, newImage]);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/" 
            element={
              currentUser ? 
              <Navigate to="/home" replace /> : 
              <Login onLogin={login} />
            } 
          />
          <Route 
            path="/register" 
            element={
              currentUser ? 
              <Navigate to="/home" replace /> : 
              <Register onRegister={register} />
            } 
          />
          <Route 
            path="/home" 
            element={
              currentUser ? 
              <Home user={currentUser} onLogout={logout} /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/upload" 
            element={
              currentUser ? 
              <Upload 
                user={currentUser} 
                onLogout={logout} 
                onUpload={uploadImage} 
                uploadedImages={uploadedImages.filter(img => img.userId === currentUser.id)} 
              /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/pickup-corner" 
            element={
              currentUser ? 
              <PickupCorner user={currentUser} onLogout={logout} /> : 
              <Navigate to="/" replace />
            } 
          />
          <Route 
            path="/match" 
            element={
              currentUser ? 
              <Match user={currentUser} users={users} onLogout={logout} /> : 
              <Navigate to="/" replace />
            } 
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;