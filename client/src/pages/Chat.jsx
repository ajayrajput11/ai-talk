import { useEffect, useState } from "react";
import { Menu } from "lucide-react";
import MainLayout from "../layouts/MainLayout";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";
import EmptyChat from "../components/chat/EmptyChat";

import { useChatStore } from "../store/chatStore";

const Chat = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const {
    messages,
    selectedChat,
    sendMessage,
    sending,
    fetchMessages,
  } = useChatStore();

  useEffect(() => {
    if (selectedChat?._id) {
      fetchMessages(selectedChat._id);
    }
  }, [selectedChat, fetchMessages]);

  return (
    <MainLayout>
      <div className="flex h-screen bg-[#FAFAFA] overflow-hidden">
        
        {/* Sidebar */}
        <ChatSidebar
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main */}
        <div className="flex flex-col flex-1 bg-white border-l border-slate-200">
          
          {/* Mobile Top Bar */}
          <div className="md:hidden px-4 py-3 border-b border-slate-200 bg-white flex items-center justify-between">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 rounded-xl bg-slate-100"
            >
              <Menu size={22} />
            </button>

            <h2 className="font-semibold text-slate-900 truncate max-w-[180px]">
              {selectedChat?.title || "AI-TALK"}
            </h2>

            <div className="w-10" />
          </div>

          {/* Desktop Header Only */}
          <div className="hidden md:block">
            <ChatHeader chat={selectedChat} />
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-5">
            {!selectedChat ? (
              <EmptyChat />
            ) : messages.length === 0 ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <h2 className="text-2xl font-semibold text-slate-900">
                    Start Conversation
                  </h2>
                  <p className="text-slate-500 mt-2">
                    Send your first message.
                  </p>
                </div>
              </div>
            ) : (
              messages.map((msg) => (
                <MessageBubble
                  key={msg._id}
                  role={msg.sender}
                  content={msg.content}
                />
              ))
            )}

            {sending && (
              <div className="text-sm text-slate-500 animate-pulse">
                AI is thinking...
              </div>
            )}
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 bg-white px-4 md:px-8 py-4">
            <ChatInput
              onSend={(text) => {
                if (!selectedChat) return;
                sendMessage(selectedChat._id, text);
              }}
            />
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Chat;