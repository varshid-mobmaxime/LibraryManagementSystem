import io from "socket.io-client";
import { EventEmitter } from "events";

class ChatSocketServer {
  socket = null;
  eventEmitter = new EventEmitter();

  // Connecting to Socket Server
  establishSocketConnection(userId) {
    try {
      if (!userId) {
        console.error("User ID is required to establish a socket connection.");
        return;
      }

      this.socket = io("http://localhost:4000", {
        query: { userId },
      });

      this.socket.on("connect", () => {
        console.log("Connected to socket server");
      });

      this.socket.on("disconnect", () => {
        console.log("Disconnected from socket server");
      });

      this.socket.on("connect_error", (err) => {
        console.error("Socket connection error:", err.message);
      });
    } catch (error) {
      console.error("Error connecting to socket server:", error);
      alert(`Something went wrong; Can't connect to socket server`);
    }
  }

  getChatList(userId) {
    if (!this.socket) return console.error("Socket not initialized");

    this.socket.emit("chat-list", { userId });

    this.socket.off("chat-list-response"); // Prevent duplicate listeners
    this.socket.on("chat-list-response", (data) => {
      this.eventEmitter.emit("chat-list-response", data);
    });
  }

  sendMessage(message) {
    if (!this.socket) return console.error("Socket not initialized");

    this.socket.emit("add-message", message);
  }

  receiveMessage() {
    if (!this.socket) return console.error("Socket not initialized");

    this.socket.off("add-message-response");
    this.socket.on("add-message-response", (data) => {
      this.eventEmitter.emit("add-message-response", data);
    });
  }

  logout(userId) {
    if (!this.socket) return console.error("Socket not initialized");

    this.socket.emit("logout", userId);

    this.socket.off("logout-response");
    this.socket.on("logout-response", (data) => {
      this.eventEmitter.emit("logout-response", data);
    });
  }

  // Graceful disconnect
  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default new ChatSocketServer();
