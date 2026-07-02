import { create } from "zustand";
import { toast } from "react-hot-toast";
import api from "../services/api";

export const useAuthStore = create((set) => ({
  user: null,
  isLoading: false,

  // ====================
  // SIGNUP
  // ====================
  signup: async (formData) => {
    try {
      set({ isLoading: true });

      const res = await api.post(
        "/api/auth/signup",
        formData
      );

      const user = res.data;

      localStorage.setItem(
        "token",
        user.token
      );

      set({ user });

      toast.success(
        "Account created successfully"
      );

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Signup failed"
      );

      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // ====================
  // LOGIN
  // ====================
  login: async (formData) => {
    try {
      set({ isLoading: true });

      const res = await api.post(
        "/api/auth/login",
        formData
      );

      const user = res.data;

      localStorage.setItem(
        "token",
        user.token
      );

      set({ user });

      toast.success(
        `Welcome back ${user.name}`
      );

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed"
      );

      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // ====================
  // GET CURRENT USER
  // ====================
  getProfile: async () => {
    try {
      const res = await api.get(
        "/api/auth/me"
      );

      set({
        user: res.data,
      });
    } catch (error) {
      console.log(error);
    }
  },

  // ====================
  // UPDATE PROFILE
  // ====================
  updateProfile: async (
    formData
  ) => {
    try {
      set({ isLoading: true });

      const res = await api.put(
        "/api/auth/profile",
        formData
      );

      set({
        user: res.data,
      });

      toast.success(
        "Profile updated successfully"
      );

      return true;
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Profile update failed"
      );

      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  // ====================
  // DELETE ACCOUNT
  // ====================
  deleteAccount: async () => {
    try {
      set({ isLoading: true });

      await api.delete(
        "/api/auth/delete"
      );

      localStorage.removeItem(
        "token"
      );

      set({
        user: null,
      });

      toast.success(
        "Account deleted successfully"
      );

      window.location.href =
        "/login";
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    } finally {
      set({ isLoading: false });
    }
  },

  // ====================
  // LOGOUT
  // ====================
  logout: () => {
    localStorage.removeItem(
      "token"
    );

    set({
      user: null,
    });

    toast.success(
      "Logged out successfully"
    );

    window.location.href =
      "/login";
  },
}));