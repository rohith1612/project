// src/components/Chat.tsx
import React, { useState } from "react";
import { User } from "../App";
import "./Chat.css";

interface ChatProps {
  currentUser: User;
  matchUser: User;
  onBack: () => void;
}

interface Message {
  senderId: number;
  text: string;
  timestamp: string;
}

const Chat: React.FC<ChatProps> = ({ currentUser, matchUser, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      senderId: Number(currentUser.id),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages([...messages, msg]);
    setNewMessage("");
  };

  const startVoiceCall = () => {
    alert(`📞 Voice call with ${matchUser.name} started! (Demo)`);
  };

  const startVideoCall = () => {
    alert(`🎥 Video call with ${matchUser.name} started! (Demo)`);
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <button className="back-btn" onClick={onBack}>⬅</button>
        <img src={matchUser.profileImage} alt={matchUser.name} className="chat-avatar" />
        <h2>{matchUser.name}</h2>
        <div className="chat-actions">
          <button className="call-btn" onClick={startVoiceCall}>📞</button>
          <button className="video-btn" onClick={startVideoCall}>🎥</button>
        </div>
      </div>

      <div className="chat-messages">
        {messages.length === 0 ? (
          <p className="no-messages">No messages yet. Say hi! 👋</p>
        ) : (
          messages.map((msg, idx) => (
            <div
              key={idx}
              className={`message ${msg.senderId === Number(currentUser.id) ? "sent" : "received"}`}
            >
              <p>{msg.text}</p>
              <span className="timestamp">{msg.timestamp}</span>
            </div>
          ))
        )}
      </div>

      <div className="chat-input-section">
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button className="send-btn" onClick={sendMessage}>➡</button>
      </div>
    </div>
  );
};

export default Chat;
