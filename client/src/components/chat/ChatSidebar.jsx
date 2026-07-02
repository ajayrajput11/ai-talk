import { useEffect } from "react";
import { Plus, Pin, Trash2, X } from "lucide-react";
import { useChatStore } from "../../store/chatStore";

const ChatSidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
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

  return (
    <>
      {/* Mobile Overlay */}
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
            <h2 className="font-bold text-lg">Chats</h2>

            <button onClick={() => setSidebarOpen(false)}>
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

        {/* Chat List */}
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
                className={`group rounded-3xl p-4 cursor-pointer border transition-all ${
                  selectedChat?._id === chat._id
                    ? "bg-slate-100 border-slate-300"
                    : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">
                      {chat.title}
                    </p>

                    <p className="text-sm text-slate-500 mt-1 truncate">
                      {chat.lastMessage || "No messages yet"}
                    </p>
                  </div>

                  <div className="opacity-0 group-hover:opacity-100 flex gap-2 transition">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePin(chat._id);
                      }}
                      className="p-2 rounded-xl hover:bg-white"
                    >
                      <Pin
                        size={16}
                        className="text-slate-500"
                      />
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteChat(chat._id);
                      }}
                      className="p-2 rounded-xl hover:bg-white"
                    >
                      <Trash2
                        size={16}
                        className="text-red-500"
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </aside>
    </>
  );
};

export default ChatSidebar;