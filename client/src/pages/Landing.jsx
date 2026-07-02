import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MessageSquare,
  Sparkles,
  Zap,
} from "lucide-react";

import Loader from "../components/common/Loader";

const Landing = () => {
  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const timer = setTimeout(
      () => setLoading(false),
      1800
    );

    return () =>
      clearTimeout(timer);
  }, []);

  if (loading) return <Loader />;

  const features = [
    {
      icon: <MessageSquare size={28} />,
      title: "Fast Conversations",
      desc: "Real-time AI responses with seamless chat experience.",
    },
    {
      icon: <Zap size={28} />,
      title: "Smart Responses",
      desc: "Generate accurate, intelligent responses instantly.",
    },
    {
      icon: <Sparkles size={28} />,
      title: "Private Workspace",
      desc: "Secure AI interactions built for productivity.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 backdrop-blur-xl bg-[#FAFAFA]/90 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-5 flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">
            AI-TALK
          </h1>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              to="/about"
              className="hidden sm:block px-4 py-2 rounded-full hover:bg-white transition"
            >
              About
            </Link>

            <Link
              to="/login"
              className="px-4 sm:px-5 py-2 rounded-full border border-slate-300 hover:border-slate-400 transition text-sm sm:text-base"
            >
              Login
            </Link>

            <Link
              to="/signup"
              className="px-4 sm:px-5 py-2 rounded-full bg-slate-900 text-white hover:bg-black transition text-sm sm:text-base"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <div>
          <motion.h1
            initial={{
              opacity: 0,
              y: 30,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-tight"
          >
            Talk to AI,
            <br />
            beautifully.
          </motion.h1>

          <p className="mt-6 text-base sm:text-lg text-slate-500 max-w-xl leading-relaxed">
            Fast, intelligent conversations
            designed for developers,
            creators and modern teams.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row gap-4">
            <Link
              to="/signup"
              className="px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-black transition flex items-center justify-center gap-2"
            >
              Start Free
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/about"
              className="px-6 py-3 rounded-full border border-slate-300 hover:border-slate-400 transition text-center"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Chat Mockup */}
        <motion.div
          initial={{
            opacity: 0,
            scale: 0.96,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="bg-white rounded-[32px] border border-slate-200 shadow-lg p-4 sm:p-6"
        >
          <div className="flex gap-2 mb-6">
            <div className="w-3 h-3 rounded-full bg-red-400" />
            <div className="w-3 h-3 rounded-full bg-yellow-400" />
            <div className="w-3 h-3 rounded-full bg-green-400" />
          </div>

          <div className="space-y-4">
            <div className="ml-auto max-w-xs sm:max-w-sm bg-slate-900 text-white rounded-2xl p-4">
              Explain React Hooks
            </div>

            <div className="max-w-sm sm:max-w-md bg-slate-100 rounded-2xl p-4 text-slate-700">
              React Hooks let functional
              components manage state and
              side effects efficiently.
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight">
            Designed for modern AI workflows
          </h2>

          <p className="mt-4 text-slate-500 text-base sm:text-lg">
            Built for clarity, speed and productivity.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
          {features.map((item) => (
            <div
              key={item.title}
              className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-100 flex items-center justify-center mb-6">
                {item.icon}
              </div>

              <h3 className="text-xl sm:text-2xl font-semibold">
                {item.title}
              </h3>

              <p className="mt-4 text-slate-500 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <div className="bg-white border border-slate-200 rounded-[40px] p-8 sm:p-16 text-center shadow-sm">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
            Ready to experience better AI?
          </h2>

          <p className="mt-5 text-slate-500 text-base sm:text-lg">
            Join the future of intelligent conversations.
          </p>

          <Link
            to="/signup"
            className="inline-flex mt-8 px-6 py-3 rounded-full bg-slate-900 text-white hover:bg-black transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <h3 className="font-bold">
            AI-TALK
          </h3>

          <p className="text-sm text-slate-500">
            © 2026 AI-TALK. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;