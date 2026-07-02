import express from "express";
import {
  signup,
  login,
  getCurrentUser,
  updateProfile,
  deleteAccount,
} from "../controllers/auth.controller.js";

import validate from "../middleware/validate.js";
import protect from "../middleware/auth.middleware.js";
import { signupSchema } from "../validators/auth.validator.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", login);

router.get("/me", protect, getCurrentUser);
router.put("/profile", protect, updateProfile);
router.delete("/delete", protect, deleteAccount);

export default router;