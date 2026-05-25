import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBars, FaMoon, FaSun } from "react-icons/fa";
import toast from "react-hot-toast";
import Logo from "./Logo";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Dashboard", path: "/dashboard" },
  { label: "Upload Resume", path: "/upload" }
];

const Navbar = ({ onMenuClick }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/85 backdrop-blur-xl dark:bg-slate-950/85">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button className="btn-secondary px-3 lg:hidden" onClick={onMenuClick} aria-label="Open menu">
            <FaBars />
          </button>
          <Logo />
        </div>

        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `rounded-lg px-3 py-2 text-sm font-semibold transition ${
                  isActive ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "hover:bg-slate-100 dark:hover:bg-slate-900"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
          {user?.role === "admin" && (
            <NavLink to="/admin" className="rounded-lg px-3 py-2 text-sm font-semibold hover:bg-slate-100 dark:hover:bg-slate-900">
              Admin
            </NavLink>
          )}
        </nav>

        <div className="flex items-center gap-2">
          <button className="btn-secondary px-3" onClick={toggleTheme} aria-label="Toggle theme">
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>
          {isAuthenticated ? (
            <button className="btn-primary" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <div className="hidden gap-2 sm:flex">
              <Link className="btn-secondary" to="/login">
                Login
              </Link>
              <Link className="btn-primary" to="/register">
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
