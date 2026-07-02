import Message from "../models/Message.js";
import Chat from "../models/Chat.js";

import { getIO } from "../config/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { chatId, content } = req.body;

    const message = await Message.create({
      chatId,
      sender: "user",
      content,
    });

    await Chat.findByIdAndUpdate(chatId, {
      $inc: {
      totalMessages: 2
    },
      lastMessage: content,
      updatedAt: Date.now(),
    });

    const io = getIO();

    io.to(chatId).emit("new_message", message);

    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


