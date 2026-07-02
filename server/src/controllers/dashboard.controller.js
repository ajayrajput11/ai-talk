import Chat from "../models/Chat.js";
import Message from "../models/Message.js";
import Usage from "../models/Usage.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const totalChats = await Chat.countDocuments({
      userId,
    });

    const pinnedChats = await Chat.countDocuments({
      userId,
      pinned: true,
    });

    const chats = await Chat.find({
      userId,
    });

    const chatIds = chats.map(
      (chat) => chat._id
    );

    const totalMessages =
      await Message.countDocuments({
        chatId: {
          $in: chatIds,
        },
      });

    const totalAIResponses =
      await Message.countDocuments({
        chatId: {
          $in: chatIds,
        },
        sender: "assistant",
      });

    const recentChats =
      await Chat.find({
        userId,
      })
        .sort({
          updatedAt: -1,
        })
        .limit(5);

    res.json({
      totalChats,
      pinnedChats,
      totalMessages,
      totalAIResponses,
      recentChats,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

    