const ChatHeader = ({ chat }) => {
  return (
    <header className="h-16 md:h-20 bg-white border-b border-slate-200 px-4 md:px-8 flex items-center justify-between">
      <div>
        <h2 className="text-lg md:text-xl font-semibold text-slate-900">
          {chat?.title || "AI-TALK"}
        </h2>
        <p className="text-xs md:text-sm text-slate-500">
          Intelligent conversations
        </p>
      </div>
    </header>
  );
};

export default ChatHeader;