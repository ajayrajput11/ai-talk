import { motion } from "framer-motion";

const MessageBubble = ({ role, content }) => {
  const isUser = role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25 }}
      className={`w-full flex mb-6 ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div className="max-w-[92%] sm:max-w-[80%] lg:max-w-[70%]">
        {/* Label */}
        <p
          className={`text-xs mb-2 px-1 ${
            isUser
              ? "text-right text-slate-500"
              : "text-left text-slate-400"
          }`}
        >
          {isUser ? "You" : "AI-TALK"}
        </p>

        {/* Bubble */}
        <div
          className={`px-5 py-4 rounded-[28px] text-sm sm:text-[15px] leading-7 whitespace-pre-wrap break-words shadow-sm ${
            isUser
              ? "bg-slate-900 text-white rounded-br-md"
              : "bg-white border border-slate-200 text-slate-800 rounded-bl-md"
          }`}
        >
          {content}
        </div>
      </div>
    </motion.div>
  );
};

export default MessageBubble;