import { motion } from "framer-motion";

const StatCard = ({ title, value, icon: Icon, accent = "bg-cyan-500", helper }) => (
  <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="glass-panel rounded-xl p-5">
    <div className="flex items-start justify-between gap-4">
      <div>
        <p className="text-sm font-semibold text-slate-500 dark:text-slate-400">{title}</p>
        <p className="mt-2 text-3xl font-extrabold">{value}</p>
        {helper && <p className="mt-1 text-xs text-slate-500">{helper}</p>}
      </div>
      {Icon && (
        <span className={`grid h-11 w-11 place-items-center rounded-xl ${accent} text-white`}>
          <Icon />
        </span>
      )}
    </div>
  </motion.div>
);

export default StatCard;
