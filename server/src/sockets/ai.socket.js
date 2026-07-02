import Message from "../models/Message.js";

import { handleAIStream } from "../services/streaming.service.js";

const registerAISocket = (io) => {
  io.on("connection", (socket) => {
    socket.on(
      "ai_message",

      async (data) => {
        try {
          const { chatId, content } = data;

          await Message.create({
            chatId,

            sender: "user",

            content,
          });

          const history = await Message.find({
            chatId,
          });

          const messages = history.map((msg) => ({
            role: msg.sender === "assistant" ? "assistant" : "user",

            content: msg.content,
          }));

          await handleAIStream({
            chatId,
            messages,
            socket,
          });
        } catch (error) {
          socket.emit("ai_error", error.message);
        }
      },
    );
  });
};

export default registerAISocket;
