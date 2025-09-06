const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 5000;

const app = express();
app.use(cors());

// Create HTTP server
const server = http.createServer(app);

// Setup Socket.IO
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend URL
    methods: ["GET", "POST"],
  },
});

let users = []; // Online users

io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  // When user joins
  socket.on("join", (username) => {
    socket.username = username;
    users.push(username);

    // Broadcast new user list
    io.emit("users", users);

    // Send system message
    io.emit("message", {
      userName: "system",
      message: `${username} has joined the chat`,
    });

    console.log(`✅ ${username} joined`);
  });

  // Handle new messages
  socket.on("sendMessage", (data) => {
    io.emit("message", {
      userName: data.userName,
      message: data.message,
    });
  });

  // Optional: typing indicator
  socket.on("typing", () => {
    socket.broadcast.emit("typing", socket.username);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    if (socket.username) {
      users = users.filter((user) => user !== socket.username);

      io.emit("users", users);

      io.emit("message", {
        userName: "system",
        message: `${socket.username} has left the chat`,
      });

      console.log(`❌ ${socket.username} disconnected`);
    }
  });
});


server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
