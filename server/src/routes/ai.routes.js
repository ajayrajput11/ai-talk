import express from "express";

import protect from "../middleware/auth.middleware.js";

import { chatWithAI } from "../controllers/ai.controller.js";

const router = express.Router();

router.post("/chat", protect, chatWithAI);

export default router;
