import { Chat } from "../models/chat.model.js";
import {asyncHandler} from "../utils/asyncHandler.js";

// Send Message
export const sendMessage = asyncHandler(async (req, res) => {
  const { receiverId, message } = req.body;
  const senderId = req.user.id; // assuming user is authenticated

  const chat = await Chat.create({ senderId, receiverId, message });
  res.status(201).json({ success: true, chat });
});

// Get Messages
export const getMessages = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const messages = await Chat.find({
    $or: [{ senderId: req.user.id, receiverId: userId }, { senderId: userId, receiverId: req.user.id }],
  }).sort("timestamp");

  res.status(200).json({ success: true, messages });
});