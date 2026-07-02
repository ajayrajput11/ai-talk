import express from "express";

import protect from "../middleware/auth.middleware.js";

import {
  createChat,
  getChats,
  renameChat,
  deleteChat,
  togglePinChat,
  getMessages,
  searchChats,
  getRecentChats,
  getChatById,
  getUsageStats,
} from "../controllers/chat.controller.js";

const router = express.Router();

router.use(protect);

router.post("/create", createChat);

router.get("/all", getChats);

router.put("/rename/:id", renameChat);

router.delete("/:id", deleteChat);

router.patch("/pin/:id", togglePinChat);

router.get("/messages/:chatId", getMessages);

router.get("/search", protect, searchChats);
router.get("/recent", protect, getRecentChats);
router.get("/:id", protect, getChatById);
router.get("/usage", protect, getUsageStats);

export default router;
