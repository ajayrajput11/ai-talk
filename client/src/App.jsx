import { Routes, Route } from "react-router-dom";
import { useEffect } from "react";

import Landing from "./pages/Landing";
import About from "./pages/About";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";

import ProtectedRoute from "./components/common/ProtectedRoute";
import { useAuthStore } from "./store/authStore";

function App() {
  const { getProfile } = useAuthStore();

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      getProfile();
    }
  }, []);

  return (
    <Routes>
      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Landing />} />
      <Route path="/about" element={<About />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      {/* PROTECTED ROUTES */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/chat/:id"
        element={
          <ProtectedRoute>
            <Chat />
          </ProtectedRoute>
        }
      />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        }
      />

      {/* 404 PAGE */}
      <Route
        path="*"
        element={
          <div className="min-h-screen bg-[#FAFAFA] flex items-center justify-center">
            <div className="text-center px-6">
              <h1 className="text-5xl font-bold text-slate-900">
                404
              </h1>
              <p className="mt-4 text-slate-500">
                Page not found
              </p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}

export default App;