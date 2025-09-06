import React, { useRef, useEffect } from "react";
import { MessageItem } from "./MessageItem";

export const MessageList = ({ messages, username }) => {
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto rounded-lg p-3 bg-gray-50 mb-1">
      {messages.map((msg) => (
        <MessageItem key={msg.id} msg={msg} isOwn={msg.userName === username} />
      ))}
      <div ref={messagesEndRef}></div>
    </div>
  );
};
