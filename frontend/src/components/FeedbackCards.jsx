import { motion } from "framer-motion";
import { FaCheckCircle, FaExclamationTriangle, FaLightbulb } from "react-icons/fa";

const groups = [
  { key: "strengths", title: "Strengths", icon: FaCheckCircle, color: "text-emerald-500" },
  { key: "weaknesses", title: "Weaknesses", icon: FaExclamationTriangle, color: "text-amber-500" },
  { key: "suggestions", title: "Suggestions", icon: FaLightbulb, color: "text-cyan-500" }
];

const FeedbackCards = ({ analysis = {} }) => (
  <div className="grid gap-5 lg:grid-cols-3">
    {groups.map(({ key, title, icon: Icon, color }, index) => (
      <motion.div
        key={key}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06 }}
        className="glass-panel rounded-xl p-5"
      >
        <div className="flex items-center gap-3">
          <Icon className={`text-xl ${color}`} />
          <h3 className="font-bold">{title}</h3>
        </div>
        <ul className="mt-4 grid gap-3 text-sm text-slate-600 dark:text-slate-300">
          {(analysis[key] || ["No data available yet."]).map((item, itemIndex) => (
            <li key={`${key}-${itemIndex}`} className="rounded-lg bg-slate-100 p-3 dark:bg-slate-900">
              {item}
            </li>
          ))}
        </ul>
      </motion.div>
    ))}
  </div>
);

export default FeedbackCards;
