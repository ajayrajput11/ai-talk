import { Pin, Trash2 } from "lucide-react";

const ChatItem = ({
  chat,
  isActive,
  onSelect,
  onPin,
  onDelete,
}) => {
  return (
    <div
      onClick={onSelect}
      className={`group p-4 rounded-2xl cursor-pointer border transition ${
        isActive
          ? "bg-orange-500 text-white border-orange-500"
          : "bg-white/[0.03] border-white/5 hover:bg-white/[0.06]"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        
        {/* Left */}
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
            {chat.lastMessage || "No messages yet"}
          </p>
        </div>

        {/* Right Actions */}
        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onPin();
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
              onDelete();
            }}
            className="text-red-400 hover:scale-110 transition"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatItem;