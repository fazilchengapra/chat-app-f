import React, { useEffect, useRef, useState } from "react";
import Message from "./Message";
import axios from "axios";
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

const Chat = ({ username }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef(null);

   useEffect(() => {
    axios.get('http://localhost:5000/api/messages')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));

    socket.emit('join', username);

    socket.on('receiveMessage', (data) => {
      setMessages(prev => [...prev, data]);
    });

    return () => {
      socket.off('receiveMessage');
    };
  }, [username]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (newMessage.trim()) {
      socket.emit('sendMessage', { username, message: newMessage });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>Chat Room</h2>
        <span>User: {username}</span>
      </div>
      <div className="messages-container">
        {messages.map((msg, index) => (
          <Message
            key={index}
            username={msg.username}
            message={msg.message}
            timestamp={msg.timestamp}
            isOwn={msg.username === username}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form className="message-input" onSubmit={sendMessage}>
        <input
          type="text"
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chat;
