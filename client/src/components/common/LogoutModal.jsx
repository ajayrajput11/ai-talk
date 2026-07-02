import { motion, AnimatePresence } from "framer-motion";
import { LogOut, X } from "lucide-react";

const LogoutModal = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              scale: 0.95,
              y: 20,
            }}
            transition={{ duration: 0.25 }}
            className="
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[92%] max-w-md
              bg-white
              border border-slate-200
              rounded-[32px]
              p-6 sm:p-8
              shadow-2xl
              z-50
            "
          >
            <div className="flex items-center justify-between">
              <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center">
                <LogOut className="text-red-500" size={24} />
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-xl hover:bg-slate-100 flex items-center justify-center transition"
              >
                <X size={20} className="text-slate-500" />
              </button>
            </div>

            <h2 className="mt-6 text-2xl sm:text-3xl font-bold text-slate-900">
              Logout
            </h2>

            <p className="mt-3 text-slate-500 leading-relaxed">
              Are you sure you want to logout from your account?
            </p>

            <div className="grid grid-cols-2 gap-3 mt-8">
              <button
                onClick={onClose}
                className="
                  py-3 rounded-2xl
                  border border-slate-200
                  hover:bg-slate-50
                  font-medium
                  transition
                "
              >
                Cancel
              </button>

              <button
                onClick={onConfirm}
                className="
                  py-3 rounded-2xl
                  bg-slate-900 text-white
                  hover:bg-black
                  font-medium
                  transition
                "
              >
                Logout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;