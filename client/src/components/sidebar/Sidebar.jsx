import {
  LayoutDashboard,
 MessageSquare,
  User,
  Settings,
  LogOut,
  Plus,
  Sparkles,
} from "lucide-react";

import { useState } from "react";
import {
  useNavigate,
  useLocation,
} from "react-router-dom";

import LogoutModal from "../common/LogoutModal";
import { useChatStore } from "../../store/chatStore";

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const { createChat } = useChatStore();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNewChat = async () => {
    const chat = await createChat();

    if (chat?._id) {
      navigate(`/chat/${chat._id}`);
    } else {
      navigate("/chat");
    }
  };

  const navItems = [
    {
      name: "Dashboard",
      icon: <LayoutDashboard size={20} />,
      path: "/dashboard",
    },
    {
      name: "Chats",
      icon: <MessageSquare size={20} />,
      path: "/chat",
    },
    {
      name: "Profile",
      icon: <User size={20} />,
      path: "/profile",
    },
    {
      name: "Settings",
      icon: <Settings size={20} />,
      path: "/settings",
    },
  ];

  const isActive = (path) => {
    if (path === "/chat") {
      return location.pathname.startsWith("/chat");
    }
    return location.pathname === path;
  };

  return (
    <>
      <aside className="w-72 min-h-screen bg-[#fafafa] border-r border-slate-200 p-6 hidden lg:flex flex-col">

        {/* Logo */}
        <div>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-slate-900 flex items-center justify-center shadow-sm">
              <Sparkles size={22} className="text-white" />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-slate-900">
                AI-TALK
              </h1>

              <p className="text-slate-500 text-xs mt-1">
                Premium AI Workspace
              </p>
            </div>
          </div>
        </div>

        {/* New Chat */}
        <button
          onClick={handleNewChat}
          className="mt-10 w-full bg-slate-900 hover:bg-black text-white py-4 rounded-2xl flex items-center justify-center gap-2 font-medium transition"
        >
          <Plus size={18} />
          New Chat
        </button>

        {/* Navigation */}
        <nav className="mt-10 space-y-3">
          {navItems.map((item) => (
            <button
              key={item.name}
              onClick={() => navigate(item.path)}
              className={`w-full flex items-center gap-4 p-4 rounded-2xl transition ${
                isActive(item.path)
                  ? "bg-slate-900 text-white shadow-sm"
                  : "text-slate-600 hover:bg-white hover:text-slate-900"
              }`}
            >
              {item.icon}
              <span className="font-medium">
                {item.name}
              </span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <div className="mt-auto">
          <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-sm">
            <p className="text-sm text-slate-500 mb-4">
              Secure AI Workspace
            </p>

            <button
              onClick={() =>
                setShowLogoutModal(true)
              }
              className="w-full flex items-center justify-center gap-3 py-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100 transition"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </div>
      </aside>

      <LogoutModal
        isOpen={showLogoutModal}
        onClose={() =>
          setShowLogoutModal(false)
        }
        onConfirm={handleLogout}
      />
    </>
  );
};

export default Sidebar;