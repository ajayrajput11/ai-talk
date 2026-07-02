import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useDashboardStore } from "../store/dashboardStore";

import {
  MessageSquare,
  Pin,
  Send,
  Bot,
  ArrowRight,
} from "lucide-react";

const Dashboard = () => {
  const navigate = useNavigate();

  const { stats, loading, fetchStats } =
    useDashboardStore();

  useEffect(() => {
    fetchStats();
  }, []);

  if (loading) {
    return (
      <MainLayout>
        <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA]">
          <div className="w-10 h-10 border-2 border-slate-900 border-t-transparent rounded-full animate-spin" />
        </div>
      </MainLayout>
    );
  }

  const statCards = [
    {
      title: "Total Chats",
      value: stats?.totalChats || 0,
      icon: <MessageSquare size={22} />,
    },
    {
      title: "Pinned Chats",
      value: stats?.pinnedChats || 0,
      icon: <Pin size={22} />,
    },
    {
      title: "Messages",
      value: stats?.totalMessages || 0,
      icon: <Send size={22} />,
    },
    {
      title: "AI Responses",
      value: stats?.totalAIResponses || 0,
      icon: <Bot size={22} />,
    },
  ];

  return (
    <MainLayout>
      <div className="min-h-screen bg-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-6">

        {/* Hero */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 lg:p-12 shadow-sm">
          <p className="text-sm font-medium text-slate-500">
            AI Workspace
          </p>

          <h1 className="mt-4 text-3xl sm:text-4xl lg:text-6xl font-bold leading-tight text-slate-900">
            Welcome Back.
            <br />
            Build smarter with AI.
          </h1>

          <p className="mt-5 text-slate-500 text-base sm:text-lg max-w-2xl leading-relaxed">
            Manage conversations, organize chats and collaborate
            with AI in one clean workspace.
          </p>

          <button
            onClick={() => navigate("/chat")}
            className="mt-8 px-6 py-3 rounded-2xl bg-slate-900 text-white font-medium hover:bg-black transition"
          >
            Start New Chat
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mt-6">
          {statCards.map((card) => (
            <div
              key={card.title}
              className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm"
            >
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
                {card.icon}
              </div>

              <h3 className="mt-4 text-slate-500 text-sm">
                {card.title}
              </h3>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {card.value}
              </p>
            </div>
          ))}
        </div>

        {/* Recent Chats */}
        <div className="bg-white border border-slate-200 rounded-[32px] p-6 sm:p-8 mt-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-slate-900">
              Recent Chats
            </h2>

            <button
              onClick={() => navigate("/chat")}
              className="text-sm font-medium text-slate-500 hover:text-slate-900"
            >
              View All
            </button>
          </div>

          {stats?.recentChats?.length > 0 ? (
            <div className="mt-6 space-y-4">
              {stats.recentChats.map((chat) => (
                <div
                  key={chat._id}
                  onClick={() => navigate(`/chat/${chat._id}`)}
                  className="cursor-pointer border border-slate-200 rounded-2xl p-5 hover:bg-slate-50 transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="min-w-0">
                      <h3 className="font-semibold text-slate-900 truncate">
                        {chat.title}
                      </h3>

                      <p className="text-sm text-slate-500 mt-1">
                        Updated recently
                      </p>
                    </div>

                    <ArrowRight
                      size={18}
                      className="text-slate-400"
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-16 text-center">
              <MessageSquare
                size={52}
                className="mx-auto text-slate-300"
              />

              <h3 className="mt-4 text-xl font-semibold text-slate-900">
                No Chats Yet
              </h3>

              <p className="text-slate-500 mt-2">
                Start your first AI conversation.
              </p>

              <button
                onClick={() => navigate("/chat")}
                className="mt-6 px-6 py-3 rounded-2xl bg-slate-900 text-white font-medium"
              >
                Create Chat
              </button>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;