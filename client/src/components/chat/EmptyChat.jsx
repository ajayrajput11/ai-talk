import { Sparkles } from "lucide-react";

const EmptyChat = () => {
  return (
    <div className="flex-1 flex items-center justify-center px-6">
      <div className="text-center max-w-xl">

        <div className="w-20 h-20 mx-auto rounded-3xl bg-slate-100 flex items-center justify-center">
          <Sparkles size={32} className="text-slate-700" />
        </div>

        <h1 className="mt-8 text-4xl md:text-5xl font-bold text-slate-900">
          Welcome to AI-TALK
        </h1>

        <p className="mt-4 text-base md:text-lg text-slate-500 leading-relaxed">
          Ask anything, brainstorm ideas, generate content,
          or solve problems with intelligent conversations.
        </p>

        <div className="mt-8 inline-block px-5 py-3 rounded-2xl bg-slate-100 text-slate-600 text-sm">
          Start by creating or selecting a chat
        </div>
      </div>
    </div>
  );
};

export default EmptyChat;