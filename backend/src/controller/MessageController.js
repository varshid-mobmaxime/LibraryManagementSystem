// const { tryCatch } = require("../utils/tryCatch");
// const Messages = require("../models/MessageModel");

// module.exports.getMessages = tryCatch(async (req, res, next) => {
//   try {
//     const { from, to } = req.body;

//     const messages = await Messages.find({
//       users: {
//         $all: [from, to],
//       },
//     }).sort({ updatedAt: 1 });

//     const projectedMessages = messages.map((msg) => {
//       return {
//         fromSelf: msg.sender.toString() === from,
//         message: msg.message.text,
//       };
//     });
//     res.json(projectedMessages);
//   } catch (ex) {
//     next(ex);
//   }
// });

// module.exports.addMessage = async (req, res, next) => {
//   try {
//     const { from, to, message } = req.body;
//     const data = await Messages.create({
//       message: { text: message },
//       users: [from, to],
//       sender: from,
//     });

//     if (data) return res.json({ msg: "Message added successfully." });
//     else return res.json({ msg: "Failed to add message to the database" });
//   } catch (ex) {
//     next(ex);
//   }
// };

import Conversation from "../models/Conversation.js";
import Message from "../models/MessageModel.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    // await conversation.save();
    // await newMessage.save();

    // this will run in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    // SOCKET IO FUNCTIONALITY WILL GO HERE
    // const receiverSocketId = getReceiverSocketId(receiverId);
    // if (receiverSocketId) {
    //   // io.to(<socket_id>).emit() used to send events to specific client
    //   io.to(receiverSocketId).emit("newMessage", newMessage);
    // }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    })
      .populate("messages")
      .populate("participants");
    // .populate("senderId"); // NOT REFERENCE BUT ACTUAL MESSAGES

    // const requestedBooks = await Conversation.find()
    //    .populate("user", "firstName lastName email")
    //    .populate("book", "title author url");

    console.log("conversation is: ", conversation, userToChatId);

    if (!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json({ success: true, result: messages });
  } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
