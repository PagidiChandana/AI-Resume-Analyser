import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import EmptyState from "../components/EmptyState";
import Loader from "../components/Loader";
import { resumeService } from "../services/resumeService";
import { formatDate } from "../utils/formatters";

const History = () => {
  const [history, setHistory] = useState([]);
  const [comparison, setComparison] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const [historyResponse, comparisonResponse] = await Promise.all([resumeService.getHistory(), resumeService.compareScores()]);
        setHistory(historyResponse.data.history || []);
        setComparison(comparisonResponse.data.comparison || []);
      } finally {
        setLoading(false);
      }
    };
    loadHistory();
  }, []);

  if (loading) return <Loader label="Loading history..." />;

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-extrabold">Resume History</h1>
      <p className="mt-2 text-slate-500">Open old reports and compare score movement over time.</p>

      <div className="mt-6 glass-panel rounded-xl p-5">
        <h2 className="font-bold">Score Comparison</h2>
        <div className="mt-4 h-72">
          {comparison.length ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={comparison}>
                <XAxis dataKey="attempt" />
                <YAxis domain={[0, 100]} />
                <Tooltip />
                <Line type="monotone" dataKey="atsScore" stroke="#06b6d4" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <EmptyState title="No comparison yet" />
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-4">
        {history.map((item) => (
          <Link key={item._id} to={`/history/${item._id}`} className="glass-panel rounded-xl p-5 transition hover:-translate-y-0.5">
            <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
              <div>
                <h3 className="font-bold">{item.resume?.originalName || "Resume analysis"}</h3>
                <p className="mt-1 text-sm text-slate-500">{formatDate(item.createdAt)}</p>
              </div>
              <div className="text-2xl font-extrabold text-cyan-500">{item.atsScore}/100</div>
            </div>
          </Link>
        ))}
        {!history.length && <EmptyState title="No history found" message="Your previous analyses will appear here." />}
      </div>
    </div>
  );
};

export default History;
