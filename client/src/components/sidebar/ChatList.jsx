import { Pin, Trash2, MessageSquare } from "lucide-react";
import { useChatStore } from "../../store/chatStore";

const ChatList = () => {
  const {
    chats,
    selectedChat,
    setSelectedChat,
    togglePin,
    deleteChat,
  } = useChatStore();

  if (!chats || chats.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center px-4">
        <MessageSquare size={48} className="text-slate-700" />
        <p className="text-slate-500 mt-4">
          No chats yet
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {chats.map((chat) => {
        const isActive =
          selectedChat?._id === chat._id;

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedChat(chat)}
            className={`group p-4 rounded-2xl cursor-pointer border transition ${
              isActive
                ? "bg-orange-500 text-white border-orange-500"
                : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">
                  {chat.title}
                </h3>

                <p
                  className={`text-xs mt-2 truncate ${
                    isActive
                      ? "text-orange-100"
                      : "text-slate-500"
                  }`}
                >
                  {chat.lastMessage ||
                    "No messages yet"}
                </p>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePin(chat._id);
                  }}
                  className="hover:scale-110 transition"
                >
                  <Pin
                    size={16}
                    className={
                      chat.isPinned
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-slate-400"
                    }
                  />
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteChat(chat._id);
                  }}
                  className="text-red-400 hover:scale-110 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatList;