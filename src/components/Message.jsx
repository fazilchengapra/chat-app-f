import React from "react";

const Message = ({ username, message, timestamp, isOwn }) => {
  

  return (
    <div className={`message ${isOwn ? "own" : "other"}`}>
      <div className="message-header">
        <strong>{username}</strong>
        <span className="timestamp">
          just now
        </span>
      </div>
      <div className="message-content">{message}</div>
    </div>
  );
};

export default Message;