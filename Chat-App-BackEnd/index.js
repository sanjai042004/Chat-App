const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");
const PORT = 5000;

const app = express();
app.use(cors());


const server = http.createServer(app);


const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let users = []; 

io.on("connection", (socket) => {
  console.log("🔗User connected:", socket.id);


  socket.on("join", (username) => {
    socket.username = username;
    users.push(username);

    
    io.emit("users", users);

    
    io.emit("message", {
      userName: "system",
      message: `${username} has joined the chat`,
    });

    console.log(`${username} joined`);
  });

  socket.on("sendMessage", (data) => {
    io.emit("message", {
      userName: data.userName,
      message: data.message,
    });
  });

 
  socket.on("typing", () => {
    socket.broadcast.emit("typing", socket.username);
  });

  socket.on("stopTyping", () => {
    socket.broadcast.emit("stopTyping");
  });

  socket.on("disconnect", () => {
    if (socket.username) {
      users = users.filter((user) => user !== socket.username);

      io.emit("users", users);

      io.emit("message", {
        userName: "system",
        message: `${socket.username} has left the chat`,
      });

      console.log(`${socket.username} disconnected`);
    }
  });
});


server.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
