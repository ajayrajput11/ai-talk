import { create } from "zustand";
import api from "../services/api";

export const useDashboardStore =
  create((set) => ({
    stats: null,
    loading: false,

    fetchStats: async () => {
      try {
        set({
          loading: true,
        });

        const res =
          await api.get(
            "/api/dashboard/stats"
          );

        set({
          stats: res.data,
        });
      } catch (error) {
        console.log(error);
      } finally {
        set({
          loading: false,
        });
      }
    },
  }));