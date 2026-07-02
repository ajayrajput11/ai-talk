import mongoose from "mongoose";

const usageSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",
    },

    model: String,

    tokens: Number,
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("Usage", usageSchema);
