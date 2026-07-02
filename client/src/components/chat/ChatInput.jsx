import { useState } from "react";
import { Send } from "lucide-react";
import { useChatStore } from "../../store/chatStore";

const ChatInput = () => {
  const [text, setText] = useState("");

  const {
    sendMessage,
    selectedChat,
    isSending,
  } = useChatStore();

  const handleSend = async () => {
    if (!text.trim()) return;
    if (!selectedChat?._id) return;

    await sendMessage(
      selectedChat._id,
      text
    );

    setText("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="bg-white px-3 md:px-6 py-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-end gap-3 bg-white border border-slate-200 rounded-[28px] px-4 py-3 shadow-sm">

          <textarea
            value={text}
            onChange={(e) =>
              setText(e.target.value)
            }
            onKeyDown={handleKeyDown}
            placeholder="Message AI-TALK..."
            rows={1}
            className="
              flex-1
              resize-none
              bg-transparent
              text-slate-900
              placeholder:text-slate-400
              outline-none
              max-h-40
              py-2
            "
          />

          <button
            onClick={handleSend}
            disabled={isSending}
            className="
              w-12 h-12
              rounded-2xl
              bg-slate-900
              text-white
              flex items-center justify-center
              hover:bg-black
              transition
              disabled:opacity-50
            "
          >
            <Send size={18} />
          </button>
        </div>

        <p className="text-xs text-slate-400 text-center mt-3">
          AI-TALK can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
};

export default ChatInput;