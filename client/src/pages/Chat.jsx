import { useEffect } from "react";
import MainLayout from "../layouts/MainLayout";

import ChatSidebar from "../components/chat/ChatSidebar";
import ChatHeader from "../components/chat/ChatHeader";
import ChatInput from "../components/chat/ChatInput";
import MessageBubble from "../components/chat/MessageBubble";
import EmptyChat from "../components/chat/EmptyChat";

import { useChatStore } from "../store/chatStore";

const Chat = () => {
  const {
    messages,
    selectedChat,
    sendMessage,
    isSending,
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
        <ChatSidebar />

        {/* Main */}
        <div className="flex flex-col flex-1 bg-white border-l border-slate-200">

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

            {isSending && (
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