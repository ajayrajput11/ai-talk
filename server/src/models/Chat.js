import mongoose from "mongoose";

const chatSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      default: "New Chat",
    },

    model: {
      type: String,
      enum: ["gpt", "gemini", "deepseek"],
      default: "gpt",
    },

    pinned: {
      type: Boolean,
      default: false,
    },

    lastMessage: {
      type: String,
      default: "",
    },

    totalMessages: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Chat", chatSchema);
