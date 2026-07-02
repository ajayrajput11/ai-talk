import { create } from "zustand";
import api from "../services/api";
import { toast } from "react-hot-toast";

export const useChatStore = create((set, get) => ({
  // ======================
  // STATE
  // ======================

  chats: [],
  selectedChat: null,
  messages: [],
  loading: false,
  sending: false,

  // ======================
  // GET ALL CHATS
  // ======================

  fetchChats: async () => {
    try {
      set({ loading: true });

      const res = await api.get("/api/chat/all");

      set({
        chats: res.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load chats");
    } finally {
      set({
        loading: false,
      });
    }
  },

  // ======================
  // CREATE CHAT
  // ======================

  createChat: async () => {
    try {
      const res = await api.post("/api/chat/create");

      set((state) => ({
        chats: [res.data, ...state.chats],
        selectedChat: res.data,
        messages: [],
      }));

      return res.data;
    } catch (error) {
      console.error(error);
      toast.error("Failed to create chat");
    }
  },

  // ======================
  // FETCH MESSAGES
  // ======================

  fetchMessages: async (chatId) => {
    try {
      const res = await api.get(
        `/api/chat/messages/${chatId}`
      );

      set({
        messages: res.data,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to load messages");
    }
  },

  // ======================
  // SELECT CHAT
  // ======================

  setSelectedChat: async (chat) => {
    set({
      selectedChat: chat,
    });

    await get().fetchMessages(chat._id);
  },

  // ======================
  // SEND MESSAGE
  // ======================

  sendMessage: async (chatId, content) => {
    if (!content.trim()) return;

    try {
      set({
        sending: true,
      });

      const tempMessage = {
        _id: Date.now(),
        sender: "user",
        content,
      };

      set((state) => ({
        messages: [
          ...state.messages,
          tempMessage,
        ],
      }));

      const res = await api.post(
        "/api/ai/chat",
        {
          chatId,
          content,
          model: "gemini",
        }
      );

      set((state) => ({
        messages: [
          ...state.messages,
          res.data,
        ],
      }));

      await get().fetchChats();
    } catch (error) {
      console.error(error);

      toast.error(
        error?.response?.data?.message ||
          "Failed to send message"
      );
    } finally {
      set({
        sending: false,
      });
    }
  },

  // ======================
  // PIN CHAT
  // ======================

  togglePin: async (chatId) => {
    try {
      const res = await api.patch(
        `/api/chat/pin/${chatId}`
      );

      set((state) => ({
        chats: state.chats.map((chat) =>
          chat._id === chatId
            ? res.data
            : chat
        ),
      }));

      toast.success("Chat updated");
    } catch (error) {
      console.error(error);
      toast.error("Failed to pin chat");
    }
  },

  // ======================
  // DELETE CHAT
  // ======================

  deleteChat: async (chatId) => {
    try {
      await api.delete(
        `/api/chat/${chatId}`
      );

      set((state) => ({
        chats: state.chats.filter(
          (chat) => chat._id !== chatId
        ),

        selectedChat:
          state.selectedChat?._id === chatId
            ? null
            : state.selectedChat,

        messages:
          state.selectedChat?._id === chatId
            ? []
            : state.messages,
      }));

      toast.success("Chat deleted");
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete chat");
    }
  },
}));