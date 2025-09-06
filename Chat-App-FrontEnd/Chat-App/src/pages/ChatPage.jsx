import React, { useState, useEffect } from "react";
import { Header, MessageInput, MessageList, OnlineUsers, TypingIndicator, UsernameForm } from "../components";
import { useChatSocket } from "../hooks/useChatSocket";

export const ChatPage = () => {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);
  const [message, setMessage] = useState("");

  const { messages, users, typingUser, sendMessage, handleTyping, disconnect } = useChatSocket(username, joined);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) {
      setUsername(savedUser);
      setJoined(true);
    }
  }, []);

  const joinChat = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      setJoined(true);
    }
  };

  const logout = () => {
    disconnect();
    setJoined(false);
    setUsername("");
    localStorage.removeItem("username");
  };

  const handleSend = () => {
    sendMessage(message);
    setMessage("");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-2xl bg-white rounded-xl shadow-lg p-6 flex flex-col h-[80vh]">
        {!joined ? (
          <UsernameForm username={username} onChange={setUsername} onJoin={joinChat} />
        ) : (
          <>
            <Header username={username} onLogout={logout} />
            <OnlineUsers users={users} />
            <MessageList messages={messages} username={username} />
            <TypingIndicator typingUser={typingUser} username={username} />
            <MessageInput message={message} setMessage={setMessage} onSend={handleSend} onTyping={handleTyping} />
          </>
        )}
      </div>
    </div>
  );
};
