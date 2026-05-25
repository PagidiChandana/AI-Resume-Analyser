import { NavLink } from "react-router-dom";
import { FaChartLine, FaFileUpload, FaHistory, FaQuestionCircle, FaTools, FaUserShield, FaBriefcase } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useAuth } from "../context/AuthContext";

const baseLinks = [
  { label: "Dashboard", path: "/dashboard", icon: FaChartLine },
  { label: "Upload Resume", path: "/upload", icon: FaFileUpload },
  { label: "Analysis", path: "/analysis", icon: FaTools },
  { label: "History", path: "/history", icon: FaHistory },
  { label: "Skill Gap", path: "/skill-gap", icon: FaChartLine },
  { label: "Jobs", path: "/jobs", icon: FaBriefcase },
  { label: "Interview", path: "/interview", icon: FaQuestionCircle }
];

const Sidebar = ({ open, onClose }) => {
  const { isAdmin } = useAuth();
  const links = isAdmin ? [...baseLinks, { label: "Admin Panel", path: "/admin", icon: FaUserShield }] : baseLinks;

  return (
    <>
      <div className={`fixed inset-0 z-40 bg-slate-950/40 lg:hidden ${open ? "block" : "hidden"}`} onClick={onClose} />
      <aside
        className={`fixed left-0 top-0 z-50 h-full w-72 border-r bg-white p-4 transition-transform dark:bg-slate-950 lg:sticky lg:top-16 lg:z-20 lg:h-[calc(100vh-4rem)] ${
          open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="mb-5 flex items-center justify-between lg:hidden">
          <span className="font-bold">Menu</span>
          <button className="btn-secondary px-3" onClick={onClose} aria-label="Close menu">
            <IoClose />
          </button>
        </div>
        <nav className="grid gap-1">
          {links.map(({ label, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? "bg-cyan-500 text-white shadow-lg shadow-cyan-500/20" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-900"
                }`
              }
            >
              <Icon />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
