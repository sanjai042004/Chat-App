import { useEffect, useRef, useState, useCallback } from "react";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";

export const useChatSocket = (username, joined) => {
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [typingUser, setTypingUser] = useState("");

  const socketRef = useRef(null);
  const typingTimeout = useRef(null);

  const handleNewMessage = useCallback((data) => {
    setMessages((prev) => [
      ...prev,
      {
        ...data,
        id: uuidv4(),
        time:
          data.time ||
          new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  }, []);

  const handleUserUpdate = useCallback((userList) => {
    setUsers(userList);
  }, []);

  useEffect(() => {
    if (joined && !socketRef.current) {
      socketRef.current = io("http://localhost:5000");
      socketRef.current.emit("join", username);

      socketRef.current.on("message", handleNewMessage);
      socketRef.current.on("users", handleUserUpdate);
      socketRef.current.on("typing", (user) => setTypingUser(user));
      socketRef.current.on("stopTyping", () => setTypingUser(""));
    }

    return () => {
      if (socketRef.current) {
        socketRef.current.off("message", handleNewMessage);
        socketRef.current.off("users", handleUserUpdate);
        socketRef.current.off("typing");
        socketRef.current.off("stopTyping");
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [joined, username, handleNewMessage, handleUserUpdate]);

  const sendMessage = (message) => {
    if (socketRef.current && message.trim()) {
      const msgData = {
        userName: username,
        message,
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      socketRef.current.emit("sendMessage", msgData);
      socketRef.current.emit("stopTyping");
    }
  };

  const handleTyping = () => {
    if (!socketRef.current) return;
    socketRef.current.emit("typing");
    if (typingTimeout.current) clearTimeout(typingTimeout.current);
    typingTimeout.current = setTimeout(() => {
      socketRef.current.emit("stopTyping");
    }, 2000);
  };

  const disconnect = () => {
    if (socketRef.current) {
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    setMessages([]);
    setUsers([]);
    setTypingUser("");
  };

  return { messages, users, typingUser, sendMessage, handleTyping, disconnect };
};
