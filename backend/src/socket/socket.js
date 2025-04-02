import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const port = process.env.PORT || 4000;

const app = express();

const server = http.createServer(app);
// const io = new Server(server, {
//   cors: {
//     origin: [`http://localhost:${port}`],
//     methods: ["GET", "POST"],
//   },
// });

// const userSocketMap = {}; // {userId: socketId}
// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

// io.on("connection", (socket) => {
//   console.log("a user connected", socket.id);

//   const userId = socket.handshake.query.userId;
//   if (userId != "undefined") userSocketMap[userId] = socket.id;

//   // io.emit() is used to send events to all the connected clients
//   io.emit("getOnlineUsers", Object.keys(userSocketMap));

//   // socket.on() is used to listen to the events. can be used both on client and server side
//   socket.on("disconnect", () => {
//     console.log("user disconnected", socket.id);
//     delete userSocketMap[userId];
//     io.emit("getOnlineUsers", Object.keys(userSocketMap));
//   });
// });

const io = require("socket.io")(server, {
  // pingTimeout: 60000,
  cors: {
    origin: `http://localhost:${port}`,
    // credentials: true,
  },
});

// const userSocketMap = {}; // {userId: socketId}
// export const getReceiverSocketId = (receiverId) => {
//   return userSocketMap[receiverId];
// };

io.on("connection", (socket) => {
  console.log("Connected to socket.io");
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });
  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;

    if (!chat.users) return console.log("chat.users not defined");

    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;

      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });

  socket.off("setup", () => {
    console.log("USER DISCONNECTED");
    socket.leave(userData._id);
  });
});

export { app, io, server };
