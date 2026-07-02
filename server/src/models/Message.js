import mongoose from "mongoose";
import { trim } from "zod";

const messageSchema = new mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
      required: true,
    },

    sender: {
      type: String,
      enum: ["user", "assistant"],
      required: true,
      index: true,
    },

    content: {
      type: String,
      required: true,
      trim: true,
    },

    model: {
      type: String,
      default: "gpt",
    },

    tokens: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model(
  "Message",
  messageSchema
);