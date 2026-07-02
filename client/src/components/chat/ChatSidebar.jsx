import { useEffect, useState } from "react";
import {
  Plus,
  Pin,
  Trash2,
  X,
  LayoutDashboard,
  User,
  LogOut,
  Sparkles,
} from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useChatStore } from "../../store/chatStore";
import LogoutModal from "../common/LogoutModal";

const ChatSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const navigate = useNavigate();

  const [showLogoutModal, setShowLogoutModal] =
    useState(false);

  const {
    chats,
    selectedChat,
    setSelectedChat,
    createChat,
    fetchChats,
    togglePin,
    deleteChat,
  } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, []);

  const handleNewChat = async () => {
    await createChat();
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed md:static top-0 left-0 z-50
          w-[320px] md:w-[340px] h-screen
          bg-white border-r border-slate-200 flex flex-col
          transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-200">
          <div className="flex items-center justify-between mb-4 md:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-slate-900 flex items-center justify-center">
                <Sparkles
                  size={18}
                  className="text-white"
                />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  AI-TALK
                </h2>
                <p className="text-[11px] text-slate-500">
                  Smart AI Workspace
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                setSidebarOpen(false)
              }
            >
              <X size={22} />
            </button>
          </div>

          <button
            onClick={handleNewChat}
            className="w-full bg-slate-900 text-white py-3.5 rounded-2xl flex items-center justify-center gap-2 font-medium hover:bg-black transition"
          >
            <Plus size={18} />
            New Chat
          </button>
        </div>

        {/* Chats */}
        <div className="flex-1 overflow-y-auto p-3 space-y-3">
          {chats?.length === 0 ? (
            <p className="text-slate-400 text-center mt-10 text-sm">
              No chats yet
            </p>
          ) : (
            chats.map((chat) => (
              <div
                key={chat._id}
                onClick={() => {
                  setSelectedChat(chat);
                  setSidebarOpen(false);
                }}
                className={`rounded-3xl p-4 cursor-pointer border transition-all ${
                  selectedChat?._id === chat._id
                    ? "bg-slate-100 border-slate-300"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex flex-col gap-3">
                  <div>
                    <p className="font-semibold text-slate-900 truncate">
                      {chat.title}
                    </p>

                    <p className="text-sm text-slate-500 mt-1 truncate">
                      {chat.lastMessage ||
                        "No messages yet"}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(chat._id);
                      }}
                      className="flex-1 p-2 rounded-xl bg-slate-100 hover:bg-slate-200"
                    >
                      <Pin
                        size={16}
                        className="mx-auto text-slate-600"
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat._id);
                      }}
                      className="flex-1 p-2 rounded-xl bg-red-50 hover:bg-red-100"
                    >
                      <Trash2
                        size={16}
                        className="mx-auto text-red-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Bottom Menu */}
        <div className="p-4 border-t border-slate-200 space-y-3">
          <button
            onClick={() =>
              navigate("/dashboard")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-100"
          >
            <LayoutDashboard size={18} />
            Dashboard
          </button>

          <button
            onClick={() =>
              navigate("/profile")
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl hover:bg-slate-100"
          >
            <User size={18} />
            Profile
          </button>

          <button
            onClick={() =>
              setShowLogoutModal(true)
            }
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl bg-red-50 text-red-500 hover:bg-red-100"
          >
            <LogOut size={18} />
            Logout
          </button>
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

export default ChatSidebar;