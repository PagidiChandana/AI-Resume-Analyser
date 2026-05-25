import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { FaFileAlt, FaMagic, FaUsers } from "react-icons/fa";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import { adminService } from "../services/adminService";
import { formatDate } from "../utils/formatters";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);
  const [uploads, setUploads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadAdmin = async () => {
    const [usersResponse, uploadsResponse, statsResponse] = await Promise.all([
      adminService.getUsers(),
      adminService.getUploads(),
      adminService.getStatistics()
    ]);
    setUsers(usersResponse.data.users || []);
    setUploads(uploadsResponse.data.uploads || []);
    setStats(statsResponse.data.stats);
  };

  useEffect(() => {
    loadAdmin().finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      await adminService.deleteUser(id);
      toast.success("User deleted");
      await loadAdmin();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not delete user");
    }
  };

  if (loading) return <Loader label="Loading admin panel..." />;

  const chartData = [
    { name: "Users", value: stats?.totalUsers || users.length },
    { name: "Uploads", value: stats?.totalUploads || uploads.length },
    { name: "Analyses", value: stats?.totalAnalyses || 0 }
  ];

  return (
    <div className="page-shell">
      <h1 className="text-3xl font-extrabold">Admin Panel</h1>
      <p className="mt-2 text-slate-500">Monitor users, uploads, platform statistics, and analysis volume.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <StatCard title="Users" value={stats?.totalUsers || users.length} icon={FaUsers} accent="bg-cyan-500" />
        <StatCard title="Uploads" value={stats?.totalUploads || uploads.length} icon={FaFileAlt} accent="bg-emerald-500" />
        <StatCard title="Analyses" value={stats?.totalAnalyses || 0} icon={FaMagic} accent="bg-violet-500" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="glass-panel rounded-xl p-5">
          <h2 className="font-bold">Platform Analytics</h2>
          <div className="mt-4 h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="value" fill="#06b6d4" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel overflow-hidden rounded-xl">
          <div className="border-b p-5">
            <h2 className="font-bold">Users</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-100 text-xs uppercase text-slate-500 dark:bg-slate-900">
                <tr>
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Email</th>
                  <th className="px-5 py-3">Role</th>
                  <th className="px-5 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id} className="border-t">
                    <td className="px-5 py-3 font-semibold">{user.name}</td>
                    <td className="px-5 py-3 text-slate-500">{user.email}</td>
                    <td className="px-5 py-3">{user.role}</td>
                    <td className="px-5 py-3">
                      <button className="rounded-lg bg-rose-500 px-3 py-1.5 text-xs font-bold text-white" onClick={() => handleDelete(user._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div className="mt-6 glass-panel rounded-xl p-5">
        <h2 className="font-bold">Recent Uploads</h2>
        <div className="mt-4 grid gap-3">
          {uploads.slice(0, 8).map((upload) => (
            <div key={upload._id} className="flex flex-col justify-between gap-2 rounded-lg bg-slate-100 p-3 text-sm dark:bg-slate-900 sm:flex-row sm:items-center">
              <span className="font-semibold">{upload.originalName}</span>
              <span className="text-slate-500">{upload.user?.email || "Unknown"} - {formatDate(upload.createdAt)}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
