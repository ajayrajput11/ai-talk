import { motion } from "framer-motion";

const StatCard = ({
  title,
  value,
  icon,
}) => {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      transition={{
        duration: 0.2,
      }}
      className="
        bg-white
        border
        border-slate-200
        rounded-[28px]
        p-6
        shadow-sm
        hover:shadow-md
        transition-all
      "
    >
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-slate-500 font-medium">
            {title}
          </p>

          <h2 className="mt-3 text-3xl sm:text-4xl font-bold text-slate-900">
            {value}
          </h2>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-700">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default StatCard;