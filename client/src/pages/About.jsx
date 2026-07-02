import { motion } from "framer-motion";
import {
  Bot,
  MessageSquare,
  Zap,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Bot size={26} />,
      title: "AI Powered",
      desc: "Advanced AI conversations designed for productivity and intelligent communication.",
    },
    {
      icon: <MessageSquare size={26} />,
      title: "Real-Time Chat",
      desc: "Seamless conversations with instant messaging and responsive interactions.",
    },
    {
      icon: <Zap size={26} />,
      title: "Fast & Reliable",
      desc: "Built with modern architecture for speed, performance and reliability.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] px-4 sm:px-6 lg:px-8 py-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Back Button */}
        <button
          onClick={() => navigate("/")}
          className="mb-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 hover:bg-slate-50 transition"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white border border-slate-200 rounded-[36px] p-8 md:p-14 shadow-sm"
        >
          <p className="text-sm font-medium text-slate-500">
            About AI-TALK
          </p>

          <h1 className="mt-4 text-4xl md:text-6xl font-bold text-slate-900 leading-tight">
            Intelligent Conversations.
            <br />
            Designed beautifully.
          </h1>

          <p className="mt-6 text-slate-500 text-lg max-w-3xl leading-relaxed">
            AI-TALK is a premium AI chat platform built for developers,
            creators and professionals. Experience smooth conversations,
            fast responses and a beautifully designed workspace.
          </p>
        </motion.div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          {features.map((item) => (
            <motion.div
              key={item.title}
              whileHover={{ y: -5 }}
              className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm hover:shadow-md transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
                {item.icon}
              </div>

              <h3 className="mt-5 text-2xl font-semibold text-slate-900">
                {item.title}
              </h3>

              <p className="mt-3 text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 bg-slate-900 rounded-[36px] p-10 md:p-16 text-white"
        >
          <h2 className="text-3xl md:text-5xl font-bold">
            Built for the future of AI.
          </h2>

          <p className="mt-4 text-slate-300 text-lg max-w-2xl">
            AI-TALK combines powerful AI capabilities with a clean,
            premium user experience. Whether you're building, learning,
            or exploring—AI-TALK helps you work smarter.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="mt-8 px-6 py-3 rounded-2xl bg-white text-slate-900 font-semibold hover:bg-slate-200 transition"
          >
            Get Started
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default About;