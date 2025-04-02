import axios from "axios";

class ChatHttpServer {
  getUserId() {
    try {
      return Promise.resolve(localStorage.getItem("userid"));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async removeLS() {
    try {
      localStorage.removeItem("userid");
      localStorage.removeItem("username");
      return true;
    } catch (error) {
      throw error;
    }
  }

  async setLS(key, value) {
    try {
      localStorage.setItem(key, value);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async checkUsernameAvailability(username) {
    try {
      const response = await axios.post(
        "http://localhost:4000/usernameAvailable",
        { username }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async userSessionCheck(userId) {
    try {
      const response = await axios.post(
        "http://localhost:4000/userSessionCheck",
        { userId }
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(userId, toUserId) {
    try {
      const response = await axios.post("http://localhost:4000/getMessages", {
        userId,
        toUserId,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export default new ChatHttpServer();
