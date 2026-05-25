import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FaChartLine, FaFileAlt, FaHistory, FaUser } from "react-icons/fa";
import StatCard from "../components/StatCard";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import { resumeService } from "../services/resumeService";
import { useAuth } from "../context/AuthContext";
import { formatDate } from "../utils/formatters";

const Dashboard = () => {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [historyResponse, comparisonResponse, resumesResponse] = await Promise.all([
          resumeService.getHistory(),
          resumeService.compareScores(),
          resumeService.getResumes()
        ]);
        setHistory(historyResponse.data.history || []);
        setComparison(comparisonResponse.data.comparison || []);
        setResumes(resumesResponse.data.resumes || []);
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
  }, []);

  const latest = history[0];
  const averageScore = useMemo(() => {
    if (!history.length) return 0;
    return Math.round(history.reduce((sum, item) => sum + item.atsScore, 0) / history.length);
  }, [history]);

  if (loading) return <Loader label="Loading dashboard..." />;

  return (
    <div className="page-shell">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <p className="text-sm font-semibold text-cyan-600">Welcome, {user?.name}</p>
          <h1 className="text-3xl font-extrabold">Dashboard</h1>
        </div>
        <Link className="btn-primary" to="/upload">Upload Resume</Link>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Profile" value={user?.role || "user"} icon={FaUser} accent="bg-slate-900" helper={user?.email} />
        <StatCard title="Latest Score" value={latest?.atsScore || 0} icon={FaChartLine} accent="bg-cyan-500" />
        <StatCard title="Resumes" value={resumes.length} icon={FaFileAlt} accent="bg-emerald-500" />
        <StatCard title="Analyses" value={history.length} icon={FaHistory} accent="bg-violet-500" helper={`Avg score ${averageScore}`} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <div className="glass-panel rounded-xl p-5">
          <h2 className="font-bold">Score Trend</h2>
          <div className="mt-4 h-72">
            {comparison.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={comparison}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="attempt" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Area type="monotone" dataKey="atsScore" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.18} />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <EmptyState title="No score trend" message="Analyze a resume to generate score charts." />
            )}
          </div>
        </div>

        <div className="glass-panel rounded-xl p-5">
          <h2 className="font-bold">Recent Activity</h2>
          <div className="mt-4 grid gap-3">
            {history.slice(0, 5).map((item) => (
              <Link key={item._id} to={`/history/${item._id}`} className="rounded-lg bg-slate-100 p-3 text-sm transition hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800">
                <div className="flex justify-between gap-3">
                  <span className="font-semibold">{item.resume?.originalName || "Resume report"}</span>
                  <span>{item.atsScore}/100</span>
                </div>
                <p className="mt-1 text-xs text-slate-500">{formatDate(item.createdAt)}</p>
              </Link>
            ))}
            {!history.length && <EmptyState title="No activity" message="Upload and analyze your first resume." />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
