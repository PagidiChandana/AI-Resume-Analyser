import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="page-shell grid min-h-[calc(100vh-4rem)] place-items-center text-center">
    <div>
      <p className="text-7xl font-extrabold text-cyan-500">404</p>
      <h1 className="mt-4 text-3xl font-extrabold">Page not found</h1>
      <p className="mt-2 text-slate-500">The route you opened does not exist.</p>
      <Link className="btn-primary mt-6" to="/dashboard">Go to Dashboard</Link>
    </div>
  </div>
);

export default NotFound;
