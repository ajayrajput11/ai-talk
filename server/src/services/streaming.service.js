import Message from "../models/Message.js";
import { askGroq } from "./groq.service.js";
export const handleAIStream = async ({ chatId, messages, socket }) => {
  const response = await askGroq(messages);

  const finalText = response.text;

  socket.emit("ai_chunk", finalText);

  await Message.create({
    chatId,
    sender: "assistant",
    content: finalText,
  });

  socket.emit("ai_complete");
};