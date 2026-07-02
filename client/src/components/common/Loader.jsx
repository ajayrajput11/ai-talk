import { motion } from "framer-motion";

const Loader = () => {
  return (
    <div className="fixed inset-0 bg-[#FAFAFA] flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        
        {/* Spinner */}
        <motion.div
          className="w-16 h-16 rounded-full border-[3px] border-slate-300 border-t-slate-900"
          animate={{ rotate: 360 }}
          transition={{
            repeat: Infinity,
            duration: 1.2,
            ease: "linear",
          }}
        />

        {/* Brand */}
        <motion.h1
          className="mt-8 text-3xl font-semibold tracking-tight text-slate-900"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
          }}
        >
          AI-TALK
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="mt-2 text-sm text-slate-500 tracking-wide"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: 0.2,
            duration: 0.8,
          }}
        >
          Preparing your workspace
        </motion.p>
      </div>
    </div>
  );
};

export default Loader;