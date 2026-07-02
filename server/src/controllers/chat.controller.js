import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import Usage from "../models/Usage.js";

export const createChat = async (req, res) => {
  try {
    const chat = await Chat.create({
      userId: req.user._id,
      title: "New Chat",
      model: "gpt",
    });

    res.status(201).json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChats = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const chats = await Chat.find({
      userId: req.user._id,
    }).sort({
      pinned: -1,
      updatedAt: -1,
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const searchChats = async (req, res) => {
  try {
    const { query } = req.query;

    const chats = await Chat.find({
      userId: req.user._id,
      title: {
        $regex: query,
        $options: "i",
      },
    });

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const renameChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    if (
      chat.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    chat.title = req.body.title;

    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const togglePinChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    if (
      chat.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    chat.pinned = !chat.pinned;

    await chat.save();

    res.json(chat);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    if (
      chat.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    await Message.deleteMany({
      chatId: req.params.id,
    });

    await chat.deleteOne();

    res.json({
      message: "Chat Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getMessages = async (req, res) => {
  try {
    const chat = await Chat.findById(
      req.params.chatId
    );

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    if (!req.user) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    if (
      chat.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const messages = await Message.find({
      chatId: req.params.chatId,
    }).sort({
      createdAt: 1,
    });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getRecentChats = async (req, res) => {
  try {
    const chats = await Chat.find({
      userId: req.user._id,
    })
      .sort({
        updatedAt: -1,
      })
      .limit(20);

    res.json(chats);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getChatById = async (req, res) => {
  try {
    const chat = await Chat.findById(
      req.params.id
    );

    if (!chat) {
      return res.status(404).json({
        message: "Chat not found",
      });
    }

    if (
      chat.userId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(403).json({
        message: "Unauthorized",
      });
    }

    const messages = await Message.find({
      chatId: req.params.id,
    }).sort({
      createdAt: 1,
    });

    res.json({
      chat,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getUsageStats = async (req, res) => {
  try {
    const usage = await Usage.find({
      userId: req.user._id,
    });

    const totalTokens = usage.reduce(
      (acc, item) => acc + item.tokens,
      0
    );

    res.json({
      totalRequests: usage.length,
      totalTokens,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};