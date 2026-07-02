import Message from "../models/Message.js";
import Chat from "../models/Chat.js";
import Usage from "../models/Usage.js";

import { generateAIResponse } from "../services/aiRouter.service.js";
import { generateChatTitle } from "../utils/chat.utils.js";

export const chatWithAI = async (req, res) => {
  try {
    const { chatId, content } = req.body;

    const model = "groq";

    // Save user message
    await Message.create({
      chatId,
      sender: "user",
      content,
      model,
    });

    // Get chat history
    const history = await Message.find({
      chatId,
    }).sort({
      createdAt: 1,
    });

    const messages = history.map((msg) => ({
      role:
        msg.sender === "assistant"
          ? "assistant"
          : "user",

      content: msg.content,
    }));

    // Generate AI response
    const aiResponse =
      await generateAIResponse(
        model,
        messages
      );

    // Save assistant response
    const assistantMessage =
      await Message.create({
        chatId,
        sender: "assistant",
        content: aiResponse.text,
        model,
        tokens:
          aiResponse.tokens || 0,
      });

    // Update chat title on first message
    const chat =
      await Chat.findById(chatId);

    if (
      chat &&
      chat.title === "New Chat"
    ) {
      chat.title =
        generateChatTitle(content);

      await chat.save();
    }

    // Track usage
    await Usage.create({
      userId: req.user._id,
      model,
      tokens:
        aiResponse.tokens || 0,
    });

    // Update chat metadata
    await Chat.findByIdAndUpdate(
      chatId,
      {
        lastMessage: content,
        model,
        $inc: {
          totalMessages: 2,
        },
      }
    );

    return res.status(200).json(
      assistantMessage
    );
  } catch (error) {
    console.error(
      "AI CONTROLLER ERROR:",
      error
    );

    return res.status(500).json({
      _id: Date.now(),
      sender: "assistant",
      content:
        "AI service is temporarily unavailable. Please try again.",
    });
  }
};