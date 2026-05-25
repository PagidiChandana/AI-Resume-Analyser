import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!form.name || !form.email || form.password.length < 6) return toast.error("Enter valid details and a 6+ character password");
    setLoading(true);
    try {
      await register(form);
      toast.success("Account created");
      navigate("/dashboard");
    } catch (error) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-shell grid min-h-[calc(100vh-4rem)] place-items-center">
      <form onSubmit={handleSubmit} className="glass-panel w-full max-w-md rounded-xl p-6">
        <h1 className="text-2xl font-extrabold">Create Account</h1>
        <p className="mt-2 text-sm text-slate-500">Start analyzing resumes with AI insights.</p>
        <div className="mt-6 grid gap-4">
          <input className="input-field" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="input-field" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="input-field" type="password" placeholder="Password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <button className="btn-primary w-full" disabled={loading}>
            {loading ? "Creating..." : "Register"}
          </button>
        </div>
        <p className="mt-5 text-center text-sm text-slate-500">
          Already registered? <Link className="font-bold text-cyan-600" to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
