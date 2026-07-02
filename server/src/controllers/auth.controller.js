import User from "../models/User.js";
import Chat from "../models/Chat.js";
import Message from "../models/Message.js";

import bcrypt from "bcryptjs";
import generateToken from "../utils/generateToken.js";

/* ==========================
   SIGNUP
========================== */

export const signup = async (req, res) => {
  try {
    const { name, email, password } =
      req.body;

    const exists =
      await User.findOne({
        email,
      });

    if (exists) {
      return res.status(400).json({
        message:
          "User already exists",
      });
    }

    const salt =
      await bcrypt.genSalt(10);

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      );

    const user =
      await User.create({
        name,
        email,
        password:
          hashedPassword,
      });

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
      token: generateToken(
        user._id
      ),
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ==========================
   LOGIN
========================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);

    const user = await User.findOne({ email });

    console.log("USER:", user);

    if (!user) {
      return res.status(401).json({
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    console.log("PASSWORD MATCH:", isMatch);

    if (!isMatch) {
      return res.status(401).json({
        message: "Wrong password",
      });
    }

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

/* ==========================
   CURRENT USER
========================== */

export const getCurrentUser =
  async (req, res) => {
    try {
      const user =
        await User.findById(
          req.user._id
        ).select("-password");

      res.json(user);
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ==========================
   UPDATE PROFILE
========================== */

export const updateProfile =
  async (req, res) => {
    try {
      const {
        name,
        email,
        avatar,
      } = req.body;

      const user =
        await User.findById(
          req.user._id
        );

      if (!user) {
        return res
          .status(404)
          .json({
            message:
              "User not found",
          });
      }

      user.name =
        name || user.name;

      user.email =
        email || user.email;

      user.avatar =
        avatar ||
        user.avatar;

      await user.save();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        avatar:
          user.avatar,
        role: user.role,
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };

/* ==========================
   DELETE ACCOUNT
========================== */

export const deleteAccount =
  async (req, res) => {
    try {
      const userId =
        req.user._id;

      const chats =
        await Chat.find({
          userId,
        });

      const chatIds =
        chats.map(
          (chat) => chat._id
        );

      await Message.deleteMany({
        chatId: {
          $in: chatIds,
        },
      });

      await Chat.deleteMany({
        userId,
      });

      await User.findByIdAndDelete(
        userId
      );

      res.json({
        message:
          "Account deleted successfully",
      });
    } catch (error) {
      res.status(500).json({
        message:
          error.message,
      });
    }
  };