import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.email || !form.password) return toast.error("Email and password are required");
    setLoading(true);
    try {
      await login(form);
      toast.success("Welcome back");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell grid min-h-[calc(100vh-4rem)] place-items-center">
      <form onSubmit={handleSubmit} className="glass-panel w-full max-w-md rounded-xl p-6">
        <h1 className="text-2xl font-extrabold">Login</h1>
        <p className="mt-2 text-sm text-slate-500">Continue to your resume intelligence dashboard.</p>
        <div className="mt-6 grid gap-4">
          <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input-field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500">
          New here? <Link className="font-bold text-cyan-600" to="/register">Create account</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
