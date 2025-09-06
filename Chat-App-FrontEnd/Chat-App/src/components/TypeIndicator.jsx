import React from "react";

export const TypingIndicator = ({ typingUser, username }) => {
  if (!typingUser || typingUser === username) return null;
  return <div className="text-sm italic text-gray-500 mb-2">{typingUser} is typing...</div>;
};
