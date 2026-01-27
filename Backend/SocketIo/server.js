
const { Server } = require("socket.io");
const http = require("http");
const express = require("express");


const app = express();


const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // frontend port   
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//real time message
const users = {};

const getRecieverSocketId = (receiverId) => {
  return users[receiverId];
};

io.on("connection", (socket) => {
  console.log("A user connected: " + socket.id);
  const userId = socket.handshake.query.userId;
  if (userId) {
    users[userId] = socket.id;
    console.log("hello ", users);
  }

  io.emit("getOnlineUsers", Object.keys(users));

  socket.on("disconnect", () => {
    console.log("User disconnected: " + socket.id);
    delete users[userId];
    io.emit("getOnlineUsers", Object.keys(users));
  });
});

module.exports = { app, server, io, getRecieverSocketId };

