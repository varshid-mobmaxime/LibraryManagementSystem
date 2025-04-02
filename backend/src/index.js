import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

import multer from "multer";
import path from "path";
const socket = require("socket.io");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const booksRoutes = require("./routes/booksRoutes");
const requestBooksRoutes = require("./routes/requestBookRoute");
const favouriteRoutes = require("./routes/favouriteRoutes");
const ratingRoutes = require("./routes/ratingRoutes");
const messageRoutes = require("./routes/messageRoutes");
const mediaUploadRoutes = require("./routes/MediaUploadRoutes");
// const commentsRoutes = require("./routes/commentsRoutes");
const middlewares = require("./middleware/middlewares");

const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");
const ErrorResponse = require("./middleware/ErrorResponse");

dotenv.config();

const port = process.env.PORT || 4000;
import { app, server } from "./socket/socket.js";

const startServer = async () => {
  // const app = express();

  // Example URI, replace with your actual connection string
  const uri = process?.env?.MONGO_URI; // Make sure MONGO_URI is defined in your environment variables

  if (!uri) {
    console.error("MongoDB URI is not defined.");
    process.exit(1);
  }

  mongoose.set("strictQuery", true); // Suppress the strictQuery warning
  await mongoose.connect(process.env.MONGO_URI);

  app.use(morgan("dev"));
  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.get("/", (req, res) => {
    res.json({
      message: "Hello World",
    });
  });

  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  app.use(ErrorResponse);
  app.use("/user", userRoutes);
  app.use("/admin", adminRoutes);
  app.use("/books", booksRoutes);
  app.use("/request-book", requestBooksRoutes);
  app.use("/books", favouriteRoutes);
  app.use("/books-rating", ratingRoutes);
  app.use("/message", messageRoutes);
  // Serve static files
  // app.use("/profile", express.static(path.join(__dirname, "upload/images")));
  // app.use("/profile", express.static("upload/images"));

  app.use("/profileImages", express.static("upload/profileImages"));
  app.use("/bookImages", express.static("upload/bookImages"));

  // Routes
  app.use("/media-upload", mediaUploadRoutes);

  // app.use("/posts", postsRoutes);
  // app.use("/comments", commentsRoutes);

  const server = app.listen({ port }, () =>
    console.log(`🚀 Server ready at http://localhost:${port}`)
  );

  // const io = socket(server, {
  //   cors: {
  //     origin: `http://localhost:${port}`,
  //     credentials: true,
  //   },
  // });

  // global.onlineUsers = new Map();
  // io.on("connection", (socket) => {
  //   global.chatSocket = socket;
  //   socket.on("add-user", (userId) => {
  //     onlineUsers.set(userId, socket.id);
  //   });

  //   socket.on("send-msg", (data) => {
  //     const sendUserSocket = onlineUsers.get(data.to);
  //     if (sendUserSocket) {
  //       socket.to(sendUserSocket).emit("msg-recieve", data.msg);
  //     }
  //   });
  // });

  app.use(middlewares.notFound);
  app.use(middlewares.errorHandler);
};

startServer();
