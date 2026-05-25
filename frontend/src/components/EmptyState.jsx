import { FaInbox } from "react-icons/fa6";

const EmptyState = ({ title = "No data yet", message = "Create your first report to see insights here.", action }) => (
  <div className="glass-panel rounded-xl p-8 text-center">
    <FaInbox className="mx-auto text-4xl text-slate-400" />
    <h3 className="mt-4 text-lg font-bold">{title}</h3>
    <p className="mx-auto mt-2 max-w-md text-sm text-slate-500">{message}</p>
    {action && <div className="mt-5">{action}</div>}
  </div>
);

export default EmptyState;
