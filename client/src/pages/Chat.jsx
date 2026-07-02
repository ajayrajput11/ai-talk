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
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const {
    messages,
    selectedChat,
    sendMessage,
    sending,
    fetchChats,
    fetchMessages,
  } = useChatStore();

  useEffect(() => {
    fetchChats();
  }, []);

  useEffect(() => {
    if (selectedChat?._id) {
      fetchMessages(selectedChat._id);
    }
  }, [selectedChat]);

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
          <div className="md:hidden p-4 border-b border-slate-200">
            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="p-2 rounded-xl bg-slate-100"
            >
              <Menu size={22} />
            </button>
          </div>

          <ChatHeader chat={selectedChat} />

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