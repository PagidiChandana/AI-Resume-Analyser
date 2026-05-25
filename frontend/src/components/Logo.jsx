import { Link } from "react-router-dom";
import { FaBrain } from "react-icons/fa";

const Logo = () => (
  <Link to="/" className="flex items-center gap-2 font-extrabold tracking-tight">
    <span className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500 text-white shadow-lg shadow-cyan-500/25">
      <FaBrain />
    </span>
    <span className="text-lg">AI Resume Analyzer</span>
  </Link>
);

export default Logo;
